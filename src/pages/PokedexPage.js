import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import "../style.css";
import { Container, Row, Col, Button, Card, Table, Navbar, DropdownButton, Dropdown } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import Wrapper from "../components/Wrapper";
import configs from "../utils/backgroundConfig";

export default function PokedexPage() {

    // State Management
    const [rangePokemon, setRangePokemon] = useState([]);
    const [config, setConfig] = useState(configs.defaultConfig);
    const history = useHistory();

    // Function to find all pokemon in a range
    async function getRangeData(e, limit, offset) {
        // Sets the current range Pokemon to 0.
        if (e) e.preventDefault();
        setRangePokemon([]);

        // Gets the desired range of pokemon of the pokedex.
        const results = await API.getPokemonRange(limit, offset);
        setRangePokemon(results.data.results);
    };

    // Function to change to pokemon info page.
    const changePage = (e, poke) => {
        e.preventDefault();

        // Pushes route into search bar.
        history.push(`/info/${poke}`);
    };

    // Loads the first 100 pokemon when the page loads.
    useEffect((e) => {
        getRangeData(e, 100)
    }, [])

    return (
        <>
            <Wrapper config={config} setConfig={setConfig} />
            <NavBar theme="default" />
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg="auto" className="centerText">
                        <Card className="pokedexStyle">
                            <Container>
                                <Row>
                                    <Col>
                                        <h1 className="pixelText white"><u>Pokedex</u></h1>
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
                                <Row className="defaultText tableScroll">
                                    <Col>
                                        <Table className="white">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Info</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rangePokemon.map((poke, index) => (
                                                    <tr key={index}>
                                                        <td><b>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</b></td>
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
            <Navbar fixed="bottom" className="defaultText footerColor">
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text style={{ color: "white" }}>
                        &copy; {new Date().getFullYear()} Copyright: <a href="https://github.com/jmasone15" style={{ color: "white" }}> Jordan Masone </a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
