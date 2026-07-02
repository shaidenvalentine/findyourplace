import "server-only";

/**
 * Transactional email via Resend — optional rail. No-ops cleanly until
 * RESEND_API_KEY is set (and EMAIL_FROM, once the domain is verified in Resend),
 * so the funnel never depends on it. Fire-and-forget: callers must never block
 * or fail a user action on email delivery.
 */

const FROM_DEFAULT = "Find Your Place <hello@findyourplace.app>";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendEmail(opts: { to: string; subject: string; html: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || FROM_DEFAULT,
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
      }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    return res.ok;
  } catch {
    return false; // email must never break the funnel
  }
}

/** The "here's your results link" email — sent on capture so the run is never lost. */
export function resultsLinkHtml(resultsUrl: string): string {
  return `
  <div style="background:#10161d;padding:40px 24px;font-family:'Space Grotesk',ui-sans-serif,system-ui,sans-serif;color:#f4f2ec;">
    <div style="max-width:520px;margin:0 auto;">
      <div style="font-size:20px;font-weight:600;margin-bottom:28px;">Find Your Place</div>
      <div style="font-size:28px;font-weight:300;line-height:1.15;letter-spacing:-0.5px;">
        Your results are saved.
      </div>
      <p style="color:#a9b0bc;font-size:15px;line-height:1.6;margin:18px 0 28px;">
        Your read, your current-city fit, and your locked #1 match are waiting whenever
        you're ready. This link is yours — it works on any device.
      </p>
      <a href="${resultsUrl}"
         style="display:inline-block;background:#f7f5ef;color:#141a21;text-decoration:none;border-radius:999px;padding:14px 28px;font-size:15px;font-weight:600;">
        Open my results
      </a>
      <p style="color:#6f7683;font-size:12px;margin-top:36px;">
        You're receiving this because you entered your email on findyourplace.app.
      </p>
    </div>
  </div>`;
}
