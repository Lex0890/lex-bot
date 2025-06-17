import { URL } from 'node:url';
import type { token } from '@/types/token';

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const baseURL = new URL('https://osu.ppy.sh/oauth/token')
const body = `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials&scope=public`
const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json"
}
async function getOsuToken() {
   

    const response = await fetch(baseURL, {
        method: 'POST',
        headers: headers,
        body: body
    });
    
    const data: token = await response.json()
    
      
    return data.access_token
}

export default getOsuToken



