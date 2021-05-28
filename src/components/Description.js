import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'

export default function Description({ cardStyle, info }) {
    return (
        <Jumbotron style={cardStyle}>
            <h3 className="pixelText"><u>Description</u></h3>
            <Container>
                <p className="defaultText" style={{ fontSize: "25px" }}>{info}</p>
            </Container>
        </Jumbotron>
    )
}
