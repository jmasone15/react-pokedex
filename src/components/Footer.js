import React from 'react';
import { Navbar } from "react-bootstrap";

export default function Footer() {
    return (
        <Navbar sticky="bottom" className="defaultText footerColor">
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{ color: "white" }}>
                    &copy; {new Date().getFullYear()} Copyright: <a href="https://github.com/jmasone15" style={{ color: "white" }}> Jordan Masone </a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}
