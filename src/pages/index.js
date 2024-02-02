import { useState, useEffect } from 'react'

const developerUrl = 'https://warpcast.com/vmathur';
const farcasterBaseProfileUrl = 'https://warpcast.com/';
const gameUrl = 'https://warpcast.com/vmathur/0xa8dbba40'
const githubUrl = 'https://github.com/vmathur/madlibs-frame'

export default function Home() {
  let BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  const [data, setData] = useState(null)
  const [adjective, setAdjective] = useState([])
  const [noun, setNoun] = useState([])
  const [verb, setVerb] = useState([])
  const [userWords, setUserWords] = useState({})

  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/get')
      .then((res) => res.json())
      .then((data) => {
        setAdjective(data.adjective)
        setNoun(data.noun)
        setVerb(data.verb)
        setUserWords(data.userWords)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  return (
    <div className='main'>
      <span className="game-section" >
        <h2 className="section-title">The Legend of the {getValue(noun[0])}</h2>
        <p>Once upon a time in a(n) {getValue(adjective[0])} kingdom, there lived a brave {getValue(noun[0])}. This {getValue(noun[0])} had a(n) {getValue(adjective[1])} companion, a(n) {getValue(noun[1])} who was always {getValue(adjective[2])}. Together, they embarked on a(n) {getValue(adjective[3])} adventure to find the legendary {getValue(noun[2])}.</p>
        <p>Along the way, they encountered a(n) {getValue(adjective[4])} dragon and a(n) {getValue(adjective[5])} witch. With their {getValue(noun[3])} and {getValue(noun[4])}, they defeated the villains and finally reached the hidden {getValue(noun[2])}, where they discovered {getValue(adjective[6])} treasures beyond their wildest dreams. The {getValue(noun[0])} and their {getValue(noun[1])} became heroes in the {getValue(adjective[7])} kingdom, and their epic tale was passed down through generations.</p>
        <p>Years later, the {getValue(noun[1])} had a(n) {getValue(adjective[8])} family, and they all cherished the {getValue(adjective[9])} legacy of their ancestors. The {getValue(noun[0])} and {getValue(noun[1])}s descendants continued to protect the {getValue(adjective[7])} kingdom, ensuring peace for generations to come.</p>
      </span>
      <span className='story-pic'>
      <br></br>
      <img
        src="/story-2-1.jpg"
        alt="Story Image"
        style={{
          maxWidth: '80%',
          height: 'auto',
          borderRadius: '10px' // Adjust the radius value as per your preference
        }}
      /></span>     
       <br></br>
       <br></br>
      {userWords && <b>Contributors</b>}
      {userWords && <UserWordsComponent userWords={userWords} />}
      <br></br>
      <span className='footer-section'>
      <div className='footer'>Play <a href={gameUrl}>here</a> on warpcaster</div>
      <div className='footer'>Built by <a href={developerUrl}>vmathur</a>. Code on <a href={githubUrl}>github</a></div>
      </span>
    </div>
  );
}

function getValue(value){
  return value ? <u className='contributed'>{value}</u> : <span className='contributed'>____</span>;
}

function UserWordsComponent({ userWords }) {
  return (
    <div>
      <ul>
        {Object.entries(userWords).map(([key, value]) => (
          <li key={key}>
            <strong className='contributed'>{key}</strong>: <a href={farcasterBaseProfileUrl+value}>{value}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}