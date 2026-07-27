function Comparison({ player, player2, playerStats, player2Stats, year }) {

  function getStat(stats, categoryName, statName) {
    return stats?.statistics?.splits?.categories
      ?.find(category => category.name === categoryName)
      ?.stats
      ?.find(stat => stat.name === statName)
      ?.displayValue
      ?.replace(/,/g, "");
  }

  function getWinner(player1Value, player2Value, lowerIsBetter = false) {
    const value1 = Number(player1Value);
    const value2 = Number(player2Value);

    if (value1 === value2) {
      return "tie";
    }

    if (lowerIsBetter) {
      return value1 < value2 ? "player1" : "player2";
    }

    return value1 > value2 ? "player1" : "player2";
  }

  function compareStat(category, stat, lowerIsBetter = false) {
    const player1Value = getStat(playerStats, category, stat);
    const player2Value = getStat(player2Stats, category, stat);

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

  function getWinnerName(result) {
    if (result === "player1") {
      return player?.displayName;
    }

    if (result === "player2") {
      return player2?.displayName;
    }

    return "Tie";
  }

  function getWinnerClass(result, playerNumber) {
    if (result === "tie") {
      return "";
    }

    return result === playerNumber ? "winner" : "";
  }

  function getOverallScore() {
    const stats = [
      compareStat("passing", "passingYards"),
      compareStat("passing", "passingTouchdowns"),
      compareStat("passing", "interceptions", true),
      compareStat("passing", "completionPct"),

      compareStat("rushing", "rushingYards"),
      compareStat("rushing", "rushingTouchdowns"),
      compareStat("rushing", "yardsPerRushAttempt"),

      compareStat("receiving", "receptions"),
      compareStat("receiving", "receivingYards"),
      compareStat("receiving", "receivingTouchdowns"),
      compareStat("receiving", "yardsPerReception")
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

  function getOverallWinner() {
  const score = getOverallScore();

  if (score.player1Score === score.player2Score) {
    return "tie";
  }

  return score.player1Score > score.player2Score
    ? "player1"
    : "player2";
}

  function getFantasyPoints(stats) {
    const passingYards =
      Number(getStat(stats, "passing", "passingYards")) || 0;

    const passingTDs =
      Number(getStat(stats, "passing", "passingTouchdowns")) || 0;

    const interceptions =
      Number(getStat(stats, "passing", "interceptions")) || 0;

    const rushingYards =
      Number(getStat(stats, "rushing", "rushingYards")) || 0;

    const rushingTDs =
      Number(getStat(stats, "rushing", "rushingTouchdowns")) || 0;

    const receptions =
      Number(getStat(stats, "receiving", "receptions")) || 0;

    const receivingYards =
      Number(getStat(stats, "receiving", "receivingYards")) || 0;

    const receivingTDs =
      Number(getStat(stats, "receiving", "receivingTouchdowns")) || 0;

    const points =
      (passingYards / 25) +
      (passingTDs * 4) +
      (interceptions * -2) +
      (rushingYards / 10) +
      (rushingTDs * 6) +
      (receptions * 1) +
      (receivingYards / 10) +
      (receivingTDs * 6);

    return points.toFixed(2);
  }

  function getFantasyWinner() {
    const player1Points = Number(getFantasyPoints(playerStats));
    const player2Points = Number(getFantasyPoints(player2Stats));

    if (player1Points === player2Points) {
      return "tie";
    }

    return player1Points > player2Points
      ? "player1"
      : "player2";
  }

  function getPositionGroup(position) {
    if (position === "Quarterback") {
      return "QB";
    }

    if (["Running Back", "Fullback"].includes(position)) {
      return "RB";
    }

    if (["Wide Receiver", "Tight End"].includes(position)) {
      return "RECEIVER";
    }

    if (
      ["Defensive End", "Defensive Tackle", "Nose Tackle"]
        .includes(position)
    ) {
      return "DEFENSIVE_LINE";
    }

    if (
      ["Linebacker", "Outside Linebacker", "Middle Linebacker"]
        .includes(position)
    ) {
      return "LINEBACKER";
    }

    if (
      ["Cornerback", "Safety", "Free Safety", "Strong Safety"]
        .includes(position)
    ) {
      return "DEFENSIVE_BACK";
    }

    return "OTHER";
  }

  const player1Position =
    getPositionGroup(player?.position?.name);

  const player2Position =
    getPositionGroup(player2?.position?.name);

  const samePosition =
    player1Position === player2Position;

  const overallScore = getOverallScore();
  const overallWinner = getOverallWinner();
  const fantasyWinner = getFantasyWinner();

  function StatRow({ label, result }) {
  return (
    <div className="stat-row">
      <p className={getWinnerClass(result.winner, "player1")}>
        {result.player1Value ?? 0}
      </p>

      <p className="stat-label">
        {label}
      </p>

      <p className={getWinnerClass(result.winner, "player2")}>
        {result.player2Value ?? 0}
      </p>
    </div>
  );
}

  return (
    <section>
      <h2>Comparison</h2>

      <div>
        <h3>{player?.displayName}</h3>
        <h3>{player2?.displayName}</h3>
      </div>

      <div>
        <p>Position</p>
        <p>{player?.position?.name}</p>
        <p>{player2?.position?.name}</p>
      </div>

      <div>
        <p>Height</p>
        <p>{player?.displayHeight}</p>
        <p>{player2?.displayHeight}</p>
      </div>

      <div>
        <p>Weight</p>
        <p>{player?.displayWeight}</p>
        <p>{player2?.displayWeight}</p>
      </div>

      <div>
        <p>Age</p>
        <p>{player?.age}</p>
        <p>{player2?.age}</p>
      </div>

      <div>
        <p>Experience</p>
        <p>{player?.experience?.years} years</p>
        <p>{player2?.experience?.years} years</p>
      </div>

      {samePosition && (
        <p>
          Same Position: {player1Position}
        </p>
      )}

      {(playerStats || player2Stats) && (
        <div>

          <h3>{year} Season Stats</h3>

          <h4>Passing</h4>

          <div>
            <p>Passing Yards</p>
            <p className={getWinnerClass(
              compareStat("passing", "passingYards").winner,
              "player1"
            )}>
              {compareStat("passing", "passingYards").player1Value}
            </p>

            <p className={getWinnerClass(
              compareStat("passing", "passingYards").winner,
              "player2"
            )}>
              {compareStat("passing", "passingYards").player2Value}
            </p>

            <p>
              Winner: {
                getWinnerName(
                  compareStat("passing", "passingYards").winner
                )
              }
            </p>
          </div>

          <div>
            <p>Passing TDs</p>

            <p className={getWinnerClass(
              compareStat("passing", "passingTouchdowns").winner,
              "player1"
            )}>
              {compareStat("passing", "passingTouchdowns").player1Value}
            </p>

            <p className={getWinnerClass(
              compareStat("passing", "passingTouchdowns").winner,
              "player2"
            )}>
              {compareStat("passing", "passingTouchdowns").player2Value}
            </p>

            <p>
              Winner: {
                getWinnerName(
                  compareStat("passing", "passingTouchdowns").winner
                )
              }
            </p>
          </div>

          <div>
            <p>Interceptions</p>

            <p className={getWinnerClass(
              compareStat("passing", "interceptions", true).winner,
              "player1"
            )}>
              {compareStat("passing", "interceptions", true).player1Value}
            </p>

            <p className={getWinnerClass(
              compareStat("passing", "interceptions", true).winner,
              "player2"
            )}>
              {compareStat("passing", "interceptions", true).player2Value}
            </p>

            <p>
              Winner: {
                getWinnerName(
                  compareStat("passing", "interceptions", true).winner
                )
              }
            </p>
          </div>

          <div>
            <p>Completion %</p>

            <p className={getWinnerClass(
              compareStat("passing", "completionPct").winner,
              "player1"
            )}>
              {compareStat("passing", "completionPct").player1Value}
            </p>

            <p className={getWinnerClass(
              compareStat("passing", "completionPct").winner,
              "player2"
            )}>
              {compareStat("passing", "completionPct").player2Value}
            </p>

            <p>
              Winner: {
                getWinnerName(
                  compareStat("passing", "completionPct").winner
                )
              }
            </p>
          </div>

          <h4>Rushing</h4>

          <div>
            <p>Rushing Yards</p>

            <p className={getWinnerClass(
              compareStat("rushing", "rushingYards").winner,
              "player1"
            )}>
              {compareStat("rushing", "rushingYards").player1Value}
            </p>

            <p className={getWinnerClass(
              compareStat("rushing", "rushingYards").winner,
              "player2"
            )}>
              {compareStat("rushing", "rushingYards").player2Value}
            </p>

            <p>
              Winner: {
                getWinnerName(
                  compareStat("rushing", "rushingYards").winner
                )
              }
            </p>
          </div>

          <div>
            <p>Rushing TDs</p>

            <p className={getWinnerClass(
              compareStat("rushing", "rushingTouchdowns").winner,
              "player1"
            )}>
              {compareStat("rushing", "rushingTouchdowns").player1Value}
            </p>

            <p className={getWinnerClass(
              compareStat("rushing", "rushingTouchdowns").winner,
              "player2"
            )}>
              {compareStat("rushing", "rushingTouchdowns").player2Value}
            </p>

            <p>
              Winner: {
                getWinnerName(
                  compareStat("rushing", "rushingTouchdowns").winner
                )
              }
            </p>
          </div>

          <div>
            <p>Yards Per Rush</p>

            <p className={getWinnerClass(
              compareStat("rushing", "yardsPerRushAttempt").winner,
              "player1"
            )}>
              {compareStat("rushing", "yardsPerRushAttempt").player1Value}
            </p>

            <p className={getWinnerClass(
              compareStat("rushing", "yardsPerRushAttempt").winner,
              "player2"
            )}>
              {compareStat("rushing", "yardsPerRushAttempt").player2Value}
            </p>

            <p>
              Winner: {
                getWinnerName(
                  compareStat("rushing", "yardsPerRushAttempt").winner
                )
              }
            </p>
          </div>

          <h4>Receiving</h4>

          <div>
            <p>Receptions</p>

            <p className={getWinnerClass(
              compareStat("receiving", "receptions").winner,
              "player1"
            )}>
              {compareStat("receiving", "receptions").player1Value}
            </p>

            <p className={getWinnerClass(
              compareStat("receiving", "receptions").winner,
              "player2"
            )}>
              {compareStat("receiving", "receptions").player2Value}
            </p>

            <p>
              Winner: {
                getWinnerName(
                  compareStat("receiving", "receptions").winner
                )
              }
            </p>
          </div>

          <div>
            <p>Receiving Yards</p>

            <p className={getWinnerClass(
              compareStat("receiving", "receivingYards").winner,
              "player1"
            )}>
              {compareStat("receiving", "receivingYards").player1Value}
            </p>

            <p className={getWinnerClass(
              compareStat("receiving", "receivingYards").winner,
              "player2"
            )}>
              {compareStat("receiving", "receivingYards").player2Value}
            </p>

            <p>
              Winner: {
                getWinnerName(
                  compareStat("receiving", "receivingYards").winner
                )
              }
            </p>
          </div>

          <div>
            <p>Receiving TDs</p>

            <p className={getWinnerClass(
              compareStat("receiving", "receivingTouchdowns").winner,
              "player1"
            )}>
              {compareStat("receiving", "receivingTouchdowns").player1Value}
            </p>

            <p className={getWinnerClass(
              compareStat("receiving", "receivingTouchdowns").winner,
              "player2"
            )}>
              {compareStat("receiving", "receivingTouchdowns").player2Value}
            </p>

            <p>
              Winner: {
                getWinnerName(
                  compareStat("receiving", "receivingTouchdowns").winner
                )
              }
            </p>
          </div>

          <div>
            <p>Yards Per Reception</p>

            <p className={getWinnerClass(
              compareStat("receiving", "yardsPerReception").winner,
              "player1"
            )}>
              {compareStat("receiving", "yardsPerReception").player1Value}
            </p>

            <p className={getWinnerClass(
              compareStat("receiving", "yardsPerReception").winner,
              "player2"
            )}>
              {compareStat("receiving", "yardsPerReception").player2Value}
            </p>

            <p>
              Winner: {
                getWinnerName(
                  compareStat("receiving", "yardsPerReception").winner
                )
              }
            </p>
          </div>

          <div className="overall-result">
            <h3>Overall Comparison</h3>

            <div className="overall-score">
              <p className={
                overallWinner === "player1" ? "winner" : ""
              }>
                {player?.displayName}: {overallScore.player1Score}
              </p>

              <p className={
                overallWinner === "player2" ? "winner" : ""
              }>
                {player2?.displayName}: {overallScore.player2Score}
              </p>
            </div>

            <h4>
              Overall Winner: {getWinnerName(overallWinner)}
            </h4>
          </div>

          <h3>PPR Fantasy Points</h3>

          <p className={fantasyWinner === "player1" ? "winner" : ""}>
            {player?.displayName}: {getFantasyPoints(playerStats)}
          </p>

          <p className={fantasyWinner === "player2" ? "winner" : ""}>
            {player2?.displayName}: {getFantasyPoints(player2Stats)}
          </p>

          <h4>
            Fantasy Winner: {getWinnerName(fantasyWinner)}
          </h4>

        </div>
      )}
    </section>
  );
}

export default Comparison;