import { useState, useEffect } from 'react'

export default function Home() {
  let BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/get')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>
 
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
      <h1>Madlibs</h1>
      <h2>The Adventure of the [Adjective] [Noun]</h2>
      <div>Once upon a time in a [Adjective] [Noun], there lived a [Adjective] [Noun]. This [Noun] was known throughout the land for their incredible [Adjective] [Plural Noun]. One day, they decided to embark on a(n) [Adjective] adventure.</div>
      {/* <div>They packed their [Noun] with all the necessary [Plural Noun] and set off on their journey. Along the way, they encountered a [Adjective] [Animal] who offered to join them on their quest. Together, they faced many [Adjective] challenges and overcame them with their [Adjective] [Plural Noun].</div>
      <div>Finally, after a long and [Adjective] journey, they reached the top of a [Adjective] [Mountain]. At the summit, they found a [Noun] made of [Precious Gem]. It was said that anyone who possessed this [Noun] would be granted [Adjective] [Superpower].</div>
      <div>With their newfound [Noun], our hero returned to their [Noun], where they used their [Superpower] to bring [Adjective] [Noun] to their kingdom. And so, they lived [Adverb] ever after.</div> */}
    </div>
  );
}
