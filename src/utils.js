export const BASE_URL = process.env.BASE_URL
const axios = require('axios');


export async function generateRandomFarcasterFrame(type) {
  let image = BASE_URL+'game.jpg';
  
  let word_1 = await getWord(type)
  let word_2 = await getWord(type)
  let word_3 = await getWord(type)

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${image}" />
      <meta property="fc:frame:button:1" content="${word_1}" />
      <meta property="fc:frame:button:2" content="${word_2}" />
      <meta property="fc:frame:button:3" content="${word_3}" />
      <meta property="fc:frame:button:4" content="🔄 More options" />
      <meta property="fc:frame:post_url" content="${BASE_URL}/api/post?screen=2&word_1=${word_1}&word_2=${word_2}&word_3=${word_3}" />
    <body>
    </body>
    </html>
  `
}

export function generateEndFrame() {
  let image = BASE_URL+'end.jpg'
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta name="fc:frame" content="vNext" />
      <meta name="fc:frame:image" content="${image}" />
      <meta name="fc:frame:button:1" content="See results" />
      <meta name="fc:frame:button:1:action" content="post_redirect">
      <meta name="fc:frame:post_url" content="${BASE_URL}/api/post?state=done" />
    <body>
    </body>
    </html>
  `
}

export function generateFarcasterFrame(image, choice) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${image}" />
      <meta property="fc:frame:post_url" content="${BASE_URL}/api/post" />

      ${
        choice === 2
          ? '<meta property="fc:frame:button:1" content="Yes" />'
          : ''
      }
    </head>
    <body>      
    </body>
    </html>
  `
}

async function getWord(type){
  const apiUrl = 'https://api.api-ninjas.com/v1/randomword?type='+type; // Replace with your API endpoint
  const apiKey = '7+3g7iiysipWcwzyopjvKA==vmtMx1li43hUsZBO'; // Replace with your actual API key
  console.log(apiUrl)
  const axiosConfig = {
    headers: {
      'X-Api-Key': apiKey,
    },
  };

  let word = axios.get(apiUrl, axiosConfig)
  .then((response) => {
    const responseData = response.data;
    return responseData.word
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  return word
}