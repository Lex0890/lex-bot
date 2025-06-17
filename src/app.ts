

import { Client } from 'discord.js';
import { PrismaClient } from '@prisma/client/extension';
const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});

export default client;
