import { generateEndFrame, generateRandomFarcasterFrame } from '@/utils'
import { kv } from '@vercel/kv';
import { type } from 'os';

const BASE_URL = process.env.BASE_URL;
const wordTypeMap = {
  1 : 'noun',
  2 : 'verb',
  3 : 'adjective'
}
const storyWordTypeOrder = [1,2,1,2,2,1,1,1,3,1]

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
      // return res.status(302).setHeader('Location', `https://vmathur.com`).send('Redirecting');
  }

  const signedMessage = req.body;
  const choice = signedMessage.untrustedData.buttonIndex

  let round = 0;
  try {
    round = await kv.get('round');
  } catch (error) {
    await kv.set('round', 1);
  }
  let html = ''

  let typeIndex = storyWordTypeOrder[round-1]
  let type = wordTypeMap[typeIndex]

  console.log('round '+round)
  console.log('choice '+choice)
  console.log('screen '+req.query.screen)
  console.log('type '+typeIndex)

  if(req.query.screen && req.query.screen==='1'){
    html = await generateRandomFarcasterFrame(type) 
  }else if(req.query.screen && req.query.screen==='2'){
    if (choice === 1) {
      //todo store req.query.word_1
      html = generateEndFrame();
    } else if (choice === 2){
      //todo store req.query.word_2
      html = generateEndFrame();
    } else if (choice ===3 ){
      //todo store req.query.word_3    
      html = generateEndFrame();
    } else{
      html = await generateRandomFarcasterFrame(type) 
    }
  }
  return res.status(200).setHeader('Content-Type', 'text/html').send(html)
}