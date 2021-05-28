import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'

export default function Description({ cardStyle }) {
    return (
        <Jumbotron style={cardStyle}>
            <Container style={{ textAlign: "center" }}>
                <h3 className="pixelText"><u>Description</u></h3>
            </Container>
        </Jumbotron>
    )
}
