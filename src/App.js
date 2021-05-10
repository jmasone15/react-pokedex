import React, { useState } from "react";
import PokemonData from "./PokemonData";
import API from "./utils/API";

function App() {

  const [randomPokemon, setRandomPokemon] = useState("");
  const [randomData, setRandomData] = useState({});
  const [show, setShow] = useState(false);

  async function handleClick(e) {
    e.preventDefault();
    const pokemon = await API.getAllPokemon();

    // Generate random number based on size of array.
    // Grab a random array value.
    // Capitilize the first letter.
    let num = Math.floor(Math.random() * pokemon.data.results.length);
    let random = pokemon.data.results[num];
    let upperCase = random.name.charAt(0).toUpperCase() + random.name.slice(1);

    setRandomPokemon(upperCase);
    getPokemonInfo(random.url);
  }

  async function getPokemonInfo(url) {
    const info = await API.getPokemonData(url);
    setRandomData(info.data);
    setShow(true);
  }
  return (
    <div>
      <h1>Hello, world!</h1>
      <button onClick={(e) => handleClick(e)}>Random Pokemon</button>
      {show === true && (
        <PokemonData pokemon={randomPokemon} data={randomData} />
      )}
    </div>
  );
}

export default App;
