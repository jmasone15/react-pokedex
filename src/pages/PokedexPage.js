import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import "../style.css";
import { Container, Row, Col, Button, Card, Table, DropdownButton, Dropdown } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import Wrapper from "../components/Wrapper";
import configs from "../utils/backgroundConfig";

export default function PokedexPage() {

    const [rangePokemon, setRangePokemon] = useState([]);
    const [config, setConfig] = useState(configs.defaultConfig);
    const history = useHistory();

    // Function to find all pokemon in a range
    async function getRangeData(e, limit, offset) {
        if (e) {
            e.preventDefault();
        }
        setRangePokemon([]);

        const results = await API.getPokemonRange(limit, offset);
        setRangePokemon(results.data.results);
    };

    const changePage = (e, poke) => {
        e.preventDefault();
        history.push(`/info/${poke}`);
    };

    const pokedexStyle = {
        position: "relative",
        top: "200px",
        width: "auto",
        backgroundColor: "#6c757d",
        padding: "50px"
    };

    useEffect((e) => {
        getRangeData(e, 100)
    }, [])

    return (
        <>
            <Wrapper config={config} setConfig={setConfig} />
            <NavBar theme="default" />
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg="auto" style={{ textAlign: "center" }}>
                        <Card style={pokedexStyle}>
                            <Container>
                                <Row>
                                    <Col>
                                        <h1 className="pixelText" style={{ color: "white" }}><u>Pokedex</u></h1>
                                        <DropdownButton drop="down" title="Pokedex Range" variant="danger" id="dropdown-basic-button">
                                            <Dropdown.Item onClick={(e) => getRangeData(e, 100)} eventKey="1">1-100</Dropdown.Item>
                                            <Dropdown.Item onClick={(e) => getRangeData(e, 100, 100)} eventKey="101">101-200</Dropdown.Item>
                                            <Dropdown.Item onClick={(e) => getRangeData(e, 100, 200)} eventKey="201">201-300</Dropdown.Item>
                                            <Dropdown.Item onClick={(e) => getRangeData(e, 100, 300)} eventKey="301">301-400</Dropdown.Item>
                                            <Dropdown.Item onClick={(e) => getRangeData(e, 100, 400)} eventKey="401">401-500</Dropdown.Item>
                                            <Dropdown.Item onClick={(e) => getRangeData(e, 100, 500)} eventKey="501">501-600</Dropdown.Item>
                                            <Dropdown.Item onClick={(e) => getRangeData(e, 100, 600)} eventKey="601">601-700</Dropdown.Item>
                                            <Dropdown.Item onClick={(e) => getRangeData(e, 100, 700)} eventKey="701">701-800</Dropdown.Item>
                                            <Dropdown.Item onClick={(e) => getRangeData(e, 98, 800)} eventKey="801">801-898</Dropdown.Item>
                                        </DropdownButton>
                                    </Col>
                                </Row>
                                <Row className="defaultText" style={{ margin: "50px", height: "300px", overflowY: "scroll" }}>
                                    <Col>
                                        <Table>
                                            <thead>
                                                <tr style={{ color: "white" }}>
                                                    <th>Name</th>
                                                    <th>Info</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rangePokemon.map((poke, index) => (
                                                    <tr key={index}>
                                                        <td style={{ color: "white" }}><b>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</b></td>
                                                        <td><Button variant="danger" onClick={(e) => changePage(e, poke.name)}>More Info</Button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
