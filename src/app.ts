import { Client } from 'discord.js';
import { initdb } from '@/utils/db/init.ts';

const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});
await initdb();

export default client;
