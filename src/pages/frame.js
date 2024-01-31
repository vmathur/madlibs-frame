import Head from 'next/head';

export default function Frame() {
    let BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    return (
        <div>
        <Head>
            <meta property="og:title" content="Madlibs" />
            <meta property="og:image" content={`${BASE_URL}welcome.jpg`} />
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content={`${BASE_URL}welcome.jpg`} />
            <meta property="fc:frame:button:1" content="Play" />
            <meta property="fc:frame:post_url" content={`${BASE_URL}api/post?screen=1`} />
        </Head>
        Frame
        </div>
    );
}