// Vercel Serverless Function  ->  POST /api/contact
// The access key comes from the WEB3FORMS_ACCESS_KEY environment variable
// configured in the Vercel dashboard. It is never sent to the browser.
import { handleContact } from "../server/contactHandler.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const { status, json } = await handleContact(req.body, ip, process.env);
  res.setHeader("Cache-Control", "no-store");
  return res.status(status).json(json);
}
