import 'dotenv/config';

import { Client, IntentsBitField } from 'discord.js';
import { CommandKit } from 'commandkit';

import { dirname as dn } from 'node:path';
import { fileURLToPath } from 'node:url';

import mongoose from "mongoose";

const dirname = dn(fileURLToPath(import.meta.url));

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

new CommandKit({
    client,
    eventsPath: `${dirname}/events`,
    commandsPath: `${dirname}/commands`
});
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        if(mongoose.connection.readyState === 0){
            throw new Error("there was an error connecting to the data base please review the uri");
        } else{
            console.log('-- DB loaded')
        }
        await client.login(process.env.TOKEN);
    } catch (error) {
        console.error(`there was an error setting up the bot: ${error}`);
    }
})();
