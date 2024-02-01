import { generateEndFrame, generateRandomFarcasterFrame, generateRoundOverFrame } from '@/utils'
import { kv } from '@vercel/kv';

const BASE_URL = process.env.BASE_URL;

const wordTypeMap = {
  1 : 'noun',
  2 : 'verb',
  3 : 'adjective'
}

const wordOrder = [3,1,3,1,3,1,3,1,1,3,3,3,1];

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
  let fid = signedMessage.untrustedData.fid
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

  console.log(wordIndex)
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
        saveWord(req.query.word_1, type, fid)
        html = generateEndFrame();
      } else if (choice === 2){
        saveWord(req.query.word_2, type, fid)
        html = generateEndFrame();
      } else if (choice ===3 ){
        saveWord(req.query.word_3, type, fid)
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

async function saveWord(word, type, fid){
  try {
    await kv.lpush(type, word)
    //todo store the words that users selected
    // await kv.lpush('users-words', {fid: fid, word: word})
  } catch (error) {
    console.error(error)
  }
}
