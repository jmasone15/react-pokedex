import React, { useState } from 'react';
import { Container, Row, Col, Button, Jumbotron, Modal, Form } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import Wrapper from "../components/Wrapper";
import configs from "../utils/backgroundConfig";
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import "../style.css";

export default function Test() {

    const history = useHistory();
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [name, setName] = useState("");
    const [num, setNum] = useState("");

    // Styles
    const [config, setConfig] = useState(configs.defaultConfig);
    const cardStyle = {
        position: "relative",
        top: "300px",
        width: "auto",
        backgroundColor: "#6c757d"
    };
    const buttonStyle = {
        margin: "10px"
    }

    const changePage = (e, poke) => {
        e.preventDefault();
        history.push(`/info/${poke}`);
    }

    // Function to find random pokemon
    async function handleRandomClick(e) {
        e.preventDefault();

        let pokemon = await API.getAllPokemon();

        // Generate random number based on size of array.
        // Grab a random array value.
        // Capitilize the first letter of the name.
        let num = Math.floor(Math.random() * pokemon.data.results.length);
        let random = pokemon.data.results[num];
        let upperCase = random.name.charAt(0).toUpperCase() + random.name.slice(1);

        // Send pokemon name to info page
        changePage(e, upperCase);

    };

    const searchType = (e, type) => {
        e.preventDefault();

        if (type === "name") {
            setSearchValue("name");
        } else if (type === "number") {
            setSearchValue("number");
        }
    };

    // Function to find pokemon by search
    async function handleSearchFormSubmit(e) {
        e.preventDefault();

        if (searchValue === "name") {

            // Lowercase search query and remove white space
            // Capitilize the first letter of the name.
            let searchString = name.toLowerCase().replace(/\s+/g, '')
            let pokemon = await API.getOnePokemon(searchString);
            let upperCase = pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.slice(1);

            // Send pokemon name to info page
            changePage(e, upperCase);

        } else if (searchValue === "number") {

            // Lowercase search query and remove white space
            // Capitilize the first letter of the name.
            let pokemon = await API.getOnePokemon(num);
            let upperCase = pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.slice(1);

            // Send pokemon name to info page
            changePage(e, upperCase);
        }
    }

    // Modal Functions
    const handleButtonClick = () => {

        if (show === false) {
            setShow(true);
        } else {
            setShow(false);
        }
    }


    return (
        <div>
            <Wrapper config={config} setConfig={setConfig} />
            <NavBar theme="default" />
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col md="auto" style={{ textAlign: "center" }}>
                        <Jumbotron style={cardStyle}>
                            <Container>
                                <h1 className="pixelText" style={{ color: "white" }}>Pokedex</h1>
                                <h5 className="pixelText" style={{ color: "white" }}>Fully updated with all Pokemon from Gen I - Gen VIII</h5>
                                <br />
                                <div>
                                    <Button className="defaultText" style={buttonStyle} type="button" variant="danger" size="lg">Full Pokedex</Button>
                                    <Button className="defaultText" style={buttonStyle} type="button" variant="danger" size="lg" onClick={(e) => handleRandomClick(e)}>Surprise Me</Button>
                                    <Button className="defaultText" style={buttonStyle} type="button" variant="danger" size="lg" onClick={() => handleButtonClick()}>Search by Name/Number</Button>
                                </div>
                            </Container>
                        </Jumbotron>
                        <Modal show={show} onHide={() => handleButtonClick()}>
                            <Modal.Header style={{ backgroundColor: "#6c757d" }} >
                                <Modal.Title className="pixelText" style={{ color: "#fff" }}>Pokemon Search</Modal.Title>
                            </Modal.Header>
                            <form onSubmit={(e) => handleSearchFormSubmit(e)}>
                                <Modal.Body style={{ backgroundColor: "#6c757d", color: "#fff" }}>
                                    <Form>
                                        <Row>
                                            <Col style={{ borderRight: "1px solid" }}>
                                                <Form.Label className="defaultText" style={{ marginRight: "10px" }}><u>By Name</u></Form.Label>
                                                <Form.Control onClick={(e) => searchType(e, "name")} value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
                                            </Col>
                                            <Col>
                                                <Form.Label className="defaultText" style={{ marginRight: "10px" }}><u>By Number</u></Form.Label>
                                                <Form.Control onClick={(e) => searchType(e, "number")} value={num} onChange={(e) => setNum(e.target.value)} type="text" placeholder="Number" />
                                            </Col>
                                        </Row>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer className="defaultText" style={{ backgroundColor: "#6c757d" }}>
                                    <Button type="submit" variant="danger">Search!</Button>
                                </Modal.Footer>
                            </form>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}
