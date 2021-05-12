import React from 'react'
import { Navbar } from 'react-bootstrap'

export default function NavBar() {
    return (
        <Navbar variant="dark" expand="lg0" style={{ backgroundColor: "#E5383B" }}>
            <Navbar.Brand href="/react-pokedex">Pokedex</Navbar.Brand>
        </Navbar>
    )
}
