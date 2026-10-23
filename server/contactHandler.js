// Server-side only. This file is NEVER imported by anything under /src,
// so it is never bundled into the browser build.
//
// It receives the contact form payload from the browser, validates it,
// attaches the Web3Forms access key (read from a server environment variable)
// and forwards the request to Web3Forms. The browser never sees the key.

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple in-memory rate limit (per server instance). 1 request / 60s per IP.
const RATE_WINDOW_MS = 60 * 1000;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  for (const [k, t] of hits) if (now - t > RATE_WINDOW_MS) hits.delete(k);
  const last = hits.get(ip);
  if (last && now - last < RATE_WINDOW_MS) return true;
  hits.set(ip, now);
  return false;
}

/**
 * @param {object} body   parsed JSON body from the browser
 * @param {string} ip     client IP (for rate limiting)
 * @param {Record<string,string|undefined>} env  server environment variables
 * @returns {Promise<{status:number, json:object}>}
 */
export async function handleContact(body, ip, env) {
  const accessKey = env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("WEB3FORMS_ACCESS_KEY is not set on the server.");
    return { status: 500, json: { success: false, message: "Server is not configured." } };
  }

  if (!body || typeof body !== "object") {
    return { status: 400, json: { success: false, message: "Invalid request." } };
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  // Honeypot: pretend success so bots learn nothing.
  if (body.botcheck) return { status: 200, json: { success: true } };

  if (!name || !email || !message) {
    return { status: 400, json: { success: false, message: "Please fill in your name, email and message." } };
  }
  if (name.length > 100 || email.length > 150 || message.length > 3000) {
    return { status: 400, json: { success: false, message: "One of the fields is too long." } };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: 400, json: { success: false, message: "Please enter a valid email address." } };
  }

  if (rateLimited(ip)) {
    return { status: 429, json: { success: false, message: "Please wait a minute before sending another message." } };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: env.CONTACT_SUBJECT || "New portfolio contact message",
        from_name: env.CONTACT_FROM_NAME || "Rokesh Portfolio Website",
        name,
        email,
        message,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) {
      console.error("Web3Forms rejected the submission:", data && data.message);
      return { status: 502, json: { success: false, message: "Could not deliver your message." } };
    }
    return { status: 200, json: { success: true } };
  } catch (err) {
    console.error("Web3Forms request failed:", err);
    return { status: 502, json: { success: false, message: "Could not deliver your message." } };
  }
}
