import React from 'react';
import { Badge } from "react-bootstrap";

export default function TypeBadge({ pokeType, pokeType2 }) {



    return (
        <>
            {
                pokeType2 === "" && (
                    <h3><Badge pill variant="danger">{pokeType}</Badge></h3>
                )
            }
            {
                pokeType2 !== "" && (
                    <div>
                        <h3><Badge pill variant="danger">{pokeType}</Badge></h3>
                        <h3><Badge pill variant="danger">{pokeType2}</Badge></h3>
                    </div>)
            }
        </>
    )
}
