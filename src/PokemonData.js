import React from 'react'

export default function PokemonData({ pokemon, data }) {

    console.log(data);

    return (
        <div>
            <h2>{pokemon} #{data.order}</h2>
            <img src={data.sprites.front_default} alt={data.name} />
            <img src={data.sprites.back_default} alt={data.name} />
            {data.types.map((x) => (
                <p key={x.type.slot}>{x.type.name}</p>
            ))}
        </div>
    )
}
