import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLeague } from "../api/leagueService";

export default function LeagueScreen() {
  const { leagueId } = useParams();

  const [teams, setTeams] = useState([]);
  const [week, setWeek] = useState({});
  const [weekNo, setWeekNo] = useState(0);

  function getLeagueInfo() {
      getLeague(leagueId).then((response) => {
        console.log(response);
        setTeams(response.teams);
        setWeek(response.currentWeek);
        setWeekNo(response.currentWeekNo);
      });
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
            <th>Position</th>
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
    </div>
  );
}
