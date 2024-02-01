export const BASE_URL = process.env.BASE_URL
const fs = require('fs');
const path = require('path');
import nounList from "./words/nouns"
import adjectiveList from "./words/adjectives"


export async function generateRandomFarcasterFrame(type) {
  let image = BASE_URL+'game.jpg';
  if(type==='noun'){
    image = BASE_URL+'game-noun.jpg';
  }else if(type==='adjective'){
    image = BASE_URL+'game-adjective.jpg'; 
  }
  
  let words = await getWords(type);
  let word_1 = words[0];
  let word_2 = words[1];
  let word_3 = words[2];

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
      <meta name="fc:frame:post_url" content="${BASE_URL}api/post?state=done" />
    <body>
    </body>
    </html>
  `
}

export function generateRoundOverFrame() {
  let image = BASE_URL+'roundOver.jpg'
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta name="fc:frame" content="vNext" />
      <meta name="fc:frame:image" content="${image}" />
      <meta name="fc:frame:button:1" content="See results" />
      <meta name="fc:frame:button:1:action" content="post_redirect">
      <meta name="fc:frame:post_url" content="${BASE_URL}api/post?state=done" />
    <body>
    </body>
    </html>
  `
}

export function generateAlreadyPlayedFrame() {
  let image = BASE_URL+'already-played.jpg'
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta name="fc:frame" content="vNext" />
      <meta name="fc:frame:image" content="${image}" />
      <meta name="fc:frame:post_url" content="${BASE_URL}api/post?state=done" />
      <meta name="fc:frame:button:1" content="See results">
      <meta name="fc:frame:button:1:action" content="post_redirect">
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

async function getWords(type){
  let wordList = []
  if(type==='noun'){
    wordList=nounList
  }else if(type==='adjective'){
    wordList=adjectiveList
  }

  const randomIndices = [];
  const randomWords = [];

  while (randomIndices.length < 3) {
    const randomIndex = Math.floor(Math.random() * wordList.length);

    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
      randomWords.push(wordList[randomIndex]);
    }
  }

  return randomWords;
  return randomWords
}