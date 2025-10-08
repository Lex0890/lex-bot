import sql from '@/utils/db/init';
import EmbedBuilderTS from '@/utils/discord/embed';
import hasUserMention from '@/utils/discord/hasMention';
import getUser from '@/utils/osu/getUser';
import renderProfileCard from '@/utils/osu/render/osuUser';
import { ChatInputCommand, CommandData, MessageCommand } from 'commandkit';
import { ApplicationCommandOptionType } from 'discord.js';

export const command: CommandData = {
  name: 'osu',
  description: 'osu! profile overview',
  options: [
    {
      name: 'user',
      description: 'The user to get the profile of',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
};

export const chatInput: ChatInputCommand = async (ctx) => {
  const user = ctx.options.getString('user') || ctx.interaction.user.id;

  await ctx.interaction.deferReply();

  let osu_id: string | undefined;

  if (hasUserMention(user)) {
    const id = user.replace(/<@!?(\d+)>/, '$1');
    osu_id = await sql`SELECT osu_id FROM users WHERE id = ${id}`.then((r) => r[0]?.osu_id);
  } else if (user === ctx.interaction.user.id) {
    osu_id = await sql`SELECT osu_id FROM users WHERE id = ${user}`.then((r) => r[0]?.osu_id);
  } else {
    osu_id = user;
  }

  if (!osu_id) {
    const embed = new EmbedBuilderTS()
      .title(
        user === ctx.interaction.user.id
          ? 'You have not linked your osu! account. Please use `/link` to do so.'
          : 'The user you mentioned has not linked their osu! account.',
      )
      .color('Red')
      .timestamp()
      .build();
    return ctx.interaction.editReply({ embeds: [embed] });
  }

  const osuUser = await getUser(osu_id);
  if (!osuUser) {
    const embed = new EmbedBuilderTS()
      .title(`Could not find osu! user "${osu_id}".`)
      .color('Red')
      .timestamp()
      .build();
    return ctx.interaction.editReply({ embeds: [embed] });
  }

  // Render final
  const card = await renderProfileCard(osuUser, ctx.interaction.user.id);
  await ctx.interaction.editReply({ files: [card] });
};

export const message: MessageCommand = async (ctx) => {
  // Extrae args respetando comillas
  const regex = /"([^"]+)"|(\S+)/g;
  const matches = [...ctx.message.content.matchAll(regex)];

  // Convierte matches a array de strings
  const args = matches.map((m) => m[1] ?? m[2]);

  // args[0] es el comando (!message), args[1] es el primer argumento
  const user = args[1] || ctx.message.author.id;
  let osu_id: string | undefined;

  if (hasUserMention(user)) {
    const id = user.replace(/<@!?(\d+)>/, '$1');
    osu_id = await sql`SELECT osu_id FROM users WHERE id = ${id}`.then((r) => r[0]?.osu_id);
  } else if (user === ctx.message.author.id) {
    osu_id = await sql`SELECT osu_id FROM users WHERE id = ${user}`.then((r) => r[0]?.osu_id);
  } else {
    osu_id = user;
  }

  if (!osu_id) {
    const embed = new EmbedBuilderTS()
      .title(
        user === ctx.message.author.id
          ? 'You have not linked your osu! account. Please use `/link` to do so.'
          : 'The user you mentioned has not linked their osu! account.',
      )
      .color('Red')
      .timestamp()
      .build();
    return ctx.message.reply({ embeds: [embed] });
  }

  const osuUser = await getUser(osu_id);
  if (!osuUser) {
    const embed = new EmbedBuilderTS()
      .title(`Could not find osu! user "${osu_id}".`)
      .color('Red')
      .timestamp()
      .build();
    return ctx.message.reply({ embeds: [embed] });
  }

  // Render final
  const card = await renderProfileCard(osuUser, ctx.message.author.id);
  await ctx.message.reply({ files: [card] });
};
