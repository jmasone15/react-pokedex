import React from 'react'
import { Navbar } from 'react-bootstrap'

export default function NavBar({ light }) {

    const lightStyle = { backgroundColor: "#344455" };
    const darkStyle = { backgroundColor: "#E5383B" };

    return (
        <>
            {light === false && (
                <Navbar variant="dark" expand="lg0" style={darkStyle}>
                    <Navbar.Brand href="/">Pokedex</Navbar.Brand>
                </Navbar>
            )}
            {light === true && (
                <Navbar variant="dark" expand="lg0" style={lightStyle}>
                    <Navbar.Brand href="/">Pokedex</Navbar.Brand>
                </Navbar>
            )}
        </>
    )
}
