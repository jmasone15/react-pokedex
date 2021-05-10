import React, { useState } from "react";
import API from "./utils/API";

function App() {

  const [randomPokemon, setRandomPokemon] = useState("Click the button!");

  async function handleClick(e) {
    e.preventDefault();
    const pokemon = await API.getAllPokemon();

    // Generate random number based on size of array.
    // Grab a random array value.
    // Capitilize the first letter.
    let num = Math.floor(Math.random() * pokemon.data.results.length);
    let random = pokemon.data.results[num].name;
    let upperCase = random.charAt(0).toUpperCase() + random.slice(1);

    setRandomPokemon(upperCase);
  }

  return (
    <div>
      <h1>Hello, world!</h1>
      <h4>Your random Pokemon is: <u>{randomPokemon}</u></h4>
      <button onClick={(e) => handleClick(e)}>Random Pokemon</button>
    </div>
  );
}

export default App;
