import { useEffect, useState } from 'react'
import { createNewLeague, getAllLeagues } from '../api/leagueService';

export default function HomeScreen({navigation}) {
  const [leagueName, setLeagueName] = useState("")
  const [leagues, setLeagues] = useState([])

  useEffect(() => {
    getAllLeagues().then((response) => {
      setLeagues(response)
    })
  }, [])

  return (
    <div>
      Leagues
      {
        leagues.map((league) => {
          return (
            <a key={league.id} href={`/league/${league.id}`}> <div>{league.name} | Week {league.currentWeekNo}</div> </a> 
          )
        })
      }
      <input onChange={e => setLeagueName(e.target.value)} placeholder="League name"/>
      <button onClick={() => {
        createNewLeague(leagueName)
      }}>Create League</button>
    </div>
  )
}
