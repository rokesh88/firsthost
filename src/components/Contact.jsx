import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";

const COOLDOWN_MS = 60 * 1000;
const COOLDOWN_KEY = "rokeshPortfolioContactCooldownUntil";
// Our own backend route. The Web3Forms access key lives ONLY on the server.
const CONTACT_ENDPOINT = "/api/contact";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readCooldownUntil() {
  try { return Number(localStorage.getItem(COOLDOWN_KEY) || 0); } catch { return 0; }
}

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ msg: "", cls: "" });
  const [sending, setSending] = useState(false);
  const [remaining, setRemaining] = useState(() => Math.max(0, readCooldownUntil() - Date.now()));

  // Tick the cooldown countdown (also restores it after a page reload).
  useEffect(() => {
    if (remaining <= 0) return;
    const t = setInterval(() => {
      const r = Math.max(0, readCooldownUntil() - Date.now());
      setRemaining(r);
      if (r <= 0) {
        clearInterval(t);
        setStatus((s) => (s.cls === "cooldown" ? { msg: "", cls: "" } : s));
      }
    }, 1000);
    return () => clearInterval(t);
  }, [remaining > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  const cooling = remaining > 0;
  const secs = Math.ceil(remaining / 1000);

  async function onSubmit(e) {
    e.preventDefault();
    if (cooling || sending) return;
    const form = formRef.current;
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const botcheck = fd.get("botcheck") === "on";

    if (!name || !email || !message) {
      setStatus({ msg: "Please fill in your name, email and message.", cls: "err" });
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus({ msg: "Please enter a valid email address.", cls: "err" });
      return;
    }
    if (botcheck) return;

    // Start the cooldown before the request so a refresh can't bypass it.
    const until = Date.now() + COOLDOWN_MS;
    try { localStorage.setItem(COOLDOWN_KEY, String(until)); } catch { /* ignore */ }
    setRemaining(COOLDOWN_MS);
    setSending(true);
    setStatus({ msg: "Sending your message...", cls: "cooldown" });

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message, botcheck: "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || "Submission failed");
      setStatus({ msg: `Thanks ${name}! Your message was submitted successfully.`, cls: "ok" });
      form.reset();
    } catch (err) {
      setStatus({
        msg: "We couldn't confirm delivery. Please try again after the 60-second cooldown or email me directly.",
        cls: "err",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="contact alt" id="contact">
      <div className="wrap grid2">
        <Reveal>
          <span className="eyebrow">Contact</span>
          <h2>Let's work together</h2>
          <p className="lead" style={{ marginBottom: 28 }}>
            Have a project or an opportunity in mind? Send me a message and I'll get back to you.
          </p>
          <div className="info">
            <a href="mailto:rokesh88official@gmail.com"><b>Email</b>rokesh88official@gmail.com</a>
            <a href="tel:+919952979733"><b>Phone</b>+91 99529 79733</a>
            <div><b>Location</b>Chennai, Tamil Nadu, India</div>
            <a href="https://www.linkedin.com/in/rokeshr/" target="_blank" rel="noopener noreferrer"><b>LinkedIn</b>linkedin.com/in/rokeshr</a>
            <a href="https://github.com/rokesh88" target="_blank" rel="noopener noreferrer"><b>GitHub</b>github.com/rokesh88</a>
          </div>
        </Reveal>

        {/* No action URL and no access_key here: submission is handled by onSubmit -> /api/contact */}
        <Reveal>
          <form ref={formRef} id="contactForm" noValidate onSubmit={onSubmit}>
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" placeholder="Jane Doe" required maxLength={100} autoComplete="name" />
            <label htmlFor="email">Your email</label>
            <input id="email" name="email" type="email" placeholder="jane@company.com" required maxLength={150} autoComplete="email" />
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Tell me about your project..." required maxLength={3000} />
            <input className="hp" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button className="btn primary" type="submit" disabled={cooling || sending}>
              {sending ? "Sending..." : cooling ? `Please wait ${secs}s` : "Send message"}
            </button>
            <div className={`status ${status.cls}`} role="status" aria-live="polite">
              {status.msg || (cooling ? `You can send another message in ${secs} seconds.` : "")}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
