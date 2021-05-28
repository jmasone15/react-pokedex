import React from 'react';
import { Badge } from "react-bootstrap";

export default function TypeBadge({ pokeType, pokeType2, variant1, variant2 }) {

    const pokeTypeBadge = (type) => {
        if (type === "Normal") {
            return "light"
        } else if (type === "Fire") {
            return "danger"
        } else if (type === "Water") {
            return "primary"
        } else if (type === "Grass") {
            return "success"
        } else if (type === "Electric") {
            return "warning"
        } else if (type === "Ice") {
            return "info"
        } else if (type === "Poison") {
            return "dark"
        } else if (type === "Fighting") {
            return "danger"
        } else if (type === "Ground") {
            return "secondary"
        } else if (type === "Flying") {
            return "info"
        } else if (type === "Psychic") {
            return "danger"
        } else if (type === "Bug") {
            return "success"
        } else if (type === "Rock") {
            return "secondary"
        } else if (type === "Ghost") {
            return "dark"
        } else if (type === "Dark") {
            return "dark"
        } else if (type === "Dargon") {
            return "primary"
        } else if (type === "Steel") {
            return "secondary"
        } else if (type === "Fairy") {
            return "danger"
        }
    }

    return (
        <>
            {
                pokeType2 === "" && (
                    <h3><Badge pill variant={pokeTypeBadge(pokeType)}>{pokeType}</Badge></h3>
                )
            }
            {
                pokeType2 !== "" && (
                    <div>
                        <h3 style={{ display: "inline", marginRight: "10px" }}><Badge pill variant={pokeTypeBadge(pokeType)}>{pokeType}</Badge></h3>
                        <h3 style={{ display: "inline" }}><Badge pill variant={pokeTypeBadge(pokeType2)}>{pokeType2}</Badge></h3>
                    </div>)
            }
        </>
    )
}
