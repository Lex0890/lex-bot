import sql from '../db/init';

interface OsuToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

async function getToken(): Promise<void> {
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

    const data: OsuToken = await res.json();
    await setToken(data);
  }

  // Si aún es válido, lo sacamos de la BD
  const token = await sql`SELECT access_token FROM osu_token WHERE id = 1`;
  return token[0]?.access_token;
}

async function setToken(osuToken: OsuToken) {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + osuToken.expires_in * 1000);

  await sql`
    INSERT INTO osu_token (id, access_token, expires_at, created_at)
    VALUES (
      1,
      ${osuToken.access_token},
      ${expiresAt},
      ${now}
    )
    ON CONFLICT (id) DO UPDATE
    SET
      access_token = EXCLUDED.access_token,
      expires_at   = EXCLUDED.expires_at,
      created_at   = EXCLUDED.created_at
  `;
}

async function isExpired(): Promise<boolean> {
  const token = await sql`SELECT * FROM osu_token WHERE id = 1`.then((res) => res[0]);
  if (!token) return true;

  const now = new Date();
  return now >= token.expires_at;
}

export default getToken;
