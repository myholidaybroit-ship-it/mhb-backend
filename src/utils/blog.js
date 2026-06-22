// Blog write-normalisation, applied on every blog create/upsert/patch via the
// crudFactory `transform` hook. Keeps published posts honest: a post that's
// marked published always has a publish date, and read-time is auto-estimated
// from the body when the author didn't set one.

const WORDS_PER_MIN = 200;

function bodyWordCount(body = []) {
  if (!Array.isArray(body)) return 0;
  let words = 0;
  for (const block of body) {
    if (!block) continue;
    if (typeof block.text === "string") words += block.text.trim().split(/\s+/).filter(Boolean).length;
    if (Array.isArray(block.items)) {
      for (const it of block.items) {
        if (typeof it === "string") words += it.trim().split(/\s+/).filter(Boolean).length;
      }
    }
  }
  return words;
}

export function normalizeBlog(body) {
  if (!body || typeof body !== "object") return body;

  // A published post must carry a publish date so the public sort/feed works.
  if (body.status === "published" && !body.publishedAt) {
    body.publishedAt = new Date().toISOString();
  }

  // Estimate read time from the content when one wasn't provided.
  if (!body.readTime && Array.isArray(body.body) && body.body.length) {
    const mins = Math.max(1, Math.round(bodyWordCount(body.body) / WORDS_PER_MIN));
    body.readTime = `${mins} min read`;
  }

  return body;
}
