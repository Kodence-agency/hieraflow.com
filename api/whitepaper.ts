import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const WHITEPAPERS: Record<string, { title: string; url: string }> = {
  genz: {
    title: "Livre blanc - Manager la Gen Z avec Hieraflow",
    url: "/__l5e/assets-v1/b6736b9b-de6d-43fc-8d3d-802783aa74d3/Livre_blanc_genz_hieraflow.pdf",
  },
  teams: {
    title: "Livre blanc - Structurer ses équipes avec Hieraflow",
    url: "/__l5e/assets-v1/bf4a7882-2308-42af-a08c-68915ad485f1/Livre_blanc_teams_hieraflow.pdf",
  },
};

const schema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  whitepaper: z.enum(["genz", "teams"]),
  _honey: z.string().optional(),
});

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function readBody(req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (c: any) => (raw += c));
    req.on("end", () => {
      try { resolve(JSON.parse(raw || "{}")); } catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }
  let body: any;
  try {
    body = req.body && Object.keys(req.body).length ? req.body : await readBody(req);
  } catch {
    return res.status(400).json({ error: "invalid_json" });
  }
  try {
    const parsed = schema.parse(body);
    if (parsed._honey) return res.status(200).json({ status: "ok" });

    const wp = WHITEPAPERS[parsed.whitepaper];
    const origin = (req.headers["origin"] as string) || `https://${req.headers["host"]}`;
    const downloadUrl = `${origin}${wp.url}`;

    const to = process.env.CONTACT_TO || "contact@heavenit.org";
    const fromRaw = process.env.CONTACT_FROM || "contact@heavenit.org";
    const from = fromRaw.includes("<") ? fromRaw : `Hieraflow <${fromRaw}>`;

    // Email au prospect
    const userHtml = `
      <h2 style="font-family: system-ui, Arial;">Bonjour ${escapeHtml(parsed.firstName)},</h2>
      <p>Merci pour votre intérêt pour Hieraflow. Voici votre livre blanc :</p>
      <p><strong>${escapeHtml(wp.title)}</strong></p>
      <p><a href="${downloadUrl}" style="display:inline-block;padding:12px 20px;background:#021b74;color:#fff;text-decoration:none;border-radius:6px;">Télécharger le PDF</a></p>
      <p>Bonne lecture !<br/>L'équipe Hieraflow</p>
    `;
    const userSend = await resend.emails.send({
      from, to: parsed.email, subject: `Votre livre blanc - ${wp.title}`, html: userHtml, reply_to: to,
    } as any);
    if ((userSend as any).error) {
      console.error("Resend user error", (userSend as any).error);
      return res.status(502).json({ error: "email_failed" });
    }

    // Notification admin
    const adminHtml = `
      <h2 style="font-family: system-ui, Arial;">Nouveau téléchargement de livre blanc</h2>
      <p><strong>Livre blanc :</strong> ${escapeHtml(wp.title)}</p>
      <p><strong>Nom :</strong> ${escapeHtml(parsed.firstName)} ${escapeHtml(parsed.lastName)}</p>
      <p><strong>Email :</strong> ${escapeHtml(parsed.email)}</p>
    `;
    await resend.emails.send({
      from, to, subject: `Téléchargement livre blanc - ${parsed.firstName} ${parsed.lastName}`,
      html: adminHtml, reply_to: parsed.email,
    } as any);

    return res.status(201).json({ status: "ok", url: wp.url });
  } catch (e: any) {
    if (e?.issues) return res.status(400).json({ error: "validation_error", details: e.issues });
    console.error(e);
    return res.status(500).json({ error: "internal" });
  }
}
