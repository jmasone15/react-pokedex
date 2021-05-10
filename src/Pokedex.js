import React, { useState } from 'react';
import API from "./utils/API";
import PokemonInfo from "./PokemonInfo";

export default function Pokedex() {

    const [rangePokemon, setRangePokemon] = useState([]);
    const [pokeInfo, setPokeInfo] = useState({});
    const [showPokemon, setShowPokemon] = useState(false);

    async function getRangeData(e, limit, offset) {
        e.preventDefault();
        try {
            setRangePokemon([]);
            const results = await API.getPokemonRange(limit, offset);
            setRangePokemon(results.data.results);
        } catch (err) {
            console.error(err);
        }
    }

    function pokemonData(e, url) {
        e.preventDefault();
        try {
            API.getPokemonData(url).then((res) => {
                setPokeInfo(res.data);
                setShowPokemon(true);
            })
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <div>
                <h2>Pokedex Here</h2>
                <button onClick={(e) => getRangeData(e, 100)}>1-100</button>
                <button onClick={(e) => getRangeData(e, 100, 100)}>101-200</button>
                <button onClick={(e) => getRangeData(e, 100, 200)}>201-300</button>
                <button onClick={(e) => getRangeData(e, 100, 300)}>301-400</button>
                <button onClick={(e) => getRangeData(e, 100, 400)}>401-500</button>
                <button onClick={(e) => getRangeData(e, 100, 500)}>501-600</button>
                <button onClick={(e) => getRangeData(e, 100, 600)}>601-700</button>
                <button onClick={(e) => getRangeData(e, 100, 700)}>701-800</button>
                <button onClick={(e) => getRangeData(e, 98, 800)}>801-898</button>
            </div>
            <div>
                <h4>Pokemon</h4>
                {rangePokemon.map((p) => (
                    <div>
                        <p key={p.id}>{p.name}</p>
                        <button onClick={(e => pokemonData(e, p.url))}>More Info</button>
                    </div>
                ))}
                {showPokemon === true && (
                    <PokemonInfo data={pokeInfo} />
                )}
            </div>
        </div>
    )
}
