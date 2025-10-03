import EmbedBuilderTS from '@/utils/discord/embed';
import type { ChatInputCommand, MessageCommand, CommandData } from 'commandkit';
import { ApplicationCommandOptionType } from 'discord.js';

export const command: CommandData = {
  name: 'avatar',
  description: 'shows the avatar of the user or the mentioned user.',
  options: [
    {
      name: 'user',
      description: 'the user to show the avatar of',
      type: ApplicationCommandOptionType.Mentionable,
      required: false,
    },
  ],
};

export const chatInput: ChatInputCommand = async (ctx) => {
  const user = ctx.interaction.options.getUser('user') ?? ctx.interaction.user;
  const avatar = user.displayAvatarURL({ size: 1024 });

  const embed = new EmbedBuilderTS()
    .title(`${user.username}'s Avatar`)
    .image(avatar)
    .color('Green')
    .timestamp()
    .build();

  await ctx.interaction.reply({ embeds: [embed] });
};

export const message: MessageCommand = async (ctx) => {
  const user = ctx.message.mentions.users.first() ?? ctx.message.author;
  const avatar = user.displayAvatarURL({ size: 1024 });

  const embed = new EmbedBuilderTS()
    .title(`${user.username}'s Avatar`)
    .image(avatar)
    .color('Green')
    .timestamp()
    .build();

  await ctx.message.reply({ embeds: [embed] });
};
