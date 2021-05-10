import React from 'react'

export default function SearchPoke({ pokemon, data }) {
    return (
        <div>
            <h2>{pokemon} #{data.id}</h2>
            <img src={data.sprites.front_default} alt={data.name} />
            <img src={data.sprites.back_default} alt={data.name} />
            {data.types.map((x) => (
                <p key={x.type.slot}>{x.type.name}</p>
            ))}
        </div>
    )
}
