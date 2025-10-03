import sql from '../db/init';

interface OsuToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

async function getToken() {
  if (await isExpired()) {
    const res = await fetch('https://osu.ppy.sh/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.OSU_CLIENT_ID,
        client_secret: process.env.OSU_CLIENT_SECRET,
        grant_type: 'client_credentials',
        scope: 'public',
      }),
    });
    if (!res.ok) throw new Error('Failed to fetch token');
    const data = await res.json();
  }
}

async function setToken(osuToken: OsuToken) {
  const now = new Date();
  const expiresAt = new Date(Date.now() + (osuToken.expires_in ?? 0) * 1000);

  await sql`
    INSERT INTO osu_token (id, access_token, expires_at, created_at)
    VALUES (
      1,                                      -- id fijo
      ${osuToken.access_token},
      ${expiresAt},
      ${now}
    )
    ON CONFLICT (id) DO UPDATE
    SET
      access_token = EXCLUDED.access_token,
      expires_at = EXCLUDED.expires_at,
      created_at = EXCLUDED.created_at
  `;
}

async function isExpired(): Promise<boolean> {
  const token = await sql`SELECT * FROM osu_token`.then((res) => res[0]);
  const now = Date.now();
  if (!token) return true;
  return now >= token.created_at + token.expires_in * 1000;
}

export default getToken;
