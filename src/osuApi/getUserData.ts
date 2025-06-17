
import { OsuUser } from "@/types/osuUser.ts";
import  getOsuToken  from "./getOsuToken.ts";
const token = await getOsuToken()

async function getUserData(username: string | undefined) {
    try {
        const response : Response = await fetch(`https://osu.ppy.sh/api/v2/users/${username}/osu`,{
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
    
        })
        const data : OsuUser = await response.json()
        return data.id.toString()
        
    } catch (error) {
        
    }
}


export default getUserData
