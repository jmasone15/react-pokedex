import React, { useState } from 'react';
import { Container, Row, Col, Button, Jumbotron } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import Wrapper from "../components/Wrapper";
import configs from "../utils/backgroundConfig";

export default function Test() {

    const [config, setConfig] = useState(configs.lightConfig);

    const cardStyle = {
        position: "relative",
        top: "300px",
        width: "auto",
        backgroundColor: "#344455"
    };

    const buttonStyle = {
        margin: "10px"
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
                                <h1 style={{ color: "#fff" }}>Pokedex</h1>
                                <h5 style={{ color: "#fff" }}>Fully updated with all Pokemon from Gen I - Gen VIII</h5>
                                <div>
                                    <Button style={buttonStyle} type="button" variant="outline-danger" size="lg">Full Pokedex</Button>
                                    <Button style={buttonStyle} type="button" variant="outline-danger" size="lg">Surprise Me</Button>
                                    <Button style={buttonStyle} type="button" variant="outline-danger" size="lg">Search by Name/Number</Button>
                                </div>
                            </Container>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
