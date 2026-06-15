import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const schema = z.object({
  firstName: z.string().trim().min(1).max(150),
  lastName: z.string().trim().min(1).max(150),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
  company: z.string().trim().max(150).optional().or(z.literal('')),
  headcount: z.string().trim().max(50).optional().or(z.literal('')),
  whitepaperTitle: z.string().min(1).max(200),
  whitepaperUrl: z.string().url().max(2000),
  _honey: z.string().optional(),
});

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { firstName, lastName, email, phone, company, headcount, whitepaperTitle, whitepaperUrl, _honey } = parsed.data;

    // Honeypot
    if (_honey && _honey.length > 0) {
      return new Response(JSON.stringify({ status: 'ok' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    const FROM = 'Hieraflow <contact@heavenit.org>';
    const TO_NOTIFY = Deno.env.get('CONTACT_TO');
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const safeFirst = escapeHtml(firstName);
    const safeLast = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safeTitle = escapeHtml(whitepaperTitle);

    // 1) Email au prospect avec le lien
    const userRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        subject: `Votre livre blanc Hieraflow — ${whitepaperTitle}`,
        html: `<div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6">
          <p>Bonjour ${safeFirst},</p>
          <p>Merci pour votre intérêt ! Voici le lien de téléchargement de votre livre blanc <strong>${safeTitle}</strong> :</p>
          <p><a href="${whitepaperUrl}" style="display:inline-block;background:#021b74;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none">Télécharger le PDF</a></p>
          <p>Si le bouton ne fonctionne pas, copiez ce lien : <br/><a href="${whitepaperUrl}">${whitepaperUrl}</a></p>
          <p>L'équipe Hieraflow</p>
        </div>`,
      }),
    });
    if (!userRes.ok) {
      const errText = await userRes.text();
      console.error('Resend user email failed', userRes.status, errText);
      return new Response(JSON.stringify({ error: 'Email send failed', details: errText }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2) Notification interne
    if (TO_NOTIFY) {
      const notifRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: FROM,
          to: [TO_NOTIFY],
          reply_to: email,
          subject: `Nouveau téléchargement — ${whitepaperTitle}`,
          html: `<div style="font-family:Arial,sans-serif;color:#0f172a">
            <h2>Nouveau téléchargement de livre blanc</h2>
            <p><strong>Livre blanc :</strong> ${safeTitle}</p>
            <p><strong>Nom et prénom :</strong> ${escapeHtml(firstName)}</p>
            <p><strong>Société :</strong> ${escapeHtml(company || '')}</p>
            <p><strong>Effectif :</strong> ${escapeHtml(headcount || '')}</p>
            <p><strong>Email :</strong> ${safeEmail}</p>
            <p><strong>Téléphone :</strong> ${escapeHtml(phone || '—')}</p>
          </div>`,
        }),
      });
      if (!notifRes.ok) {
        console.error('Resend notify failed', notifRes.status, await notifRes.text());
      }
    }

    return new Response(JSON.stringify({ status: 'ok' }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-whitepaper error', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
