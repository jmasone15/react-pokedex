import React from 'react'
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'

export default function EvoChain({ cardStyle }) {
    return (
        <Jumbotron style={cardStyle}>
            <Container style={{ textAlign: "center" }}>
                <Row>
                    <h3 className="pixelText"><u>Evolutions</u></h3>
                </Row>
            </Container>
        </Jumbotron>
    )
}
