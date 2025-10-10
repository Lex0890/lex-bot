import type {
  ChatInputCommand,
  CommandData,
  CommandMetadataFunction,
  MessageCommand,
} from 'commandkit';
import { ApplicationCommandOptionType, MessageFlags } from 'discord.js';

export const command: CommandData = {
  name: 'kick',
  description: 'kicks a user',
  options: [
    {
      name: 'user',
      description: 'the user to kick',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'reason',
      description: 'the reason for kicking the user',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
};

export const generateMetadata: CommandMetadataFunction = async () => {
  return {
    userPermissions: 'KickMembers',
  };
};

export const chatInput: ChatInputCommand = async (ctx) => {
  const user = ctx.options.getUser('user');
  if (!user) {
    return ctx.interaction.reply({ content: 'User not found', flags: MessageFlags.Ephemeral });
  }
  const reason = ctx.options.getString('reason') || 'No reason provided';
  await ctx.interaction.guild?.members.kick(user, reason);
  await ctx.interaction.reply({ content: `Kicked ${user.tag}`, flags: MessageFlags.Ephemeral });
};

export const message: MessageCommand = async (ctx) => {
  const user = ctx.message.mentions.users.first();
  if (!user) {
    return ctx.message.reply({ content: 'Please mention a user to kick.' });
  }
  const reason = ctx.message.content.split(' ').slice(2).join(' ') || 'No reason provided';
  await ctx.message.guild?.members.kick(user, reason);
  await ctx.message.reply({ content: `Kicked ${user.tag}` });
};
