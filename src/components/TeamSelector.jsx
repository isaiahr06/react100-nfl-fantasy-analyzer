function TeamSelector({ teams, getPlayers }) {
  return (
    <div className="filter-control team-filter">
      <label htmlFor="team-select">Choose Team</label>

      <select
        id="team-select"
        defaultValue=""
        onChange={(e) => getPlayers(e.target.value)}
      >
        <option value="" disabled>
          Select a team
        </option>

        {teams.map((team) => (
          <option
            key={team.team.id}
            value={team.team.id}
          >
            {team.team.displayName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TeamSelector;