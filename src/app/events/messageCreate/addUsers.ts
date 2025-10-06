import sql from '@/utils/db/init';
import { EventHandler } from 'commandkit';

const handler: EventHandler<'messageCreate'> = async (message) => {
  if (message.author.bot) return;

  await sql`INSERT INTO guilds (id, name) VALUES (${message.guildId}, ${message.guild?.name ?? 'null'}) ON CONFLICT DO NOTHING`;

  await sql`INSERT INTO users (id, username) VALUES (${message.author.id}, ${message.author.username}) ON CONFLICT DO NOTHING`;
};

export default handler;
