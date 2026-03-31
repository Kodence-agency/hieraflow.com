import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().min(1).max(150),
  message: z.string().min(5).max(2000),
  _honey: z.string().optional(),
});

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Vercel serverless function (Node.js runtime)
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  let body: any;
  try {
    body =
      req.body && Object.keys(req.body).length ? req.body : await readBody(req);
  } catch {
    return res.status(400).json({ error: "invalid_json" });
  }

  try {
    const parsed = contactSchema.parse(body);

    if (parsed._honey) {
      // On fait semblant
      return res.status(200).json({ status: "ok" });
    }

    const to = process.env.CONTACT_TO || "contact@heavenit.org";
    const fromRaw = process.env.CONTACT_FROM || "contact@heavenit.org";
    const from = fromRaw.includes("<") ? fromRaw : `Hieraflow <${fromRaw}>`;

    const subject = `Nouvelle demande de démo - ${parsed.firstName} ${parsed.lastName}`;
    const html = `
      <h2 style="font-family: system-ui, Arial; margin-bottom:8px;">Demande de démonstration</h2>
      <p><strong>Nom:</strong> ${escapeHtml(parsed.firstName)} ${escapeHtml(
        parsed.lastName,
      )}</p>
      <p><strong>Email:</strong> ${escapeHtml(parsed.email)}</p>
      <p><strong>Entreprise:</strong> ${escapeHtml(parsed.company)}</p>
      <p style="margin-top:12px;"><strong>Message:</strong><br/>${escapeHtml(
        parsed.message,
      ).replace(/\n/g, "<br/>")}</p>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      reply_to: parsed.email,
    });

    if (error) {
      console.error("Resend error", error);
      return res.status(502).json({ error: "email_failed" });
    }

    return res.status(201).json({ status: "ok" });
  } catch (e: any) {
    if (e?.issues) {
      return res
        .status(400)
        .json({ error: "validation_error", details: e.issues });
    }
    console.error(e);
    return res.status(500).json({ error: "internal" });
  }
}

function readBody(req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (c: any) => (raw += c));
    req.on("end", () => {
      try {
        resolve(JSON.parse(raw || "{}"));
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}
