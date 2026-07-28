import { useState } from "react";

function SearchBar({
  playerList,
  getPlayer,
  getPlayerImage,
  getPlayer2,
  getPlayer2Image,
  getPlayerStats,
  getPlayer2Stats,
  year
}) {
  const [search, setSearch] = useState("");

  const filteredPlayer = playerList.filter((player) =>
    player.displayName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="search-section">
      <h2>Search Players</h2>

      <input
        className="player-search-input"
        type="text"
        placeholder="Search player"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="player-option-grid">
        {filteredPlayer.map((player) => (
          <article
            className="player-option-card"
            key={player.id}
          >
            <div className="player-option-info">
              <span className="player-option-name">
                {player.displayName}
              </span>

              <span className="player-option-position">
                {player.position?.abbreviation ??
                  player.position?.name ??
                  "Position unavailable"}
              </span>
            </div>

            <div className="player-option-actions">
              <button
                className="select-player-button"
                onClick={() => {
                  getPlayer(player);
                  getPlayerImage(player.id);
                  getPlayerStats(player.id, year);
                }}
              >
                Select Player 1
              </button>

              <button
                className="compare-player-button"
                onClick={() => {
                  getPlayer2(player);
                  getPlayer2Image(player.id);
                  getPlayer2Stats(player.id, year);
                }}
              >
                Select Player 2
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SearchBar;