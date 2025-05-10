/** * @param {import('discord.js').Client} client */
export default (client) => {
    try{
        const guilds = client.guilds.cache;
        console.log(`-- Loaded in ${guilds.size} guilds`)
        for (const guild of guilds){
            console.log(`-- ${guild.name} (${guild.id})`)
        }
    }catch(error){
        console.error(`-- there was an error: ${error.message}`)
    }
}