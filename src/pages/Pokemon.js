import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Jumbotron, Badge, Image, Table } from 'react-bootstrap';
import { useLocation } from 'react-router';
import NavBar from '../components/NavBar';
import API from '../utils/API';
import Wrapper from "../components/Wrapper";
import configs from "../utils/backgroundConfig";
import "../style.css";
import TypeBadge from '../components/TypeBadge';
import StatsTable from '../components/StatsTable';
import Description from '../components/Description';
import EvoChain from '../components/EvoChain';

export default function Pokemon() {

    const [info, setInfo] = useState({});
    const [show, setShow] = useState(false);
    const [pokeName, setPokeName] = useState("");
    const [pokeType, setPokeType] = useState("");
    const [pokeType2, setPokeType2] = useState("");
    const [description, setDescription] = useState({});
    const [evo, setEvo] = useState({});

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
        color: "white",
        textAlign: "center"
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
                    setPokeType2(res.data.types[1].type.name.charAt(0).toUpperCase() + res.data.types[1].type.name.slice(1));
                } else {
                    setPokeType(res.data.types[0].type.name.charAt(0).toUpperCase() + res.data.types[0].type.name.slice(1));
                }
                getPokeDescription(res.data.species.url);
            } else {
                setShow(false);
            }
        });
    };

    const getPokeDescription = (url) => {
        API.getPokemonData(url).then((res) => {
            setDescription(res.data.flavor_text_entries[0].flavor_text);
            console.log(res.data);
            getPokeEvolution(res.data.evolution_chain.url);
        });
    };

    const getPokeEvolution = (url) => {
        API.getPokemonData(url).then((res) => {
            console.log(res.data);
            setShow(true);
        });
    };

    useEffect(() => {
        getPokeData(poke);
    }, []);

    return (
        <div>
            <Wrapper config={config} setConfig={setConfig} />
            <NavBar theme="default" />
            {show === true && (
                <Container>
                    <Container style={{ marginTop: "50px" }}>
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
                                    <Row className="justify-content-md-center" style={{ marginTop: "50px" }}>
                                        <Col>
                                            <Image src={info.sprites.front_default} style={{ height: "200px", width: "200px" }} alt={info.name} rounded />
                                            <Image src={info.sprites.back_default} style={{ height: "200px", width: "200px" }} alt={info.name} rounded />
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                    <Container style={{ marginTop: "100px" }}>
                        <Row className="justify-content-md-center">
                            <Col md={4}>
                                <StatsTable info={info} cardStyle={cardStyle} />
                            </Col>
                            <Col md={8}>
                                <Row className="justify-content-md-center">
                                    <Description info={description} cardStyle={cardStyle} />
                                </Row>
                                <Row className="justify-content-md-center">
                                    <EvoChain info={evo} cardStyle={cardStyle} />
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            )}
        </div >
    )
}

// <img src={info.sprites.front_default} alt={info.name} />

