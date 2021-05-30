import React from 'react';
import { Jumbotron, Container, Table } from "react-bootstrap";

export default function StatsTable({ info }) {
    return (
        <Jumbotron className="cardStyle">
            <Container className="centerText">
                <h3 className="pixelText"><u>Base Stats</u></h3>
                <br /><br /><br />
                <Table className="white">
                    <tbody>
                        <tr>
                            <th><b>HP:</b></th>
                            <th>{info.stats[0].base_stat}</th>
                        </tr>
                        <tr>
                            <th><b>Attack:</b></th>
                            <th>{info.stats[1].base_stat}</th>
                        </tr>
                        <tr>
                            <th><b>Defense:</b></th>
                            <th>{info.stats[2].base_stat}</th>
                        </tr>
                        <tr>
                            <th><b>Special-Attack:</b></th>
                            <th>{info.stats[3].base_stat}</th>
                        </tr>
                        <tr>
                            <th><b>Special-Defense:</b></th>
                            <th>{info.stats[4].base_stat}</th>
                        </tr>
                        <tr>
                            <th><b>Speed</b></th>
                            <th>{info.stats[5].base_stat}</th>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </Jumbotron>
    )
}
