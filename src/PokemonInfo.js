import React from 'react'

export default function PokemonInfo({ data }) {
    return (
        <div>
            <p>{data.name}</p>
            <img src={data.sprites.front_default} alt={data.name} />
            <img src={data.sprites.back_default} alt={data.name} />
        </div>
    )
}
