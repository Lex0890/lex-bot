import getToken from '@/utils/osu/getOsuToken';
import { MiddlewareContext } from 'commandkit';

export async function beforeExecute(ctx: MiddlewareContext) {
  await getToken();
}
