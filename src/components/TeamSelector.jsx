function TeamSelector({ teams, getPlayers }) {

  return (
    <section>

      <h2>
        Choose Team
      </h2>

      <select
        onChange={(e) => getPlayers(e.target.value)}
      >

        {teams.map((team) => (

          <option 
            key={team.team.id}
            value={team.team.id}
          >
            {team.team.displayName}
          </option>

        ))}

      </select>

    </section>
  );
}

export default TeamSelector;