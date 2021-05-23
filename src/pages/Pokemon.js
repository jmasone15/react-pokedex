import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router';
import NavBar from '../components/NavBar';
import API from '../utils/API';

export default function Pokemon() {

    const [info, setInfo] = useState({});
    const [show, setShow] = useState(false);
    const [pokeName, setPokeName] = useState("");

    const search = useLocation();
    const poke = search.pathname.slice(6);

    const getPokeData = (p) => {
        let searchString = p.toLowerCase().replace(/\s+/g, '')
        API.getOnePokemon(searchString).then((res) => {
            console.log(res.data);
            setInfo(res.data);
            if (res.data.name !== undefined) {
                setPokeName(res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1))
                setShow(true);
            } else {
                setShow(false);
            }
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
                                    <div>
                                        <h2>{pokeName} #{info.id}</h2>
                                        <img src={info.sprites.front_default} alt={info.name} />
                                        <img src={info.sprites.back_default} alt={info.name} />
                                        {info.types.map((x) => (
                                            <p key={x.type.slot}>{x.type.name}</p>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
            )}
        </>
    )
}
