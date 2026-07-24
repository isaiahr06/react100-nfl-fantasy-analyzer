import { useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PlayerCard from "./components/PlayerCard";
import Comparison from "./components/Comparison";
import NewsFeed from "./components/NewsFeed";

import nflApi from "./api/nflApi";

import "./App.css";


function App() {

  const [player, setPlayer] = useState(null);


  async function getPlayer(id){

    const response = await nflApi.get(
      `/nfl-player-info/v1/data?id=${id}`
    );

    console.log(response.data);

    setPlayer(response.data);
  }


  return (
    <>
      <Header />

      <SearchBar />

      <button onClick={() => getPlayer(4360644)}>
        Load Player
      </button>


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