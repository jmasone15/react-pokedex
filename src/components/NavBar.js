import React from 'react'
import { Navbar } from 'react-bootstrap'

export default function NavBar({ theme }) {

    const defaultStyle = { backgroundColor: "#E5383B" };

    return (
        <Navbar variant="dark" expand="lg0" className="defaultText" style={defaultStyle}>
            <Navbar.Brand href="/">React Pokedex</Navbar.Brand>
        </Navbar>
    )
}

// Red #E5383B
// Dark Grey #495057
// Light Grey #6c757d
