import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { handleContact } from "./server/contactHandler.js";

// Dev-only middleware that mimics the production /api/contact function, so
// `npm run dev` works with the secret key kept in .env (no VITE_ prefix).
function contactApiDevPlugin(env) {
  return {
    name: "contact-api-dev",
    configureServer(server) {
      server.middlewares.use("/api/contact", (req, res) => {
        const send = (status, json) => {
          res.statusCode = status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(json));
        };
        if (req.method !== "POST") return send(405, { success: false, message: "Method not allowed." });

        let raw = "";
        req.on("data", (c) => {
          raw += c;
          if (raw.length > 20000) req.destroy();
        });
        req.on("end", async () => {
          let body;
          try { body = JSON.parse(raw || "{}"); } catch { return send(400, { success: false, message: "Invalid JSON." }); }
          const ip = req.socket.remoteAddress || "dev";
          const { status, json } = await handleContact(body, ip, env);
          send(status, json);
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // "" prefix = load ALL vars from .env for the dev server only.
  // They are NOT exposed to client code (only VITE_* vars ever are).
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), contactApiDevPlugin(env)],
  };
});
