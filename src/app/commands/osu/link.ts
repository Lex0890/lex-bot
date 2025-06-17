import { type ChatInputCommand, type MessageCommand, type CommandData, Logger} from 'commandkit';
import { ApplicationCommandOptionType } from 'discord.js';
import { PrismaClient } from '@prisma/client';
import getUserData from '@/osuApi/getUserData';

const prisma = new PrismaClient();

await prisma.$connect().catch(err => Logger.error(err))



export const command: CommandData = {
  name: 'link',
  description: "Link your osu! account to your discord account.",
  options: [
    {
      name: 'user',
      description: 'The osu! user to link.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  
  
};

export const chatInput: ChatInputCommand = async (ctx) => {
  const user : string | undefined = ctx.options.get('user')?.value?.toString()
  console.log(user)
  const osuId = await getUserData(user)
  const exists = await prisma.osuUser.findUnique({
    where: {
      discordId: ctx.interaction.user.id.toString()
    }
  });

  if (exists) {
    try {
      if(osuId){
        await prisma.osuUser.update({
          where:{
            discordId: user
          },
          data:{
            osuId: osuId
          }
        })
        return ctx.interaction.reply('Successfully updated your osu account')
      }
    } catch (err: any) {
      Logger.error(`there was an error executing the command: ${err.message}`)
    }
  }

  try {
    if(osuId){
    await prisma.osuUser.create({
      data: {
        osuId: osuId,
        discordId: ctx.interaction.user.id.toString()
      }
    })
    }else{
      return ctx.interaction.reply('Username not found please try Again')
    }
    await ctx.interaction.reply('Successfully linked your osu! account!')
  } catch (error) {
    console.error('Error linking account:', error)
    await ctx.interaction.reply('Failed to link your account. Please try again.')
  }
  
};

export const message: MessageCommand = async (ctx) => {
  const user : string | undefined = ctx.args().toString()
  console.log(user)
  const osuId = await getUserData(user)
  const exists = await prisma.osuUser.findUnique({
    where: {
      discordId: ctx.message.author.id.toString()
    }
  });

  if (exists) {
    try {
      if(osuId){
        await prisma.osuUser.update({
          where:{
            discordId: ctx.message.author.id
          },
          data:{
            osuId: osuId
          }
        })
      } 
      
      return ctx.message.reply('Successfully updated your osu account')
    } catch (err: any) {
      Logger.error(`there was an error executing the command: ${err.message}`)
      return ctx.message.reply('There was an error updating your osu! account')
    }
  }

  try {
    if(osuId){
    await prisma.osuUser.create({
      data: {
        osuId: osuId,
        discordId: ctx.message.author.id.toString()
      }
    })
    }else{
      return ctx.message.reply('Username not found please try Again')
    }
    await ctx.message.reply('Successfully linked your osu! account!')
  } catch (error) {
    console.error('Error linking account:', error)
    await ctx.message.reply('Failed to link your account. Please try again.')
  }
};


