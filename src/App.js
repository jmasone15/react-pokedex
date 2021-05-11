import React, { useState } from "react";
import Pokedex from "./Pokedex";
import RandomPoke from "./RandomPoke";
import SearchPoke from "./SearchPoke";
import PokemonInfo from "./PokemonInfo";
import API from "./utils/API";

function App() {

  const [randomPokemon, setRandomPokemon] = useState("");
  const [searchPokemon, setSearchPokemon] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
  const [pokemonData, setPokemonData] = useState({});
  const [rangePokemon, setRangePokemon] = useState([]);
  const [pokeInfo, setPokeInfo] = useState({});
  const [show, setShow] = useState("");

  async function getRangeData(e, limit, offset) {
    e.preventDefault();
    setRangePokemon([]);

    const results = await API.getPokemonRange(limit, offset);
    setRangePokemon(results.data.results);
  }

  function pokemonRangeData(e, url) {
    e.preventDefault();

    API.getPokemonData(url).then((res) => {
      setPokeInfo(res.data);
      setShow("pokedex");
    });
  }

  async function handleRandomClick(e) {
    e.preventDefault();

    let pokemon = await API.getAllPokemon();

    // Generate random number based on size of array.
    // Grab a random array value.
    // Capitilize the first letter of the name.
    let num = Math.floor(Math.random() * pokemon.data.results.length);
    let random = pokemon.data.results[num];
    let upperCase = random.name.charAt(0).toUpperCase() + random.name.slice(1);

    // Get Data on individual pokemon with url link
    setRandomPokemon(upperCase);
    getPokemonInfo(random.url);

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
      setShow("search");
    }

  }

  async function handleNumberFormSubmit(e) {
    e.preventDefault();

    if (searchNumber === "") {
      alert("Please enter a number.")
    } else {

      // Lowercase search query and remove white space
      // Capitilize the first letter of the name.
      let pokemon = await API.getOnePokemon(searchNumber);
      let upperCase = pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.slice(1);

      setSearchPokemon(upperCase);
      setPokemonData(pokemon.data);
      setShow("search");
    }

  }

  async function getPokemonInfo(url) {
    const info = await API.getPokemonData(url);

    setPokemonData(info.data);
    setShow("random");
  }

  return (
    <div>
      <h1>Hello, world!</h1>
      <button onClick={(e) => handleRandomClick(e)}>Random Pokemon</button>
      <p>or</p>
      <form onSubmit={(e) => handleSearchFormSubmit(e)}>
        <label htmlFor="search">Search by Name:</label>
        <input type="text" name="search" value={searchPokemon} onChange={(e) => setSearchPokemon(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <br />
      <form onSubmit={(e) => handleNumberFormSubmit(e)}>
        <label htmlFor="searchNumber">Search by Number:</label>
        <input type="number" min="1" max="898" name="searchNumber" value={searchNumber} onChange={(e) => setSearchNumber(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {show === "random" && (
        <RandomPoke pokemon={randomPokemon} data={pokemonData} />
      )}
      {show === "search" && (
        <SearchPoke pokemon={searchPokemon} data={pokemonData} />
      )}
      {show === "pokedex" && (
        <PokemonInfo data={pokeInfo} />

      )}
      <Pokedex getRangeData={getRangeData} rangePokemon={rangePokemon} pokemonRangeData={pokemonRangeData} />
    </div>
  );
}

export default App;
