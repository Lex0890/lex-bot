import { ChatInputCommand, CommandData } from 'commandkit';
import { ApplicationCommandOptionType, MessageFlags} from 'discord.js';

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
  ],
};

const generateMetadata: CommandMetaDataFunction = async () => {
  return{
    
  }
} 

export const chatInput: ChatInputCommand = (ctx) => {
  const user = ctx.options.getUser('user');
  if (!user){
    return ctx.interaction.reply({content: 'User not found', flags: MessageFlags.EPHEMERAL})
  }
};
