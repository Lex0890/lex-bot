import sql from '@/utils/db/init';
import type {
  ChatInputCommand,
  MessageCommand,
  CommandData,
  CommandMetadataFunction,
} from 'commandkit';
import { ApplicationCommandOptionType, MessageFlags, MessageFlagsBitField } from 'discord.js';

export const command: CommandData = {
  name: 'prefix',
  description: "shows the bot's prefix or sets it.",
  options: [
    {
      name: 'prefix',
      description: 'the prefix to set',
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],
};

export const generateMetadata: CommandMetadataFunction = async () => {
  // Dynamically determine the metadata for the command

  return {
    userPermissions: 'Administrator',
  };
};

export const chatInput: ChatInputCommand = async (ctx) => {
  const prefix = ctx.interaction.options.getString('prefix');
  if (prefix) {
    const guild = await sql`
      UPDATE guilds
      SET prefix = ${prefix}
      WHERE id = ${ctx.interaction.guildId}
      `;
    await ctx.interaction.reply(`Prefix set to ${prefix}`);
  } else {
    const guild = await sql`SELECT * FROM guilds WHERE id = ${ctx.interaction.guildId}`;
    const prefix = guild[0]?.prefix || '!';
    await ctx.interaction.reply(`Prefix: ${prefix}`);
  }
};

export const message: MessageCommand = async (ctx) => {
  const prefix = ctx.message.content.split(' ')[1];
  if (prefix) {
    const guild = await sql`
      UPDATE guilds
      SET prefix = ${prefix}
      WHERE id = ${ctx.message.guildId}
      `;
    await ctx.message.reply({
      content: `Prefix set to ${prefix}`,
    });
  } else {
    const guild = await sql`SELECT * FROM guilds WHERE id = ${ctx.message.guildId}`;
    const prefix = guild[0]?.prefix || '!';
    await ctx.message.reply(`Prefix: ${prefix}`);
  }
};
