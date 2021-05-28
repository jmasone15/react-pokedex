import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Jumbotron, Badge, Image, Table } from 'react-bootstrap';
import { useLocation } from 'react-router';
import NavBar from '../components/NavBar';
import API from '../utils/API';
import Wrapper from "../components/Wrapper";
import configs from "../utils/backgroundConfig";
import "../style.css";
import TypeBadge from '../components/TypeBadge';

export default function Pokemon() {

    const [info, setInfo] = useState({});
    const [show, setShow] = useState(false);
    const [pokeName, setPokeName] = useState("");
    const [pokeType, setPokeType] = useState("");
    const [pokeType2, setPokeType2] = useState("");

    const search = useLocation();
    const poke = search.pathname.slice(6);

    // Styles
    const [config, setConfig] = useState(configs.defaultConfig);
    const headerStyle = {
        color: "white",
        backgroundColor: "#6c757d"
    };

    const cardStyle = {
        backgroundColor: "#6c757d",
        color: "white"
    }

    const getPokeData = (p) => {
        let searchString = p.toLowerCase().replace(/\s+/g, '')
        API.getOnePokemon(searchString).then((res) => {
            setInfo(res.data);
            console.log(res.data)
            if (res.data.name !== undefined) {
                setPokeName(res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1))
                if (res.data.types.length > 1) {
                    setPokeType(res.data.types[0].type.name.charAt(0).toUpperCase() + res.data.types[0].type.name.slice(1));
                    setPokeType2(res.data.types[1].type.name.charAt(0).toUpperCase() + res.data.types[0].type.name.slice(1));
                } else {
                    setPokeType(res.data.types[0].type.name.charAt(0).toUpperCase() + res.data.types[0].type.name.slice(1));
                }
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
        <div>
            <Wrapper config={config} setConfig={setConfig} />
            <NavBar theme="default" />
            {show === true && (
                <Container>
                    <Container style={{ marginTop: "100px" }}>
                        <Row className="justify-content-md-center">
                            <Col md="auto" style={{ textAlign: "center" }}>
                                <Container>
                                    <Row>
                                        <Col xl={12}>
                                            <Jumbotron style={headerStyle}>
                                                <Container>
                                                    <h2 className="pixelText" style={{ color: "white" }}>{pokeName} #{info.id}</h2>
                                                    <TypeBadge pokeType={pokeType} pokeType2={pokeType2} />
                                                </Container>
                                            </Jumbotron>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-md-center">
                                        <Col>
                                            <Image src={info.sprites.front_default} style={{ height: "200px", width: "200px" }} alt={info.name} rounded />
                                            <Image src={info.sprites.back_default} style={{ height: "200px", width: "200px" }} alt={info.name} rounded />
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col md="auto">
                                <Jumbotron style={cardStyle}>
                                    <Container style={{ textAlign: "center" }}>
                                        <h3 className="pixelText">Base Stats</h3>
                                        <Table style={{ color: "white" }}>
                                            <tr>
                                                <th><b>HP:</b></th>
                                                <th>{info.stats[0].base_stat}</th>
                                            </tr>
                                            <tr>
                                                <th><b>Attack:</b></th>
                                                <th>{info.stats[1].base_stat}</th>
                                            </tr>
                                            <tr>
                                                <th><b>Defense:</b></th>
                                                <th>{info.stats[2].base_stat}</th>
                                            </tr>
                                            <tr>
                                                <th><b>Special-Attack:</b></th>
                                                <th>{info.stats[3].base_stat}</th>
                                            </tr>
                                            <tr>
                                                <th><b>Special-Defense:</b></th>
                                                <th>{info.stats[4].base_stat}</th>
                                            </tr>
                                            <tr>
                                                <th><b>Speed</b></th>
                                                <th>{info.stats[5].base_stat}</th>
                                            </tr>
                                        </Table>
                                    </Container>
                                </Jumbotron>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            )
            }
        </div >
    )
}

// <img src={info.sprites.front_default} alt={info.name} />

