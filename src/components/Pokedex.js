import React, { useState } from 'react';
import API from "../utils/API";

export default function Pokedex({ getRangeData, pokemonRangeData, rangePokemon }) {

    const [pokemon, setPokemon] = useState([]);
    const [show, setShow] = useState(false);

    rangePokemon.forEach((x) => {
        getPokemonInfo(x.url)
    });

    async function getPokemonInfo(url) {
        const info = await API.getPokemonData(url);
        pokemon.push(info.data);
        console.log(pokemon);
    }

    return (
        <div>
            <div>
                <button onClick={(e) => getRangeData(100)}>1-100</button>
                <button onClick={(e) => getRangeData(100, 100)}>101-200</button>
                <button onClick={(e) => getRangeData(100, 200)}>201-300</button>
                <button onClick={(e) => getRangeData(100, 300)}>301-400</button>
                <button onClick={(e) => getRangeData(100, 400)}>401-500</button>
                <button onClick={(e) => getRangeData(100, 500)}>501-600</button>
                <button onClick={(e) => getRangeData(100, 600)}>601-700</button>
                <button onClick={(e) => getRangeData(100, 700)}>701-800</button>
                <button onClick={(e) => getRangeData(98, 800)}>801-898</button>
            </div>
                <div>
                    <h4>Pokemon</h4>
                    {pokemon.map((p) => (
                        <div>
                            <p key={p.id}>{p.name}</p>
                            <button>More Info</button>
                        </div>
                    ))}
            </div>
        </div>
    )
}
