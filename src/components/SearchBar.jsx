import { useState } from "react";
function SearchBar({playerList, getPlayer, getPlayerImage, getPlayer2, getPlayer2Image, getPlayerStats, getPlayer2Stats, year}) {
  const [search,setSearch] = useState("");

  const filteredPlayer = playerList.filter((player) =>
    player.displayName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>

      <h2>
        Search Players
      </h2>

      <input 
      type="text"
      placeholder="Search player"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />

      <div>
      {filteredPlayer.map((player) => (
        <div key={player.id}>
          
          <button
            onClick={() => {
              getPlayer(player);
              getPlayerImage(player.id);
              getPlayerStats(player.id, year)
            }}
          >
            {player.displayName}
          </button>

          <button
            onClick={() => {
              getPlayer2(player);
              getPlayer2Image(player.id);
              getPlayer2Stats(player.id, year)
            }}
          >
            Compare
          </button>

        </div>
        ))}
      </div>

    </section>
      );

}

export default SearchBar;