import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Jumbotron, Image } from 'react-bootstrap';
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
import Footer from '../components/Footer';
import { useHistory } from "react-router-dom";

export default function Pokemon() {

    const [info, setInfo] = useState({});
    const [show, setShow] = useState(false);
    const [pokeName, setPokeName] = useState("");
    const [pokeType, setPokeType] = useState("");
    const [pokeType2, setPokeType2] = useState("");
    const [description, setDescription] = useState({});
    const [evo1, setEvo1] = useState("empty");
    const [evo2, setEvo2] = useState("empty");
    const [evo3, setEvo3] = useState("empty");
    const history = useHistory();

    const search = useLocation();
    const poke = search.pathname.slice(6);

    // Styles
    const [config, setConfig] = useState(configs.defaultConfig);

    const getPokeData = (p) => {
        let searchString = p.toLowerCase().replace(/\s+/g, '')
        API.getOnePokemon(searchString).then((res) => {
            setInfo(res.data);
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

    const changePokePage = (e, poke) => {
        e.preventDefault();
        history.push(`/info/${poke}`);
        window.location.reload();
    };

    const getPokeDescription = (url) => {
        API.getPokemonData(url).then((res) => {
            let descArray = res.data.flavor_text_entries;

            for (let i = 0; i < descArray.length; i++) {
                if (descArray[i].language.name === "en") {

                    setDescription(descArray[i].flavor_text);
                    getPokeEvolution(res.data.evolution_chain.url);

                    break;
                }

            }
        });
    };

    const getPokeEvolution = (url) => {
        API.getPokemonData(url).then((res) => {

            if (res.data.chain.species.name !== undefined) {
                getEvoData(res.data.chain.species.name, 0);
            }
            if (res.data.chain.evolves_to[0] !== undefined) {
                getEvoData(res.data.chain.evolves_to[0].species.name, 1);
            }
            if (res.data.chain.evolves_to[0] !== undefined && res.data.chain.evolves_to[0].evolves_to[0] !== undefined) {
                getEvoData(res.data.chain.evolves_to[0].evolves_to[0].species.name)
            }
        });
    };

    const getEvoData = (poke, num) => {
        API.getOnePokemon(poke).then((res) => {
            if (num === 0) {
                setEvo1(res.data);
                setShow(true);
            } else if (num === 1) {
                setEvo2(res.data);
                setShow(true);
            } else {
                setEvo3(res.data);
                setShow(true);
            }
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
                                            <Jumbotron className="headerStyle">
                                                <Container>
                                                    <h2 className="pixelText white">{pokeName} #{info.id}</h2>
                                                    <TypeBadge pokeType={pokeType} pokeType2={pokeType2} />
                                                </Container>
                                            </Jumbotron>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-md-center mt50">
                                        <Col>
                                            <Image src={info.sprites.front_default} style={{ height: "200px", width: "200px" }} alt={info.name} rounded />
                                            <Image src={info.sprites.back_default} style={{ height: "200px", width: "200px" }} alt={info.name} rounded />
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="mt100">
                        <Row className="justify-content-md-center">
                            <Col md={4}>
                                <StatsTable info={info} className="cardStyle" />
                            </Col>
                            <Col md={8}>
                                <Row className="justify-content-md-center">
                                    <Col md="auto">
                                        <Description info={description} className="cardStyle" />
                                    </Col>
                                </Row>
                                <Row className="justify-content-md-center" md="auto">
                                    <Col>
                                        <EvoChain className="cardStyle" evo1={evo1} evo2={evo2} evo3={evo3} changePokePage={changePokePage} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            )}
            <Footer />
        </div >
    )
}

