import { generateFarcasterFrame } from '@/utils'
const BASE_URL = process.env.BASE_URL;

export default async function handler (req,res){
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const signedMessage = req.body;
  const choice = signedMessage.untrustedData.buttonIndex
  console.log(choice)
  
  let html = ''
  if (choice === 1) {
    html = generateFarcasterFrame(BASE_URL+"world.jpg", choice)
  } else {
    html = generateFarcasterFrame(BASE_URL+"world.jpg", choice)
  }

  return res.status(200).setHeader('Content-Type', 'text/html').send(html)
}
