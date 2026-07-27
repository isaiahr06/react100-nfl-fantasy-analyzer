function SeasonSelector({ year, setYear }) {

  return (
    <section>

      <label>Season: </label>

      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
      </select>

    </section>
  );
}

export default SeasonSelector;