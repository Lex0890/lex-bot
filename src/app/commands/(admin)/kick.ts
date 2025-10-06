import { ChatInputCommand, CommandData, CommandMetadataFunction } from 'commandkit';
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
};
