import { generateEndFrame, generateRandomFarcasterFrame, generateRoundOverFrame } from '@/utils'
import { kv } from '@vercel/kv';

const BASE_URL = process.env.BASE_URL;

const wordTypeMap = {
  1 : 'noun',
  2 : 'verb',
  3 : 'adjective'
}

// const storyString = `Once upon a time in a ${adjective[0]} ${noun[0]}, there lived a ${adjective[1]} ${noun[1]}. This ${noun[1]} was known throughout the land for their incredible ${adjective[2]} ${noun[2]}. One day, they decided to embark on a(n) ${adjective[3]} adventure.`
const wordOrder = [3,1,3,1,3,1,3];

export default async function handler (req,res){
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  if(req.query.state){
    console.log('trying to redirect')
      return res.status(302).setHeader('Location', `${BASE_URL}`).send('Redirecting');
      // return res.status(302).setHeader('Location', `https://vmathur.com`).send('Redirecting');
  }

  const signedMessage = req.body;
  const choice = signedMessage.untrustedData.buttonIndex

  let wordIndex = 0;
  try {
    wordIndex = await kv.get('wordIndex');
    if(!wordIndex){
      await kv.set('wordIndex', 0);
      wordIndex = 0;
    }
  } catch (error) {
    console.error(error)
  }

  if(wordIndex>=wordOrder.length){
    let html = generateRoundOverFrame();
    return res.status(200).setHeader('Content-Type', 'text/html').send(html)
  }  

  let html = ''

  let typeIndex = wordOrder[wordIndex]
  let type = wordTypeMap[typeIndex]

  console.log('wordIndex '+wordIndex)
  console.log('choice '+choice)
  console.log('screen '+req.query.screen)
  console.log('type '+type)

  if(req.query.screen && req.query.screen==='1'){
    html = await generateRandomFarcasterFrame(type) 
  }else if(req.query.screen && req.query.screen==='2'){
    if(choice===4){
      html = await generateRandomFarcasterFrame(type) 
    }else{
      if (choice === 1) {
        //todo store req.query.word_1
        saveWord(req.query.word_1, type)
        html = generateEndFrame();
      } else if (choice === 2){
        saveWord(req.query.word_2, type)
        html = generateEndFrame();
      } else if (choice ===3 ){
        saveWord(req.query.word_3, type)
        html = generateEndFrame();
      }

      //increment
      try {
        let newWordIndex = wordIndex+1
        await kv.set('wordIndex', newWordIndex);
      } catch (error) {
        console.error(error)
      }
    }
  }

  return res.status(200).setHeader('Content-Type', 'text/html').send(html)
}

async function saveWord(word, type){
  try {
    await kv.lpush(type, word)
  } catch (error) {
    console.error(error)
  }
}
