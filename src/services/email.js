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
// Brand palette mirrors the live site: black ink, a yellow accent and cream
// surfaces. Kept deliberately minimal — a wordmark, the message, one link.
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const shell = (title, bodyHtml) => `
  <div style="background:#faf7ee;padding:32px 16px;font-family:${FONT}">
    <div style="max-width:480px;margin:0 auto;background:#fff;border:1px solid #ebe7d8;border-top:3px solid #ffde5f;border-radius:14px">
      <div style="padding:28px 32px">
        <span style="font-size:17px;font-weight:800;letter-spacing:-.02em;color:#111">MyHolidayBro</span>
        <h1 style="font-size:21px;font-weight:800;letter-spacing:-.02em;line-height:1.25;color:#111;margin:20px 0 14px">${title}</h1>
        <div style="font-size:15px;line-height:1.6;color:#5a5a5a">${bodyHtml}</div>
      </div>
    </div>
    <p style="max-width:480px;margin:16px auto 0;text-align:center;font-size:12px;color:#5a5a5a">
      <a href="${env.siteUrl}" style="color:#111;font-weight:600;text-decoration:none">myholidaybro.com</a>
    </p>
  </div>`;

// A pill button in the brand accent (yellow bg, black ink — matches the site).
const btn = (href, label) =>
  `<a href="${href}" style="display:inline-block;background:#ffde5f;color:#111;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:700;font-size:14px">${label}</a>`;

const row = (k, v) => `<tr><td style="padding:6px 14px 6px 0;color:#5a5a5a;font-size:14px">${k}</td><td style="padding:6px 0;font-weight:600;color:#111;font-size:14px">${v ?? "—"}</td></tr>`;

// ─── Templates (each returns a sendEmail promise) ───────────────────────────
export const emails = {
  welcome: (user) =>
    sendEmail({
      to: user.email,
      subject: "Welcome to MyHolidayBro",
      html: shell(
        `Welcome aboard, ${user.name?.split(" ")[0] || "traveller"}`,
        `<p style="margin:0 0 20px">Your account is ready. Save trips, request quotes, and track your bookings — all in one place.</p>
         ${btn(`${env.siteUrl}/destinations`, "Explore destinations")}`
      ),
    }),

  enquiryAck: (enq) =>
    sendEmail({
      to: enq.email,
      replyTo: env.mail.adminNotify,
      subject: "We've received your enquiry",
      html: shell(
        `Thanks${enq.name || enq.firstName ? `, ${enq.name || enq.firstName}` : ""}`,
        `<p style="margin:0">We've received your enquiry${
          enq.destination ? ` about <b style="color:#111">${enq.destination}</b>` : ""
        } and will reply shortly — usually within 30 minutes during IST working hours.</p>`
      ),
    }),

  enquiryNotify: (enq) =>
    sendEmail({
      to: env.mail.adminNotify,
      replyTo: enq.email,
      subject: `New ${enq.type} enquiry — ${enq.name || enq.firstName || enq.email}`,
      html: shell(
        `New ${enq.type} enquiry`,
        `<table style="border-collapse:collapse;width:100%;margin-top:4px">
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
        `<p style="margin:0 0 18px">Use this one-time code to sign in to the admin panel. It expires in ${minutes} minutes.</p>
         <div style="background:#faf7ee;border:1px solid #ebe7d8;border-radius:12px;padding:16px;text-align:center;font-size:30px;font-weight:800;letter-spacing:8px;color:#111">${code}</div>
         <p style="margin:18px 0 0;font-size:13px;color:#5a5a5a">Didn't request this? You can safely ignore this email.</p>`
      ),
    }),

  bookingConfirmation: (booking, user) =>
    sendEmail({
      to: user.email,
      subject: `Booking received — ${booking.reference}`,
      html: shell(
        "Your booking is in",
        `<p style="margin:0 0 16px">We've logged your request for <b style="color:#111">${booking.title}</b>. A trip captain will confirm availability and the final quote shortly.</p>
         <table style="border-collapse:collapse;width:100%;margin-top:4px">
          ${row("Reference", booking.reference)}
          ${row("Destination", booking.destination)}
          ${row("Travellers", `${booking.adults || 1} adults, ${booking.children || 0} children`)}
          ${row("Status", booking.status)}
          ${row("Estimated total", booking.total)}
         </table>`
      ),
    }),
};
