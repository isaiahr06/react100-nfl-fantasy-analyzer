import { useState, useEffect } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PlayerCard from "./components/PlayerCard";
import Comparison from "./components/Comparison";
import NewsFeed from "./components/NewsFeed";
import TeamSelector from "./components/TeamSelector";
import SeasonSelector from "./components/SeasonSelector";

import nflApi from "./api/nflApi";

import "./App.css";


function App() {
// selected player's full details
const [player, setPlayer] = useState(null);
// players from selected team's roster
const [playerList, setPlayerList] = useState([]);
// all NFL teams
const [teams, setTeams] = useState([]);
//stores player image url 
const [playerImage, setPlayerImage] = useState(null);
//2nd selected player's full details
const [player2, setPlayer2] =useState(null);
//stores 2nd player image url
const [player2Image, setPlayer2Image] = useState(null);
//Stores player 1 stats
const [playerStats, setPlayerStats] = useState(null);
//stores player 2 stats
const [player2Stats, setPlayer2Stats] = useState(null);
//stores the year
const [year, setYear] = useState("2025");

useEffect(() => {
  getTeams();
}, []);


  async function getPlayer(playerData){

  const response = await nflApi.get(
    `/nfl-player-info/v1/data?id=${playerData.id}`
  );

  setPlayer({
    ...response.data,
    position: playerData.position
  });
}

  async function getPlayer2(playerData) {

  const response = await nflApi.get(
    `/nfl-player-info/v1/data?id=${playerData.id}`
  );

  setPlayer2({
    ...response.data,
    position: playerData.position
  });
}

  async function getPlayerImage(id) {
  const response = await nflApi.get(
    `/nfl-ath-img?id=${id}`
  );

  setPlayerImage(response.data.image.href);
}

async function getPlayer2Image(id) {
  const response = await nflApi.get(
    `/nfl-ath-img?id=${id}`
  );

  setPlayer2Image(response.data.image.href);
}

async function getPlayers(teamId) {

  const response = await nflApi.get(
    `/nfl-player-listing/v1/data?id=${teamId}`
  );

  const groups = response.data.athletes;

  const allPlayers = groups.flatMap(group => group.items);

  setPlayerList(allPlayers);

}

async function getTeams() {

  const response = await nflApi.get(
    "/nfl-team-listing/v1/data"
  );

  console.log(response.data);

  setTeams(response.data);

}

async function getPlayerStats(id, year) {

  const response = await nflApi.get(
    `/nfl-ath-statistics?id=${id}&year=${year}`
  );

  console.log(response.data);

  setPlayerStats(response.data);
}

async function getPlayer2Stats(id, year) {

  const response = await nflApi.get(
    `/nfl-ath-statistics?id=${id}&year=${year}`
  );

  console.log(response.data);

  setPlayer2Stats(response.data);
}


function getStat(stats, categoryName, statName) {
  return stats?.statistics?.splits?.categories
    ?.find(category => category.name === categoryName)
    ?.stats
    ?.find(stat => stat.name === statName)
    ?.displayValue;
}



  return (
    <>
      <Header />

      <TeamSelector 
        teams={teams}
        getPlayers={getPlayers}
      />

      <SeasonSelector
        year={year}
        setYear={setYear}
      />

      <SearchBar 
        playerList={playerList}
        getPlayer={getPlayer}
        getPlayerImage={getPlayerImage}
        getPlayer2={getPlayer2}
        getPlayer2Image={getPlayer2Image}
        getPlayerStats={getPlayerStats}
        getPlayer2Stats={getPlayer2Stats}
        year={year}
      />

      <div className="player-container">

        <PlayerCard
          player={player}
          playerImage={playerImage}
        />

        <PlayerCard
          player={player2}
          playerImage={player2Image}
        />

        {playerStats && (
          <div>
            <h2>{player?.displayName} - {year} Stats</h2>

            <p>Passing Yards: {getStat(playerStats, "passing", "passingYards")}</p>

            <p>Passing TDs: {getStat(playerStats, "passing", "passingTouchdowns")}</p>

            <p>Interceptions: {getStat(playerStats, "passing", "interceptions")}</p>

            <p>Completion %: {getStat(playerStats, "passing", "completionPct")}</p>

            <p>Rushing Yards: {getStat(playerStats, "rushing", "rushingYards")}</p>

            <p>Rushing TDs: {getStat(playerStats, "rushing", "rushingTouchdowns")}</p>
          </div>
        )}

        {player2Stats && (
          <div>
            <h2>{player2?.displayName} - {year} Stats</h2>

            <p>Passing Yards: {getStat(player2Stats, "passing", "passingYards")}</p>

            <p>Passing TDs: {getStat(player2Stats, "passing", "passingTouchdowns")}</p>

            <p>Interceptions: {getStat(player2Stats, "passing", "interceptions")}</p>

            <p>Completion %: {getStat(player2Stats, "passing", "completionPct")}</p>

            <p>Rushing Yards: {getStat(player2Stats, "rushing", "rushingYards")}</p>

            <p>Rushing TDs: {getStat(player2Stats, "rushing", "rushingTouchdowns")}</p>
          </div>
        )}

      </div>



      <Comparison
        player={player}
        player2={player2}
        playerStats={playerStats}
        player2Stats={player2Stats}
        year={year}
      />

      <NewsFeed />

    </>
  );
}


export default App;