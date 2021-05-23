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

    // Styles
    const [config, setConfig] = useState(configs.lightConfig);
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

        // Get Data on individual pokemon with url link
        changePage(e, upperCase);

    };

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
            <NavBar light={true} />
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
                                <Modal.Title style={{ color: "#fff" }}>Pokemon Search</Modal.Title>
                            </Modal.Header>
                            <form>
                                <Modal.Body style={{ backgroundColor: "#6c757d", color: "#fff" }}>
                                    <Form>
                                        <Row>
                                            <Col style={{ borderRight: "1px solid" }}>
                                                <Form.Label style={{ marginRight: "10px" }}><u>By Name</u></Form.Label>
                                                <Form.Control type="text" placeholder="Pikachu" />
                                            </Col>
                                            <Col>
                                                <Form.Label style={{ marginRight: "10px" }}><u>By Number</u></Form.Label>
                                                <Form.Control type="text" placeholder="44" />
                                            </Col>
                                        </Row>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer style={{ backgroundColor: "#6c757d" }}>
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
