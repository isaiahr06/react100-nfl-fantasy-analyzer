import "./App.css";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PlayerCard from "./components/PlayerCard";
import Comparison from "./components/Comparison";
import NewsFeed from "./components/NewsFeed";

function App() {
  return (
    <>
      <Header />

      <SearchBar />

      <div className="player-container">
        <PlayerCard />
        <PlayerCard />
      </div>

      <Comparison />

      <NewsFeed />
    </>
  );
}

export default App;