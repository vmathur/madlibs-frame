export const BASE_URL = process.env.BASE_URL

// generate an html page with the relevant opengraph tags
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

export function generateRandomFarcasterFrame(image) {
  const word1 = 'a'
  const word2 = 'b';
  const word3 = 'c';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${image}" />
      <meta property="fc:frame:button:1" content="${word1}" />
      <meta property="fc:frame:button:2" content="${word2}" />
      <meta property="fc:frame:button:3" content="${word3}" />
      <meta property="fc:frame:button:3" content="🔄 More options" />
      <meta property="fc:frame:post_url" content="${BASE_URL}/api/post" />
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