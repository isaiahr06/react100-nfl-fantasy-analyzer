import { useState } from "react";
function SearchBar({playerList, getPlayer}) {
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
          <button 
            key={player.id}
            onClick={() => getPlayer(player.id)}
          >
            {player.displayName}
          </button>
        ))}
      </div>

    </section>
  );

}

export default SearchBar;