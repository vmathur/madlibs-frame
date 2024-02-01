import { useState, useEffect } from 'react'

export default function Home() {
  let BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  let gameUrl = 'https://google.com'
  const [data, setData] = useState(null)
  const [adjective, setAdjective] = useState([])
  const [noun, setNoun] = useState([])
  const [verb, setVerb] = useState([])

  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/get')
      .then((res) => res.json())
      .then((data) => {
        setAdjective(data.adjective)
        setNoun(data.noun)
        setVerb(data.verb)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>

  return (
    <div className='main'>
      <h1>Madcaster</h1>
      <h2>The Adventure of the {getValue(adjective[0])} {getValue(noun[0])}</h2>
      <p className='section-1'>Once upon a time in a {getValue(adjective[1])} {getValue(noun[1])}, there lived a {getValue(adjective[0])} {getValue(noun[0])}. This {getValue(noun[0])} was known throughout the land for their incredible {getValue(adjective[2])} {getValue(noun[2])}. One day, they decided to embark on a(n) {getValue(adjective[3])} adventure.</p>
      <p className='section-2'>They packed their {getValue(noun[3])} with all the necessary {getValue(noun[4])} and set off on their journey. Along the way, they encountered a {getValue(adjective[4])} horse who offered to join them on their quest. Together, they faced many {getValue(adjective[5])} challenges and overcame them with their {getValue(adjective[6])} {getValue(noun[5])}.</p>
      <div className='footer'>Play <a href={gameUrl}>here</a> on warpcaster</div>
    </div>
  );
}

function getValue(value){
  return value ? <u>{value}</u> : '____';
}