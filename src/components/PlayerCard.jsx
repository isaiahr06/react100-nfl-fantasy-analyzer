function PlayerCard({ player, playerImage }) {
  return (
    <div>
      {player && (
        <>
          <img
            className="player-image"
            src={playerImage}
            alt={player.displayName}
          />

          <h2>{player.displayName}</h2>

          <p>Position: {player.position?.name}</p>
          <p>Jersey: #{player.jersey}</p>
          <p>Height: {player.displayHeight}</p>
          <p>Weight: {player.displayWeight}</p>
          <p>Age: {player.age}</p>
          <p>Experience: {player.experience?.years} years</p>
          <p>Status: {player.status?.name}</p>
        </>
      )}
    </div>
  );
}

export default PlayerCard;