import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLeague, simulateWeek, simulateAll } from "../api/leagueService";

export default function LeagueScreen() {
  const { leagueId } = useParams();

  const [teams, setTeams] = useState([]);
  const [week, setWeek] = useState({});
  const [isFinished, setIsFinished] = useState(false)
  const [weekNo, setWeekNo] = useState(0);

  function getLeagueInfo() {
      getLeague(leagueId).then((response) => {
        console.log(response);
        setTeams(response.teams.sort(
          function(a,b) {
            return -(a.gamesWon*3+a.gamesDrawn)+(b.gamesWon*3+b.gamesDrawn)}));
        setWeek(response.currentWeek);
        setWeekNo(response.currentWeekNo);
        setIsFinished(response.isLeagueFinished)
        if (isFinished)
          setWeekNo(6)
      });
  }

  function onClickSimulateOnce() {
    simulateWeek(leagueId).then(() => {
     getLeagueInfo()
    })
  }

  function onClickSimulateAll() {
    simulateAll(leagueId).then(() => {
     getLeagueInfo()
    })
  }

  useEffect(() => {
    getLeagueInfo()
    setInterval(() => {
      getLeagueInfo()
    }, 10000);
  }, []);

  function createTableRows() {
    return teams.map((team, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{team.name}</td>
          <td>{team.gamesWon + team.gamesDrawn + team.gamesLost}</td>
          <td>{team.gamesWon}</td>
          <td>{team.gamesDrawn}</td>
          <td>{team.gamesLost}</td>
          <td>{team.goalsFor}</td>
          <td>{team.goalsAgainst}</td>
          <td>{team.goalsFor - team.goalsAgainst}</td>
          <td>{team.gamesWon * 3 + team.gamesDrawn}</td>
        </tr>
      );
    });
  }

  function predictionsTable() {
    return (
      <table>
        <caption>Predictions</caption>
        <thead>
          <tr>
            <th>Team</th>
            <th>Winning possibility</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    );
  }

  return (
    <div>
      <table>
        <caption>League Standings - Week {weekNo}</caption>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Team</th>
            <th>Played</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>{createTableRows()}</tbody>
      </table>
      <button disabled={isFinished} onClick={() => onClickSimulateOnce()}>Simulate Week</button>
      <button disabled={isFinished} onClick={() => onClickSimulateAll()}>Simulate Rest of the Season</button>
    </div>
  );
}
