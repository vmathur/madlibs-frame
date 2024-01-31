import { generateFarcasterFrame, generateEndFrame } from '@/utils'
import { kv } from '@vercel/kv';

const BASE_URL = process.env.BASE_URL;

export default async function handler (req,res){
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  console.log(req.query)
  if(req.query.state){
    console.log('theres state')
    // if(state===done){
      return res.status(302).setHeader('Location', `${BASE_URL}`).send('Redirecting');
  }

  const signedMessage = req.body;
  const choice = signedMessage.untrustedData.buttonIndex

  try {
    const round = await kv.get('round');
    console.log(round);
  } catch (error) {
    await kv.set('round', 1);
  }

  let html = ''
  if (choice === 1) {
    html = generateEndFrame()
    // html = generateFarcasterFrame(BASE_URL+"hello.jpg", choice)
  } else{
    html = generateFarcasterFrame(BASE_URL+"world.jpg", choice)
  }

  return res.status(200).setHeader('Content-Type', 'text/html').send(html)
}