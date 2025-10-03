import { Client } from 'discord.js';
import sql, { initdb } from '@/utils/db/init.ts';
import { commandkit } from 'commandkit';
import getToken from './utils/osu/getOsuToken';

const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});

commandkit.setPrefixResolver(async (message) => {
  if (!message.guildId) return '!';

  const guild = await sql`SELECT * FROM guilds WHERE id = ${message.guildId}`;

  const prefix = guild[0]?.prefix || '!';

  return prefix;
});

await initdb();

await getToken();

export default client;
