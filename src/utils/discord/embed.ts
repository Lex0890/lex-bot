import { EmbedBuilder as DjsEmbedBuilder, APIEmbed, ColorResolvable, AttachmentBuilder } from 'discord.js';

/**
 * Simple, chainable Embed Builder wrapper for discord.js (TypeScript)
 * - Wraps discord.js EmbedBuilder and exposes concise chainable methods
 * - Returns the underlying discord.js EmbedBuilder via build()
 *
 * Compatible with discord.js v14+.
 */
export default class EmbedBuilderTS {
  private eb: DjsEmbedBuilder;

  constructor() {
    this.eb = new DjsEmbedBuilder();
  }

  title(title: string, url?: string) {
    this.eb.setTitle(title);
    if (url) this.eb.setURL(url);
    return this;
  }

  description(text: string) {
    this.eb.setDescription(text);
    return this;
  }

  color(color: ColorResolvable) {
    this.eb.setColor(color);
    return this;
  }

  url(url: string) {
    this.eb.setURL(url);
    return this;
  }

  timestamp(date?: Date) {
    this.eb.setTimestamp(date ?? new Date());
    return this;
  }

  footer(text: string, iconURL?: string) {
    this.eb.setFooter({ text, iconURL });
    return this;
  }

  image(url: string) {
    this.eb.setImage(url);
    return this;
  }

  thumbnail(url: string) {
    this.eb.setThumbnail(url);
    return this;
  }

  author(name: string, iconURL?: string, url?: string) {
    this.eb.setAuthor({ name, iconURL, url });
    return this;
  }

  addField(name: string, value: string, inline = false) {
    // discord.js renamed addField(s) to addFields
    this.eb.addFields({ name, value, inline });
    return this;
  }

  addFields(fields: { name: string; value: string; inline?: boolean }[]) {
    this.eb.addFields(...fields);
    return this;
  }

  clearFields() {
    this.eb.data.fields = [];
    return this;
  }

  // Attach an image from a local file (AttachmentBuilder) and set it as embed image.
  // Note: caller must pass the returned AttachmentBuilder to message options too.
  setImageFromAttachment(attachment: AttachmentBuilder, attachmentName: string) {
    // Discord API requires image urls like "attachment://filename.ext"
    this.eb.setImage(`attachment://${attachmentName}`);
    return this;
  }

  // Shortcut to set a small inline list of fields from a record
  fieldsFromRecord(record: Record<string, string>) {
    const fields = Object.entries(record).map(([k, v]) => ({ name: k, value: v, inline: true }));
    this.eb.addFields(...fields);
    return this;
  }

  // Merge raw API embed data (partial) into current embed
  merge(raw: Partial<APIEmbed>) {
    // This uses discord.js's toJSON-friendly API. We only set known properties.
    if (raw.title) this.eb.setTitle(raw.title);
    if (raw.description) this.eb.setDescription(raw.description);
    if (raw.url) this.eb.setURL(raw.url);
    if (raw.timestamp) this.eb.setTimestamp(new Date(raw.timestamp));
    if (raw.color) this.eb.setColor(raw.color as ColorResolvable);
    if (raw.image?.url) this.eb.setImage(raw.image.url);
    if (raw.thumbnail?.url) this.eb.setThumbnail(raw.thumbnail.url);
    if (raw.footer?.text) this.eb.setFooter({ text: raw.footer.text, iconURL: raw.footer.icon_url ?? undefined });
    if (raw.author?.name)
      this.eb.setAuthor({
        name: raw.author.name,
        iconURL: raw.author.icon_url ?? undefined,
        url: raw.author.url ?? undefined,
      });
    if (raw.fields)
      this.eb.addFields(...raw.fields.map((f) => ({ name: f.name, value: f.value, inline: f.inline ?? false })));
    return this;
  }

  // Return the underlying discord.js EmbedBuilder
  build() {
    return this.eb;
  }

  // Return an APIEmbed (JSON) ready to be sent if you prefer raw objects
  toJSON(): APIEmbed {
    return this.eb.toJSON();
  }
}

/*
Example usage:

import EmbedBuilderTS from './discord-embed-builder';

const embed = new EmbedBuilderTS()
  .title('Hola mundo', 'https://example.com')
  .description('Este es un embed construido con el builder personalizado')
  .color('#ff4400')
  .footer('Pie de página', 'https://i.imgur.com/AfFp7pu.png')
  .timestamp()
  .addField('Campo 1', 'Valor 1')
  .addField('Campo 2', 'Valor 2', true)
  .build();

// Envío:
// channel.send({ embeds: [embed] });
*/
