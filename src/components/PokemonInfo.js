import React from 'react';
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";


export default function PokemonInfo({ data }) {
    const pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    const history = useHistory();

    const changePage = (e) => {
        e.preventDefault();
        history.push(`/info/${pokeName}`)
    }

    return (
        <div style={{textAlign: "center"}}>
            <h2>{pokeName} #{data.id}</h2>
            <img src={data.sprites.front_default} alt={data.name} />
            <img src={data.sprites.back_default} alt={data.name} />
            <br />
            <Button onClick={(e) => { changePage(e) }}>Get More Info</Button>
        </div>
    )
}
