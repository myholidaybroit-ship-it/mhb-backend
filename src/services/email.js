// Transactional email. Two interchangeable transports, picked at runtime:
//   1. AWS SES (preferred) — when AWS_SES_* is configured.
//   2. Brevo HTTP API      — fallback when only BREVO_API_KEY is set.
//
// Every send is best-effort and non-blocking: if no transport is configured or
// the call fails, we log and move on so a mail outage never breaks a booking,
// signup or enquiry.

import { env } from "../config/env.js";

const BREVO_BASE = "https://api.brevo.com/v3";

const asEmail = (e) => (typeof e === "string" ? e : e?.email);

// ─── AWS SES transport (SESv2) ──────────────────────────────────────────────
// The SDK client is created lazily and reused, and the module is dynamically
// imported so the API still boots if the SES SDK isn't installed.
let _sesClient = null;
async function getSesClient() {
  if (_sesClient) return _sesClient;
  const { SESv2Client } = await import("@aws-sdk/client-sesv2");
  _sesClient = new SESv2Client({
    region: env.ses.region,
    credentials: { accessKeyId: env.ses.accessKeyId, secretAccessKey: env.ses.secretAccessKey },
  });
  return _sesClient;
}

async function sendViaSes({ to, subject, html, replyTo }) {
  const { SendEmailCommand } = await import("@aws-sdk/client-sesv2");
  const client = await getSesClient();
  const recipients = (Array.isArray(to) ? to : [to]).map(asEmail).filter(Boolean);
  const fromName = env.ses.fromName || env.mail.fromName;
  const from = fromName ? `${fromName} <${env.ses.fromEmail}>` : env.ses.fromEmail;
  const reply = replyTo ? [asEmail(replyTo)].filter(Boolean) : undefined;

  await client.send(new SendEmailCommand({
    FromEmailAddress: from,
    Destination: { ToAddresses: recipients },
    ...(reply ? { ReplyToAddresses: reply } : {}),
    Content: {
      Simple: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: { Html: { Data: html, Charset: "UTF-8" } },
      },
    },
  }));
  return true;
}

