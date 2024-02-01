import { useState, useEffect } from 'react'

export default function Home() {
  let BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
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
    <div>
      <h1>Madlibs</h1>
      <h2>The Adventure of the {getValue(adjective[0])} {getValue(noun[0])}</h2>
      <div>Once upon a time in a {getValue(adjective[1])} {getValue(noun[1])}, there lived a {getValue(adjective[0])} {getValue(noun[0])}. This {getValue(noun[0])} was known throughout the land for their incredible {getValue(adjective[2])} {getValue(noun[2])}. One day, they decided to embark on a(n) {getValue(adjective[3])} adventure.</div>
      {/* <div>They packed their [Noun] with all the necessary [Plural Noun] and set off on their journey. Along the way, they encountered a [Adjective] [Animal] who offered to join them on their quest. Together, they faced many [Adjective] challenges and overcame them with their [Adjective] [Plural Noun].</div>
      <div>Finally, after a long and [Adjective] journey, they reached the top of a [Adjective] [Mountain]. At the summit, they found a [Noun] made of [Precious Gem]. It was said that anyone who possessed this [Noun] would be granted [Adjective] [Superpower].</div>
      <div>With their newfound [Noun], our hero returned to their [Noun], where they used their [Superpower] to bring [Adjective] [Noun] to their kingdom. And so, they lived [Adverb] ever after.</div> */}
    </div>
  );
}

function getValue(value){
  return value ? value : '___';
}