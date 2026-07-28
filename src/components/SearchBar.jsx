import { useState } from "react";

function SearchBar({
  playerList,
  selectedPlayer1,
  getPlayer,
  getPlayerImage,
  getPlayer2,
  getPlayer2Image,
  getPlayerStats,
  getPlayer2Stats,
  year
}) {
  const [search, setSearch] = useState("");

  const filteredPlayers = playerList.filter((player) =>
    player.displayName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="search-section">
      <div className="search-heading">
        <span className="search-heading-icon" aria-hidden="true">
          ⌕
        </span>

        <h2>Search Players</h2>
      </div>

      <div className="search-input-wrapper">
        <input
          className="player-search-input"
          type="search"
          placeholder="Search player"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search players"
        />

        <span className="search-input-icon" aria-hidden="true">
          ⌕
        </span>
      </div>

      {search && filteredPlayers.length === 0 && (
        <p className="empty-message">
          No players found for "{search}".
        </p>
      )}

      <div className="player-option-grid">
        {filteredPlayers.map((player) => {
          const isPlayerOne =
            player.id === selectedPlayer1?.id;

          return (
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
                  type="button"
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
                  type="button"
                  className="compare-player-button"
                  disabled={isPlayerOne}
                  onClick={() => {
                    getPlayer2(player);
                    getPlayer2Image(player.id);
                    getPlayer2Stats(player.id, year);
                  }}
                >
                  {isPlayerOne
                    ? "Already Selected"
                    : "Select Player 2"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SearchBar;