// ─── Brevo transport ────────────────────────────────────────────────────────
async function brevo(path, body, method = "POST") {
  const res = await fetch(`${BREVO_BASE}${path}`, {
    method,
    headers: {
      "api-key": env.brevo.apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Brevo ${path} → ${res.status} ${text}`);
  }
  return res.status === 204 ? null : res.json().catch(() => null);
}

async function sendViaBrevo({ to, subject, html, replyTo, params }) {
  const recipients = (Array.isArray(to) ? to : [to])
    .filter(Boolean)
    .map((e) => (typeof e === "string" ? { email: e } : e));
  await brevo("/smtp/email", {
    sender: { email: env.mail.fromEmail, name: env.mail.fromName },
    to: recipients,
    subject,
    htmlContent: html,
    ...(replyTo ? { replyTo: typeof replyTo === "string" ? { email: replyTo } : replyTo } : {}),
    ...(params ? { params } : {}),
  });
  return true;
}

/**
 * Send one transactional email via SES (preferred) or Brevo. Resolves to true on
 * success, false otherwise. Never throws — callers fire-and-forget.
 */
export async function sendEmail({ to, subject, html, replyTo, params } = {}) {
  const transport = env.ses.enabled ? "ses" : env.brevo.enabled ? "brevo" : null;
  if (!transport) {
    console.warn(`[email] skipped "${subject}" → ${to} (no email transport configured)`);
    return false;
  }
  try {
    if (transport === "ses") return await sendViaSes({ to, subject, html, replyTo });
    return await sendViaBrevo({ to, subject, html, replyTo, params });
  } catch (err) {
    console.error(`[email:${transport}] failed "${subject}" → ${to}:`, err.message);
    return false;
  }
}

/** Add/refresh a contact on the configured Brevo newsletter list. */
export async function subscribeContact(email, attributes = {}) {
  if (!env.brevo.enabled) return false;
  try {
    await brevo("/contacts", {
      email,
      attributes,
      ...(env.brevo.newsletterListId ? { listIds: [env.brevo.newsletterListId] } : {}),
      updateEnabled: true,
    });
    return true;
  } catch (err) {
    // 400 "Contact already exists" is benign.
    if (!/already exist/i.test(err.message)) console.error("[email] subscribeContact:", err.message);
    return false;
  }
}

// ─── Shared HTML shell ──────────────────────────────────────────────────────
const shell = (title, bodyHtml) => `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
    <div style="padding:20px 0;border-bottom:2px solid #ff5722">
      <span style="font-size:20px;font-weight:800;letter-spacing:-.5px">MyHoliday<span style="color:#ff5722">Bro</span></span>
    </div>
    <h1 style="font-size:22px;margin:24px 0 12px">${title}</h1>
    <div style="font-size:15px;line-height:1.6;color:#333">${bodyHtml}</div>
    <p style="margin-top:28px;font-size:13px;color:#888">Bro, lose yourself. Discover yourself.<br/>
      <a href="${env.siteUrl}" style="color:#ff5722">myholidaybro.com</a> · ${env.mail.adminNotify}
    </p>
  </div>`;

const row = (k, v) => `<tr><td style="padding:4px 12px 4px 0;color:#888">${k}</td><td style="padding:4px 0;font-weight:600">${v ?? "—"}</td></tr>`;

// ─── Templates (each returns a sendEmail promise) ───────────────────────────
export const emails = {
  welcome: (user) =>
    sendEmail({
      to: user.email,
      subject: "Welcome to MyHolidayBro 🌴",
      html: shell(
        `Hey ${user.name?.split(" ")[0] || "traveller"}, welcome aboard!`,
        `<p>Your account is ready. Save trips to your wishlist, request quotes, and track your bookings — all in one place.</p>
         <p><a href="${env.siteUrl}/destinations" style="display:inline-block;background:#ff5722;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600">Explore destinations</a></p>`
      ),
    }),

  enquiryAck: (enq) =>
    sendEmail({
      to: enq.email,
      replyTo: env.mail.adminNotify,
      subject: "We've got your enquiry — packing your reply now ✈️",
      html: shell(
        `Thanks${enq.name || enq.firstName ? `, ${enq.name || enq.firstName}` : ""}!`,
        `<p>Our trip team has received your enquiry and will reach out shortly${
          enq.destination ? ` about <b>${enq.destination}</b>` : ""
        }. Most replies go out within 30 minutes during IST working hours.</p>`
      ),
    }),

  enquiryNotify: (enq) =>
    sendEmail({
      to: env.mail.adminNotify,
      replyTo: enq.email,
      subject: `New ${enq.type} enquiry — ${enq.name || enq.firstName || enq.email}`,
      html: shell(
        `New ${enq.type} enquiry`,
        `<table style="font-size:14px;border-collapse:collapse">
          ${row("Name", enq.name || [enq.firstName, enq.lastName].filter(Boolean).join(" "))}
          ${row("Email", enq.email)}
          ${row("Phone", enq.phone)}
          ${row("Destination", enq.destination || enq.trip)}
          ${row("Package", enq.package)}
          ${row("Pax", enq.adults != null ? `${enq.adults} adults, ${enq.children || 0} children` : null)}
          ${row("Channel", enq.channel)}
          ${row("Message", enq.message)}
        </table>`
      ),
    }),

  adminOtp: (email, code, minutes = 10) =>
    sendEmail({
      to: email,
      subject: `${code} is your MyHolidayBro admin code`,
      html: shell(
        "Your sign-in code",
        `<p>Use this one-time code to sign in to the MyHolidayBro admin panel. It expires in ${minutes} minutes.</p>
         <div style="margin:18px 0;font-size:34px;font-weight:800;letter-spacing:10px;color:#ff5722">${code}</div>
         <p style="font-size:13px;color:#888">If you didn't request this, you can safely ignore this email — someone may have mistyped their address.</p>`
      ),
    }),

  bookingConfirmation: (booking, user) =>
    sendEmail({
      to: user.email,
      subject: `Booking received — ${booking.reference}`,
      html: shell(
        `Your booking is in! 🎉`,
        `<p>We've logged your request for <b>${booking.title}</b>. A trip captain will confirm availability and the final quote shortly.</p>
         <table style="font-size:14px;border-collapse:collapse;margin-top:8px">
          ${row("Reference", booking.reference)}
          ${row("Destination", booking.destination)}
          ${row("Travellers", `${booking.adults || 1} adults, ${booking.children || 0} children`)}
          ${row("Status", booking.status)}
          ${row("Estimated total", booking.total)}
         </table>`
      ),
    }),
};
