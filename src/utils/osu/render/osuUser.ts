import { createCanvas, loadImage, registerFont } from 'canvas';
import { AttachmentBuilder } from 'discord.js';
import { UserProfile } from '@/types';
import { Logger } from 'commandkit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fontPath = __dirname.includes('.commandkit')
  ? path.resolve(process.cwd(), 'src', 'utils', 'fonts', 'Federant-Regular.ttf')
  : path.resolve(__dirname, '../../fonts/Federant-Regular.ttf');

registerFont(path.join(fontPath), {
  family: 'mmg',
});

const width = 800;
const height = 649;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

async function renderProfileCard(osuUser: UserProfile, requester: string) {
  // 2️⃣ Colocar avatar
  const avatar = await loadImage(osuUser.avatar_url ?? 'https://a.ppy.sh/7562902'); // ejemplo
  const avatarX = 70;
  const avatarY = 165;
  const avatarSize = 350;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(avatarX, avatarY, avatarSize, avatarSize, 20);
  ctx.clip();
  ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
  ctx.restore();

  // 1️⃣ Cargar fondo (tu plantilla)
  const background = await loadImage('https://i.imgur.com/w9ByLYx.png');
  ctx.drawImage(background, 0, 0, width, height);

  // 3️⃣ Escribir nombre de usuario
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 60px "mmg"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(osuUser?.username ?? 'Null', 400, 75);
  // Logger.info(osuUser?.country_code);

  // 4️⃣ Mostrar stats
  const image = await loadImage(
    `https://flagsapi.com/${osuUser?.country_code ?? 'us'}/flat/32.png`,
  );
  ctx.font = '24px sans-serif';
  ctx.fillStyle = '#a8caff';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${osuUser?.statistics?.pp ?? '0'} pp`, 560, 215);
  ctx.fillText(`#${osuUser?.statistics?.global_rank ?? '0'}`, 585, 282);
  ctx.fillText(`#${osuUser?.statistics?.country_rank ?? '0'}`, 600, 353);
  const textWidth = ctx.measureText(`#${osuUser?.statistics?.country_rank ?? '0'}`).width;
  // Logger.debug(textWidth);
  ctx.drawImage(image, 600 + textWidth + 10, 353 - 32 / 2, 32, 32);
  ctx.fillText(`${Math.floor((osuUser?.statistics?.hit_accuracy ?? 0) * 100) / 100}%`, 615, 423);
  ctx.fillText(`${osuUser?.statistics?.level?.current ?? 0}`, 635, 490);
  const lvlCurrent = osuUser?.statistics?.level?.current ?? 0;
  const lvlProgress = osuUser?.statistics?.level?.progress ?? 0;
  const lvl = lvlCurrent + lvlProgress / 100;

  drawPiechart(746, 479, 16, lvl);

  const playTime = osuUser?.statistics?.play_time ?? 0;

  const totalHours = Math.floor(playTime / 3600);
  const totalMinutes = Math.floor((playTime % 3600) / 60);

  ctx.textAlign = 'center';
  ctx.fillText(`${totalHours}h ${totalMinutes}m`, 104, 580);
  ctx.fillText(`${osuUser.statistics?.play_count}`, 306, 580);
  ctx.fillText(`${osuUser.user_achievements?.length ?? 0}`, 514, 580);
  // 15 px

  return new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'osu-profile.png' });
}

function drawPiechart(x: number, y: number, r: number, lvl: number) {
  const percent = lvl - Math.floor(lvl); // 0 a <1
  if (percent <= 0) return;

  const startAngle = -Math.PI / 2; // inicia arriba
  const endAngle = startAngle + percent * 2 * Math.PI;

  ctx.beginPath();
  ctx.arc(x, y, r, startAngle, endAngle);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.stroke();
}

export default renderProfileCard;
