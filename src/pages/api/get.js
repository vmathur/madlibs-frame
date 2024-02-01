const BASE_URL = process.env.BASE_URL;
import { kv } from '@vercel/kv';



export default async function handler (req,res){
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method Not Allowed' })
        return
    }
    let adjective = ['_','_','_',,'_']
    let noun = ['_','_','_','_']
    let verb = ['_','_','_','_']
    try {
        adjective = await kv.lrange('adjective', 0, -1);
        noun = await kv.lrange('noun', 0, -1);
        verb = await kv.lrange('verb', 0, -1);  
    } catch (error) {
        console.error(error)
    }

    let userWords={}
    try {
        userWords = await kv.get('user-words')
    } catch (error) {
        console.error(error)
    }

    return res.status(200).send({
        adjective:adjective,
        noun:noun,
        verb:verb,
        userWords: userWords
    })
}