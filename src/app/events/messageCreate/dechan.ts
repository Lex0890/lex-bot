import { Client, Message } from "discord.js";

const dechanId  = process.env.DECHAN

export default function dechan(message : Message, client : Client ) {
    if (message.author.id === dechanId) {
        message.reply('muerete dechan')
    }
}