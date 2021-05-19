import React from 'react';
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function RandomPoke({ pokemon, data }) {

    const history = useHistory();

    const changePage = (e) => {
        e.preventDefault();
        history.push(`/info/${pokemon}`)
    }

    return (
        <div style={{textAlign: "center"}}>
            <h2>{pokemon} #{data.id}</h2>
            <img src={data.sprites.front_default} alt={data.name} />
            <img src={data.sprites.back_default} alt={data.name} />
            <br />
            <Button onClick={(e) => { changePage(e) }}>Get More Info</Button>
        </div>
    )
}
