/** * @param {import('discord.js').Client} client */
export default (client) => {
    try{
        const guilds = client.guilds.cache;
        console.log(`-- Loaded in ${guilds.size} guilds`)
        guilds.forEach(guild =>{
            console.log(`-- ${guild.name} (${guild.id})`)
        })
        console.log(`bot started as: ${client.user.username}`)
    }catch(error){
        console.error(`-- there was an error: ${error.message}`)
    }
}