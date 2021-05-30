import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'

export default function Description({ info }) {
    return (
        <Jumbotron className="cardStyle">
            <h3 className="pixelText"><u>Description</u></h3>
            <Container>
                <p className="defaultText fs25">{info}</p>
            </Container>
        </Jumbotron>
    )
}
