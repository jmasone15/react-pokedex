import React from 'react'
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'

export default function EvoChain({ cardStyle, evo1, evo2, evo3 }) {

    return (
        <Jumbotron style={cardStyle}>
            <Container style={{ textAlign: "center" }}>
                <h3 className="pixelText"><u>Evolutions</u></h3>
                <Row className="justify-content-md-center">
                    {evo1 !== "empty" && (
                        <>
                            <Col sm="auto">
                                <img src={evo1.sprites.front_default} alt={evo1.name} />
                                <h6>{evo1.name.charAt(0).toUpperCase() + evo1.name.slice(1)}</h6>
                            </Col>
                            <Col xs="auto" style={{ marginTop: "50px" }}>
                                <p>={'>'}</p>
                            </Col>
                        </>
                    )}
                    {evo2 !== "empty" && (
                        <Col sm="auto">
                            <img src={evo2.sprites.front_default} alt={evo2.name} />
                            <h6>{evo2.name.charAt(0).toUpperCase() + evo2.name.slice(1)}</h6>
                        </Col>
                    )}
                    {evo3 !== "empty" && (
                        <>
                            <Col xs="auto" style={{ marginTop: "50px" }}>
                                <p>={'>'}</p>
                            </Col>
                            <Col sm="auto">
                                <img src={evo3.sprites.front_default} alt={evo3.name} />
                                <h6>{evo3.name.charAt(0).toUpperCase() + evo3.name.slice(1)}</h6>
                            </Col>
                        </>
                    )}
                </Row>
            </Container>
        </Jumbotron>
    )
}