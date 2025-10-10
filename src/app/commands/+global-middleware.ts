import { log } from '@/utils/discord/logger';
import { MiddlewareContext } from 'commandkit';

export async function afterExecute(ctx: MiddlewareContext) {
  if (!ctx.isMessage()) {
    log(
      `Executed command: ${ctx.commandName} by ${ctx.interaction.user.id} (${ctx.interaction.user.tag}) in ${
        ctx.interaction.guild?.name || 'DMs'
      }`,
    );
  } else {
    log(
      `Executed command: ${ctx.commandName} by ${ctx.message.author.id} (${ctx.message.author.tag}) in ${
        ctx.message.guild?.name || 'DMs'
      }`,
    );
  }
}
