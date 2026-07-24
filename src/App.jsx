import { useState, useEffect } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PlayerCard from "./components/PlayerCard";
import Comparison from "./components/Comparison";
import NewsFeed from "./components/NewsFeed";
import TeamSelector from "./components/TeamSelector";

import nflApi from "./api/nflApi";

import "./App.css";


function App() {
// selected player's full details
const [player, setPlayer] = useState(null);
// players from selected team's roster
const [playerList, setPlayerList] = useState([]);
// all NFL teams
const [teams, setTeams] = useState([]);

useEffect(() => {
  getTeams();
}, []);


  async function getPlayer(id){

    const response = await nflApi.get(
      `/nfl-player-info/v1/data?id=${id}`
    );

    console.log(response.data);

    setPlayer(response.data);
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


  return (
    <>
      <Header />

      <TeamSelector 
        teams={teams}
        getPlayers={getPlayers}
      />

      <SearchBar 
        playerList={playerList}
        getPlayer={getPlayer}
      />

      <div className="player-container">

        <PlayerCard player={player} />

        <PlayerCard />

      </div>


      <Comparison />

      <NewsFeed />

    </>
  );
}


export default App;