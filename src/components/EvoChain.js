import React from 'react'
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

export default function EvoChain({ cardStyle, evo1, evo2, evo3, changePokePage }) {

    return (
        <Jumbotron className="cardStyle">
            <Container className="centerText">
                <h3 className="pixelText"><u>Evolution</u></h3>
                <Row className="justify-content-md-center">
                    {evo1 !== "empty" && (
                        <>
                            <Col sm="auto">
                                <img
                                    className="pointer"
                                    src={evo1.sprites.front_default}
                                    alt={evo1.name}
                                    onClick={(e) => changePokePage(e, evo1.name.charAt(0).toUpperCase() + evo1.name.slice(1))}
                                />
                                <h6>{evo1.name.charAt(0).toUpperCase() + evo1.name.slice(1)}</h6>
                            </Col>
                            <Col sm="auto" className="mt50">
                                <FontAwesomeIcon size="lg" icon={faArrowAltCircleRight} />
                            </Col>
                        </>
                    )}
                    {evo2 !== "empty" && (
                        <Col sm="auto">
                            <img
                                className="pointer"
                                src={evo2.sprites.front_default}
                                alt={evo2.name}
                                onClick={(e) => changePokePage(e, evo2.name.charAt(0).toUpperCase() + evo2.name.slice(1))}
                            />
                            <h6>{evo2.name.charAt(0).toUpperCase() + evo2.name.slice(1)}</h6>
                        </Col>
                    )}
                    {evo3 !== "empty" && (
                        <>
                            <Col sm="auto" className="mt50">
                                <FontAwesomeIcon size="lg" icon={faArrowAltCircleRight} />
                            </Col>
                            <Col sm="auto">
                                <img
                                    className="pointer"
                                    src={evo3.sprites.front_default}
                                    alt={evo3.name}
                                    onClick={(e) => changePokePage(e, evo3.name.charAt(0).toUpperCase() + evo3.name.slice(1))}
                                />
                                <h6>{evo3.name.charAt(0).toUpperCase() + evo3.name.slice(1)}</h6>
                            </Col>
                        </>
                    )}
                </Row>
            </Container>
        </Jumbotron>
    )
}