import { BASE_URL } from '@/utils'
import Head from 'next/head';

export default function Home() {
  let BASE_URL = process.env.BASE_URL
 
  return (
    <div>
      <Head>
        <meta property="og:title" content="Madlibs" />
        <meta property="og:image" content={`${BASE_URL}/hello.jpg`} />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={`${BASE_URL}/hello.jpg`} />
        <meta property="fc:frame:button:1" content="Dog" />
        <meta property="fc:frame:button:2" content="Cat" />
        <meta property="fc:frame:button:3" content="Horse" />
        <meta property="fc:frame:button:4" content="🔄 More options" />
        <meta property="fc:frame:post_url" content={`${BASE_URL}/api/post`} />
      </Head>
      <h1>Madlibs</h1>
      <div>Once upon a time, there lived a ____ </div>
    </div>
  );
}
