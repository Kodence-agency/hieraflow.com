import "dotenv/config";
import http from "http";
import { Resend } from "resend";
import { z } from "zod";
import crypto from "crypto";

const REQUIRED_ENVS = ["RESEND_API_KEY", "CONTACT_FROM", "CONTACT_TO"] as const;
for (const k of REQUIRED_ENVS) {
  if (!process.env[k]) {
    console.warn(`[contact-api] WARN: variable ${k} manquante.`);
  }
}

if (!process.env.RESEND_API_KEY) {
  console.error("[contact-api] ERREUR: RESEND_API_KEY absente. Arrêt.");
  process.exit(1);
}

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional().default(""),
  company: z.string().max(150).optional().default(""),
  employeeCount: z.string().max(20).optional().default(""),
  message: z.string().min(5).max(2000),
  _honey: z.string().optional(),
});

const bookingSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional().default(""),
  company: z.string().max(150).optional().default(""),
  date: z.string().min(1),
  time: z.string().min(1),
});

function json(res: http.ServerResponse, status: number, data: any) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/contact") {
    const correlationId = crypto.randomUUID();
    const start = Date.now();
    try {
      let raw = "";
      req.on("data", (chunk) => (raw += chunk));
      req.on("end", async () => {
        try {
          const parsedBody = JSON.parse(raw || "{}");
          const parsed = contactSchema.parse(parsedBody);

          if (parsed._honey) {
            console.info(`[${correlationId}] Honeypot détecté.`);
            return json(res, 200, { status: "ok" });
          }

          const to = process.env.CONTACT_TO!;
          // Bonne pratique: format explicite du from
          const from =
            process.env.CONTACT_FROM?.includes("<") ||
            process.env.CONTACT_FROM?.includes("@")
              ? process.env.CONTACT_FROM!
              : `Hieraflow <${process.env.CONTACT_FROM}>`;

          const subject = `Nouvelle demande de démo - ${parsed.firstName} ${parsed.lastName}`;
          const html = `
            <h2 style="font-family: system-ui, Arial; margin-bottom:8px;">Demande de démonstration</h2>
            <p><strong>Nom:</strong> ${escapeHtml(parsed.firstName)} ${escapeHtml(parsed.lastName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(parsed.email)}</p>
            ${parsed.phone ? `<p><strong>Téléphone:</strong> ${escapeHtml(parsed.phone)}</p>` : ""}
            ${parsed.company ? `<p><strong>Entreprise:</strong> ${escapeHtml(parsed.company)}</p>` : ""}
            ${parsed.employeeCount ? `<p><strong>Effectif:</strong> ${escapeHtml(parsed.employeeCount)} employés</p>` : ""}
            <p style="margin-top:12px;"><strong>Message:</strong><br/>${escapeHtml(parsed.message).replace(/\n/g, "<br/>")}</p>
            <hr style="margin:16px 0; border:none; border-top:1px solid #eee;" />
            <small style="color:#777;">ID: ${correlationId}</small>
          `;

          const sendResult = await resend.emails.send({
            from,
            to,
            subject,
            html,
            replyTo: parsed.email,
          });

          if (sendResult.error) {
            console.error(
              `[${correlationId}] Erreur Resend:`,
              sendResult.error
            );
            return json(res, 502, {
              error: "email_failed",
              correlationId,
              detail: "Provider email a rejeté la requête",
            });
          }

          console.log(
            `[${correlationId}] Email envoyé en ${Date.now() - start}ms`
          );
          return json(res, 201, { status: "ok", correlationId });
        } catch (e: any) {
          if (e?.issues) {
            console.warn(
              `[${correlationId}] Validation échouée`,
              e.issues.map((i: any) => i.path.join("."))
            );
            return json(res, 400, {
              error: "validation_error",
              correlationId,
              details: e.issues,
            });
          }
          console.error(`[${correlationId}] Exception`, e);
          // Afficher erreur JSON parse
          return json(res, 500, { error: "internal", correlationId });
        }
      });
    } catch (outer) {
      console.error(`[${correlationId}] Outer exception`, outer);
      return json(res, 500, { error: "internal", correlationId });
    }
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(
    `[contact-api] Démarré sur ${PORT}. NODE_ENV=${
      process.env.NODE_ENV
    } Résumé env: RESEND_API_KEY=${
      process.env.RESEND_API_KEY?.slice(0, 6) + "…" || "absent"
    }`
  );
});
