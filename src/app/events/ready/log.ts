import type { Client } from 'discord.js';
import { Logger } from 'commandkit/logger';
import mongoose from 'mongoose';


export default function log(client: Client<true>) {
  const guilds = client.guilds.cache
  guilds.map(guild => {
    Logger.log(`-- ${guild.name}  --members(${guild.memberCount})`)
  });
  // if(mongoose.connection.readyState === 1){
  //   Logger.log("MongoDB connected")
  // }else {
  //   Logger.error("MongoDB not connected")
  // }
  Logger.log(`Logged in as ${client.user.username}!`);

}
