import axios from "axios";

export async function getAllLeagues() {
  const response = await fetch(
    "http://localhost:8080/api/v1/league/all", {
      method: "GET",
    }
  )

  if (response.ok) {
    const leagues = await response.json()
    return leagues
  }

  console.error('[LeagueService]', response.status)
}

export async function getLeague(leagueId) {
  const response = await fetch(
    `http://localhost:8080/api/v1/league/${leagueId}`, {
      method: "GET",
    }
  )

  if (response.ok) {
    const leagues = await response.json()
    return leagues
  }

  console.error('[LeagueService]', response.status)
}

export async function simulateWeek(leagueId) {
  const response = await fetch(
    `http://localhost:8080/api/v1/simulation/single/${leagueId}`, {
      method: "POST",
    }
  )
}

export async function simulateAll(leagueId) {
  const response = await fetch(
    `http://localhost:8080/api/v1/simulation/all/${leagueId}`, {
      method: "POST",
    }
  )
}

export function createNewLeague(leagueName) {
  if (leagueName === "")
    return;
  console.log(leagueName);

  axios.post('http://localhost:8080', {

  })
  

}
