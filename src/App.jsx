import { useEffect, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PlayerCard from "./components/PlayerCard";
import Comparison from "./components/Comparison";
import TeamSelector from "./components/TeamSelector";
import SeasonSelector from "./components/SeasonSelector";
import YouTubeHighlights from "./components/YouTubeHighlights";

import nflApi from "./api/nflApi";

import "./App.css";

function App() {
  // Selected player one's full details
  const [player, setPlayer] = useState(null);

  // Players from selected team's roster
  const [playerList, setPlayerList] = useState([]);

  // All NFL teams
  const [teams, setTeams] = useState([]);

  // Player one image URL
  const [playerImage, setPlayerImage] = useState(null);

  // Selected player two's full details
  const [player2, setPlayer2] = useState(null);

  // Player two image URL
  const [player2Image, setPlayer2Image] = useState(null);

  // Player one statistics
  const [playerStats, setPlayerStats] = useState(null);

  // Player two statistics
  const [player2Stats, setPlayer2Stats] = useState(null);

  // Selected season
  const [year, setYear] = useState("2025");

  useEffect(() => {
    getTeams();
  }, []);

  async function getPlayer(playerData) {
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

    const allPlayers = groups.flatMap(
      (group) => group.items
    );

    setPlayerList(allPlayers);

  }

  async function getTeams() {
    const response = await nflApi.get(
      "/nfl-team-listing/v1/data"
    );

    setTeams(response.data);
  }

  async function getPlayerStats(id, selectedYear) {
    const response = await nflApi.get(
      `/nfl-ath-statistics?id=${id}&year=${selectedYear}`
    );

    setPlayerStats(response.data);
  }

  async function getPlayer2Stats(id, selectedYear) {
    const response = await nflApi.get(
      `/nfl-ath-statistics?id=${id}&year=${selectedYear}`
    );

    setPlayer2Stats(response.data);
  }

  return (
    <>
      <Header />

      <main>
        <div className="filters-panel">
          <TeamSelector
            teams={teams}
            getPlayers={getPlayers}
          />

          <div
            className="filter-divider"
            aria-hidden="true"
          />

          <SeasonSelector
            year={year}
            setYear={setYear}
          />

          <div
            className="filter-divider"
            aria-hidden="true"
          />

          <div className="filter-panel-brand">
            <span className="filter-panel-badge">
              NFL
            </span>

            <div>
              <strong>Fantasy Analyzer</strong>
              <span>{year} Season</span>
            </div>
          </div>
        </div>

        <SearchBar
          playerList={playerList}
          selectedPlayer1={player}
          getPlayer={getPlayer}
          getPlayerImage={getPlayerImage}
          getPlayer2={getPlayer2}
          getPlayer2Image={getPlayer2Image}
          getPlayerStats={getPlayerStats}
          getPlayer2Stats={getPlayer2Stats}
          year={year}
        />

        {player && player2 && (
          <section className="selected-players-section">
            <h2>Selected Players</h2>

            <div className="player-cards-container">
              <PlayerCard
                player={player}
                playerImage={playerImage}
              />

              <PlayerCard
                player={player2}
                playerImage={player2Image}
              />
            </div>
          </section>
        )}

        {player &&
          player2 &&
          playerStats &&
          player2Stats && (
            <Comparison
              player={player}
              player2={player2}
              playerStats={playerStats}
              player2Stats={player2Stats}
              playerImage={playerImage}
              player2Image={player2Image}
              year={year}
            />
          )}

        <YouTubeHighlights
          player={player}
          player2={player2}
        />
      </main>
    </>
  );
}

export default App;