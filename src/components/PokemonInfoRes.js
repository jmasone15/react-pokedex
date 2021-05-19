import React from 'react';
import { useHistory } from "react-router-dom";


export default function PokemonInfoRes({ data }) {
    const pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    const history = useHistory();

    const changePage = (e) => {
        e.preventDefault();
        history.push(`/info/${pokeName}`)
    }

    return (
        <div>
            <h2>{pokeName} #{data.id}</h2>
            <img src={data.sprites.front_default} alt={data.name} />
            <img src={data.sprites.back_default} alt={data.name} />
            {data.types.map((x) => (
                <p key={x.type.slot}>{x.type.name}</p>
            ))}
        </div>
    )
}
