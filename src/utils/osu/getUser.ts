import { Logger } from 'commandkit';
import sql from '../db/init';
import { UserProfile } from '@/types';

async function getUser(user: string | number) {
  const token = await sql`SELECT * FROM osu_token`.then((res) => res[0]?.access_token);
  try {
    const res = await fetch(`https://osu.ppy.sh/api/v2/users/${user}/osu`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data as UserProfile;
  } catch (error) {
    Logger.error(error);
    return null;
  }
}

export default getUser;
