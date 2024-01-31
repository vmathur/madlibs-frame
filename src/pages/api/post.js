import { generateFarcasterFrame, generateEndFrame, generateRandomFarcasterFrame } from '@/utils'
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
  console.log(req.query.screen)
  if(req.query.screen && req.query.screen==='1'){
    html = generateRandomFarcasterFrame() 
  }else if(req.query.screen && req.query.screen==='2'){
    //todo store the choice;
    // if (choice === 1) {
    //   //todo
    // } else if (choice === 2){
    //   //todo
    // } else if (choice ===3 ){
    //   //todo
    // } else{
    //   //todo
    // }
    html = generateEndFrame();
  }

  return res.status(200).setHeader('Content-Type', 'text/html').send(html)
}