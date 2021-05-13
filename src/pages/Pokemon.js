import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router';
import NavBar from '../components/NavBar';

export default function Pokemon() {

    const search = useLocation();
    const poke = search.pathname.slice(6);

    return (
        <Container fluid>
            <Row>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <NavBar />
                </Col>
            </Row>
            <Row>
                <Container>
                    <Row>
                        <Col>
                            <h3>Pokemon Page</h3>
                            <h4>{poke}</h4>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    )
}
