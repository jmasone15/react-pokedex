import React, { useState } from "react";
import RandomPoke from "./RandomPoke";
import SearchPoke from "./SearchPoke";
import API from "./utils/API";

function App() {

  const [randomPokemon, setRandomPokemon] = useState("");
  const [searchPokemon, setSearchPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState({});
  const [randomShow, setRandomShow] = useState(false);
  const [searchShow, setSearchShow] = useState(false);

  async function handleRandomClick(e) {
    e.preventDefault();
    let pokemon = await API.getAllPokemon();

    // Generate random number based on size of array.
    // Grab a random array value.
    // Capitilize the first letter of the name.
    let num = Math.floor(Math.random() * pokemon.data.results.length);
    let random = pokemon.data.results[num];
    let upperCase = random.name.charAt(0).toUpperCase() + random.name.slice(1);

    setRandomPokemon(upperCase);
    getPokemonInfo(random.url, "random");
  }

  async function handleSearchFormSubmit(e) {
    e.preventDefault();

    if (searchPokemon === "") {
      alert("Please enter a pokemon name.")
    } else {

      // Lowercase search query and remove white space
      // Capitilize the first letter of the name.
      let searchString = searchPokemon.toLowerCase().replace(/\s+/g, '')
      let pokemon = await API.getOnePokemon(searchString);
      let upperCase = pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.slice(1);

      setSearchPokemon(upperCase);
      setPokemonData(pokemon.data);
      setSearchShow(true);
    }
  }

  async function getPokemonInfo(url, x) {

    const info = await API.getPokemonData(url);
    setPokemonData(info.data);
    setRandomShow(true);
  }

  return (
    <div>
      <h1>Hello, world!</h1>
      <button onClick={(e) => handleRandomClick(e)}>Random Pokemon</button>
      <p>or</p>
      <form onSubmit={(e) => handleSearchFormSubmit(e)}>
        <label for="search">Search by Name</label>
        <input type="text" name="search" value={searchPokemon} onChange={(e) => setSearchPokemon(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {randomShow === true && (
        <RandomPoke pokemon={randomPokemon} data={pokemonData} />
      )}
      {searchShow === true && (
        <SearchPoke pokemon={searchPokemon} data={pokemonData} />
      )}
    </div>
  );
}

export default App;
