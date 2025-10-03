import sql from '@/utils/db/init';
import EmbedBuilderTS from '@/utils/discord/embed';
import getUser from '@/utils/osu/getUser';
import type { ChatInputCommand, MessageCommand, CommandData } from 'commandkit';
import { ApplicationCommandOptionType } from 'discord.js';

export const command: CommandData = {
  name: 'link',
  description: 'links your discord account to your osu! account.',
  options: [
    {
      name: 'user',
      description: 'The user to link',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};

export const chatInput: ChatInputCommand = async (ctx) => {
  const user = ctx.interaction.options.getString('user');

  if (!user) return;

  const osuUser = await getUser(user);

  if (!osuUser) {
    const embed = new EmbedBuilderTS()
      .description(`Could not find osu! user "${user}".`)
      .color('Red')
      .timestamp()
      .build();
    await ctx.interaction.reply({ embeds: [embed] });
    return;
  }
  const id = osuUser.id as number;
  const query = await sql`
    INSERT INTO users (id, osu_id)
    VALUES (${ctx.interaction.user.id}, ${id})
    ON CONFLICT (id) DO UPDATE SET osu_id = ${id}
    RETURNING *;
  `;

  const embed = new EmbedBuilderTS()
    .description(`${user} has been linked to your discord account.`)
    .color('Green')
    .timestamp()
    .build();

  await ctx.interaction.reply({ embeds: [embed] });
};

export const message: MessageCommand = async (ctx) => {
  const user = ctx.message.content.split(' ')[1];
  if (!user) {
    const embed = new EmbedBuilderTS()
      .description('Please provide a user to link.')
      .color('Red')
      .timestamp()
      .build();

    await ctx.message.reply({ embeds: [embed] });
    return;
  }

  const osuUser = await getUser(user);
  if (!osuUser) {
    const embed = new EmbedBuilderTS()
      .description(`Could not find osu! user "${user}".`)
      .color('Red')
      .timestamp()
      .build();
    await ctx.message.reply({ embeds: [embed] });
    return;
  }

  const id = osuUser.id as number;

  const query = await sql`
  INSERT INTO users (discord_id, osu_id)
  VALUES (${ctx.message.author.id}, ${id})
  ON CONFLICT (discord_id) DO UPDATE SET osu_id = ${id}
  RETURNING *;
`;
  const embed = new EmbedBuilderTS()
    .description(`${user} has been linked to your discord account.`)
    .color('Green')
    .timestamp()
    .build();

  await ctx.message.reply({ embeds: [embed] });
};
