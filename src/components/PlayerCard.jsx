function PlayerCard({ player, playerImage }) {
  if (!player) {
    return null;
  }

  return (
    <article className="player-card">
      {playerImage && (
        <img
          src={playerImage}
          alt={player.displayName}
          className="player-card-image"
        />
      )}

      <h2>{player.displayName}</h2>

      <p className="player-card-position">
        {player.position?.name ?? "Position unavailable"}
      </p>

      <p className="player-card-jersey">
        #{player.jersey ?? "N/A"}
      </p>

      <p className="player-card-status">
        {player.status?.name ?? "Status unavailable"}
      </p>
    </article>
  );
}

export default PlayerCard;