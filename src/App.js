import React, { useState } from "react";
import Pokedex from "./Pokedex";
import RandomPoke from "./RandomPoke";
import SearchPoke from "./SearchPoke";
import API from "./utils/API";

function App() {

  const [randomPokemon, setRandomPokemon] = useState("");
  const [searchPokemon, setSearchPokemon] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
  const [pokemonData, setPokemonData] = useState({});
  const [randomShow, setRandomShow] = useState(false);
  const [searchShow, setSearchShow] = useState(false);

  async function handleRandomClick(e) {
    e.preventDefault();
    try {
      let pokemon = await API.getAllPokemon();

      // Generate random number based on size of array.
      // Grab a random array value.
      // Capitilize the first letter of the name.
      let num = Math.floor(Math.random() * pokemon.data.results.length);
      let random = pokemon.data.results[num];
      let upperCase = random.name.charAt(0).toUpperCase() + random.name.slice(1);

      setRandomPokemon(upperCase);
      getPokemonInfo(random.url, "random");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSearchFormSubmit(e) {
    e.preventDefault();
    try {
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
    } catch (err) {
      alert("No pokemon found, please try again");
    }
  }

  async function handleNumberFormSubmit(e) {
    e.preventDefault();
    try {
      if (searchNumber === "") {
        alert("Please enter a number.")
      } else {

        // Lowercase search query and remove white space
        // Capitilize the first letter of the name.
        let pokemon = await API.getOnePokemon(searchNumber);
        let upperCase = pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.slice(1);

        setSearchPokemon(upperCase);
        setPokemonData(pokemon.data);
        setSearchShow(true);
      }
    } catch (err) {
      alert("No pokemon found, please try again");
    }
  }

  async function getPokemonInfo(url) {
    try {
      const info = await API.getPokemonData(url);
      setPokemonData(info.data);
      setRandomShow(true);
    } catch (err) {
      console.error(err);
    }
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
        <input type="number" name="searchNumber" value={searchNumber} onChange={(e) => setSearchNumber(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {randomShow === true && (
        <RandomPoke pokemon={randomPokemon} data={pokemonData} />
      )}
      {searchShow === true && (
        <SearchPoke pokemon={searchPokemon} data={pokemonData} />
      )}
      <Pokedex />
    </div>
  );
}

export default App;
