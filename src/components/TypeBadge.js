import React from 'react';

export default function TypeBadge({ pokeType, pokeType2 }) {

    const pokeTypeBadge = (type) => {
        if (type === "Normal") {
            return "type normal"
        } else if (type === "Fire") {
            return "type fire"
        } else if (type === "Water") {
            return "type water"
        } else if (type === "Grass") {
            return "type grass"
        } else if (type === "Electric") {
            return "type electric"
        } else if (type === "Ice") {
            return "type ice"
        } else if (type === "Poison") {
            return "type poison"
        } else if (type === "Fighting") {
            return "type fighting"
        } else if (type === "Ground") {
            return "type ground"
        } else if (type === "Flying") {
            return "type flying"
        } else if (type === "Psychic") {
            return "type psychic"
        } else if (type === "Bug") {
            return "type bug"
        } else if (type === "Rock") {
            return "type rock"
        } else if (type === "Ghost") {
            return "type ghost"
        } else if (type === "Dark") {
            return "type dark"
        } else if (type === "Dargon") {
            return "type dragon"
        } else if (type === "Steel") {
            return "type steel"
        } else if (type === "Fairy") {
            return "type fairy"
        }
    }

    return (
        <>
            {
                pokeType2 === "" && (
                    <span style={{ marginRight: "10px" }} className={pokeTypeBadge(pokeType)}>{pokeType}</span>
                )
            }
            {
                pokeType2 !== "" && (
                    <div>
                        <span style={{ marginRight: "10px" }} className={pokeTypeBadge(pokeType)}>{pokeType}</span>
                        <span style={{ marginRight: "10px" }} className={pokeTypeBadge(pokeType2)}>{pokeType2}</span>
                    </div>)
            }
        </>
    )
}
