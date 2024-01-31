const BASE_URL = process.env.BASE_URL;
import { kv } from '@vercel/kv';

export default async function handler (req,res){
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method Not Allowed' })
        return
    }

    try {
        const round = await kv.get('round');
        if(!round){
            const round = await kv.set('round',1);
        }
        console.log(round);
    } catch (error) {
        console.error(error)
    }

    let gameWords = []
    try {
        gameWords = await kv.get('gameWords');
        if(!gameWords){
            gameWords = []
            await kv.set('gameWords',gameWords);
        }
        console.log(gameWords);
    } catch (error) {
        console.error(error)
    }
    
    return res.status(200).send(gameWords)
}