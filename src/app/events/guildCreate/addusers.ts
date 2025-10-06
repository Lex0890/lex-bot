import sql from '@/utils/db/init';
import { Logger, type EventHandler } from 'commandkit';

const handler: EventHandler<'guildCreate'> = async (guild) => {
  Logger.info(`Joined guild ${guild.name} (${guild.id})`);

  await guild.members.fetch();

  guild.members.cache.forEach(async (member) => {
    if (member.user.bot) return;
    await sql`INSERT INTO users (id, username)
    VALUES (${member.user.id}, ${member.user.username})
    ON CONFLICT (id) DO NOTHING
    `;
  });

  await sql`INSERT INTO guilds (id, name)
      VALUES(${guild.id}, ${guild.name})
      ON CONFLICT (id) DO NOTHING;
  `;
};

export default handler;
