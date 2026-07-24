function PlayerCard({ player }) {


  return (

    <div>

      <h2>Player Card</h2>


      {player && (

        <>

          <h2>
            {player.displayName}
          </h2>


          <p>
            Height: {player.displayHeight}
          </p>


          <p>
            Weight: {player.displayWeight}
          </p>


          <p>
            Age: {player.age}
          </p>


          <p>
            Experience: {player.experience.years} years
          </p>


          <p>
            Status: {player.status.name}
          </p>


        </>

      )}


    </div>

  );

}


export default PlayerCard;