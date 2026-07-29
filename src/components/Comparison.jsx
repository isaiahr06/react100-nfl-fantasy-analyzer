function Comparison({
  player,
  player2,
  playerStats,
  player2Stats,
  playerImage,
  player2Image,
  year
}) {

// --------------------
// Stat Helpers
// --------------------
  // Get a specific stat from the API response
  function getStat(stats, categoryName, statName) {
    return stats?.statistics?.splits?.categories
      ?.find(category => category.name === categoryName)
      ?.stats
      ?.find(stat => stat.name === statName)
      ?.displayValue
      ?.replace(/,/g, "");
  }
//EX: getStat(playerStats, "passing", "passingYards")
// --------------------
// Winner Helpers
// --------------------
  // Determine which player wins a stat
  function getWinner(
    player1Value,
    player2Value,
    lowerIsBetter = false
  ) {
    const value1 = Number(player1Value) || 0;
    const value2 = Number(player2Value) || 0;

    if (value1 === value2) {
      return "tie";
    }

    if (lowerIsBetter) {
      return value1 < value2 ? "player1" : "player2";
    }

    return value1 > value2 ? "player1" : "player2";
  }
  // Compare one stat between both players
  function compareStat(
    category,
    stat,
    lowerIsBetter = false
  ) {
    const player1Value = getStat(
      playerStats,
      category,
      stat
    );

    const player2Value = getStat(
      player2Stats,
      category,
      stat
    );

    return {
      player1Value,
      player2Value,
      winner: getWinner(
        player1Value,
        player2Value,
        lowerIsBetter
      )
    };
  }

  // Convert "player1"/"player2" into the player's name
  function getWinnerName(result) {
    if (result === "player1") {
      return player?.displayName;
    }

    if (result === "player2") {
      return player2?.displayName;
    }

    return "Tie";
  }

  // Apply winner CSS styling to the winning value
  function getWinnerClass(result, playerNumber) {
    if (result === "tie") {
      return "";
    }

    return result === playerNumber ? "winner" : "";
  }

// --------------------
// Fantasy Scoring
// --------------------
  // Calculate PPR fantasy points using standard scoring
  function getFantasyPoints(stats) {
    const passingYards =
      Number(
        getStat(stats, "passing", "passingYards")
      ) || 0;

    const passingTDs =
      Number(
        getStat(stats, "passing", "passingTouchdowns")
      ) || 0;

    const interceptions =
      Number(
        getStat(stats, "passing", "interceptions")
      ) || 0;

    const rushingYards =
      Number(
        getStat(stats, "rushing", "rushingYards")
      ) || 0;

    const rushingTDs =
      Number(
        getStat(stats, "rushing", "rushingTouchdowns")
      ) || 0;

    const receptions =
      Number(
        getStat(stats, "receiving", "receptions")
      ) || 0;

    const receivingYards =
      Number(
        getStat(stats, "receiving", "receivingYards")
      ) || 0;

    const receivingTDs =
      Number(
        getStat(
          stats,
          "receiving",
          "receivingTouchdowns"
        )
      ) || 0;

    const points =
      passingYards / 25 +
      passingTDs * 4 +
      interceptions * -2 +
      rushingYards / 10 +
      rushingTDs * 6 +
      receptions +
      receivingYards / 10 +
      receivingTDs * 6;

    return points.toFixed(2);
  }

  // Determine which player has more fantasy points
  function getFantasyWinner() {
    const player1Points = Number(
      getFantasyPoints(playerStats)
    );

    const player2Points = Number(
      getFantasyPoints(player2Stats)
    );

    if (player1Points === player2Points) {
      return "tie";
    }

    return player1Points > player2Points
      ? "player1"
      : "player2";
  }

// --------------------
// Stat Comparison Results
// --------------------
// Store comparison results once so they can be reused throughout the component
  // Compare all passing stats
  const passingYards = compareStat(
    "passing",
    "passingYards"
  );

  const passingTDs = compareStat(
    "passing",
    "passingTouchdowns"
  );

  const interceptions = compareStat(
    "passing",
    "interceptions",
    true
  );

  const completionPct = compareStat(
    "passing",
    "completionPct"
  );

 // Compare all rushing stats
  const rushingYards = compareStat(
    "rushing",
    "rushingYards"
  );

  const rushingTDs = compareStat(
    "rushing",
    "rushingTouchdowns"
  );

  const yardsPerRush = compareStat(
    "rushing",
    "yardsPerRushAttempt"
  );

  // Compare all receiving stats
  const receptions = compareStat(
    "receiving",
    "receptions"
  );

  const receivingYards = compareStat(
    "receiving",
    "receivingYards"
  );

  const receivingTDs = compareStat(
    "receiving",
    "receivingTouchdowns"
  );

  const yardsPerReception = compareStat(
    "receiving",
    "yardsPerReception"
  );

// --------------------
// Overall Comparison
// --------------------
  // Count how many stat categories each player wins
  function getOverallScore() {
    const stats = [
      passingYards,
      passingTDs,
      interceptions,
      completionPct,
      rushingYards,
      rushingTDs,
      yardsPerRush,
      receptions,
      receivingYards,
      receivingTDs,
      yardsPerReception
    ];

    let player1Score = 0;
    let player2Score = 0;

    stats.forEach(stat => {
      if (stat.winner === "player1") {
        player1Score++;
      }

      if (stat.winner === "player2") {
        player2Score++;
      }
    });

    return {
      player1Score,
      player2Score
    };
  }
  // Determine the overall comparison winner
  function getOverallWinner() {
    const score = getOverallScore();

    if (
      score.player1Score === score.player2Score
    ) {
      return "tie";
    }

    return score.player1Score > score.player2Score
      ? "player1"
      : "player2";
  }

  const overallScore = getOverallScore();
  const overallWinner = getOverallWinner();
  const fantasyWinner = getFantasyWinner();

// --------------------
// Reusable UI
// --------------------
  // Reusable row for displaying a single stat comparison
  function StatRow({ label, result }) {
    return (
      <div className="stat-row">
        <p
          className={getWinnerClass(
            result.winner,
            "player1"
          )}
        >
          {result.player1Value ?? 0}
        </p>

        <p className="stat-label">{label}</p>

        <p
          className={getWinnerClass(
            result.winner,
            "player2"
          )}
        >
          {result.player2Value ?? 0}
        </p>
      </div>
    );
  }

  return (
  <section className="comparison-section">
    <h2 className="comparison-title">
      {year} Player Comparison
    </h2>

    <div className="comparison-header">
      <div className="comparison-player">
        {playerImage && (
          <img
            src={playerImage}
            alt={player?.displayName}
            className="comparison-headshot"
          />
        )}

        <div className="comparison-player-info">
          <h3>{player?.displayName}</h3>
          <p>{player?.position?.name}</p>
        </div>
      </div>

      <div className="comparison-vs">
        VS
      </div>

      <div className="comparison-player">
        {player2Image && (
          <img
            src={player2Image}
            alt={player2?.displayName}
            className="comparison-headshot"
          />
        )}

        <div className="comparison-player-info">
          <h3>{player2?.displayName}</h3>
          <p>{player2?.position?.name}</p>
        </div>
      </div>
    </div>

    <div className="comparison-summary">
      <div className="summary-card">
        <p className="summary-label">Overall Winner</p>
        <h3>{getWinnerName(overallWinner)}</h3>
      </div>

      <div className="summary-card">
        <p className="summary-label">Fantasy Winner</p>
        <h3>{getWinnerName(fantasyWinner)}</h3>
      </div>
    </div>

    

    <div className="comparison-group">
      <h3 className="comparison-group-title">
        Player Details
      </h3>

      <div className="player-details">
        <div className="detail-row">
          <p>{player?.displayHeight ?? "N/A"}</p>
          <p className="detail-label">Height</p>
          <p>{player2?.displayHeight ?? "N/A"}</p>
        </div>

        <div className="detail-row">
          <p>{player?.displayWeight ?? "N/A"}</p>
          <p className="detail-label">Weight</p>
          <p>{player2?.displayWeight ?? "N/A"}</p>
        </div>

        <div className="detail-row">
          <p>{player?.age ?? "N/A"}</p>
          <p className="detail-label">Age</p>
          <p>{player2?.age ?? "N/A"}</p>
        </div>

        <div className="detail-row">
          <p>{player?.experience?.years ?? 0} years</p>
          <p className="detail-label">Experience</p>
          <p>{player2?.experience?.years ?? 0} years</p>
        </div>
      </div>
    </div>

    <div className="comparison-group">
      <h3 className="comparison-group-title">
        Passing
      </h3>

      <StatRow
        label="Passing Yards"
        result={passingYards}
      />

      <StatRow
        label="Passing Touchdowns"
        result={passingTDs}
      />

      <StatRow
        label="Interceptions"
        result={interceptions}
      />

      <StatRow
        label="Completion Percentage"
        result={completionPct}
      />
    </div>

    <div className="comparison-group">
      <h3 className="comparison-group-title">
        Rushing
      </h3>

      <StatRow
        label="Rushing Yards"
        result={rushingYards}
      />

      <StatRow
        label="Rushing Touchdowns"
        result={rushingTDs}
      />

      <StatRow
        label="Yards Per Rush"
        result={yardsPerRush}
      />
    </div>

    <div className="comparison-group">
      <h3 className="comparison-group-title">
        Receiving
      </h3>

      <StatRow
        label="Receptions"
        result={receptions}
      />

      <StatRow
        label="Receiving Yards"
        result={receivingYards}
      />

      <StatRow
        label="Receiving Touchdowns"
        result={receivingTDs}
      />

      <StatRow
        label="Yards Per Reception"
        result={yardsPerReception}
      />
    </div>
  </section>
);
}

export default Comparison;