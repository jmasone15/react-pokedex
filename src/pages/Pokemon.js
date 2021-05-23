import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router';
import NavBar from '../components/NavBar';
import API from '../utils/API';
import PokemonInfoRes from "../components/PokemonInfoRes";

export default function Pokemon() {

    const [info, setInfo] = useState({});
    const [show, setShow] = useState(false);

    const search = useLocation();
    const poke = search.pathname.slice(6);

    const getPokeData = (p) => {
        let searchString = p.toLowerCase().replace(/\s+/g, '')
        API.getOnePokemon(searchString).then((res) => {
            console.log(res.data);
            setInfo(res.data);
            setShow(true);
        });
    }


    useEffect(() => {
        getPokeData(poke);
    }, []);

    return (
        <>
            {show === true && (
                <Container fluid style={{ backgroundColor: "#D3D3D3" }}>
                    <Row>
                        <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <NavBar />
                        </Col>
                    </Row>
                    <Row>
                        <Container>
                            <Row>
                                <Col>
                                    <PokemonInfoRes data={info} />
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
            )}
        </>
    )
}
