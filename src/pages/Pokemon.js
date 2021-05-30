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

    // State Management
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
    const [config, setConfig] = useState(configs.defaultConfig);

    // Changes page for the evolution line.
    const changePokePage = (e, poke) => {
        e.preventDefault();

        history.push(`/info/${poke}`);
        window.location.reload();
    };

    // Gets pokemon name from the search bar.
    const search = useLocation();
    const poke = search.pathname.slice(6);

    // Function to get data for a specific pokemon.
    const getPokeData = (p) => {
        // Lowercases first letter of pokemon name for the api search.
        let searchString = p.toLowerCase().replace(/\s+/g, '');

        // Gets data on the pokemon that is searched for.
        API.getOnePokemon(searchString).then((res) => {

            // Sets data for specific pokemon.
            setInfo(res.data);

            // Error handling.
            if (res.data.name !== undefined) {

                // Sets pokemon name.
                setPokeName(res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1))

                // Checks how many types the pokemon has, and then sets the state.
                if (res.data.types.length > 1) {
                    setPokeType(res.data.types[0].type.name.charAt(0).toUpperCase() + res.data.types[0].type.name.slice(1));
                    setPokeType2(res.data.types[1].type.name.charAt(0).toUpperCase() + res.data.types[1].type.name.slice(1));
                } else {
                    setPokeType(res.data.types[0].type.name.charAt(0).toUpperCase() + res.data.types[0].type.name.slice(1));
                }

                // Calls function to get pokemon description.
                getPokeDescription(res.data.species.url);

            } else {
                // If no response, do not show data.
                setShow(false);
            }
        });
    };

    // Function to get description for specific pokemon.
    const getPokeDescription = (url) => {

        // API call that uses the url from the poke data Object.
        API.getPokemonData(url).then((res) => {

            // Array of all the different pokemon descriptions.
            let descArray = res.data.flavor_text_entries;

            // Loop that checks all of the descriptions from the API call.
            // Picks the first one that is in English and breaks the loop.
            for (let i = 0; i < descArray.length; i++) {
                if (descArray[i].language.name === "en") {

                    // Sets description to state.
                    setDescription(descArray[i].flavor_text);

                    // Calls function to get evolution line.
                    getPokeEvolution(res.data.evolution_chain.url);

                    break;
                }

            }
        });
    };

    // Function to get evolution line for specific pokemon.
    const getPokeEvolution = (url) => {

        // API call that gets data for the desired evolution line.
        API.getPokemonData(url).then((res) => {

            // Checks to see how many evolutions the pokemon has.
            // Calls the function to get the sprite for each evolution.
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

    // Function to get data for a specific evolution.
    const getEvoData = (poke, num) => {

        // API call to get data on for a specific pokemon.
        API.getOnePokemon(poke).then((res) => {

            // Sets the state for the evolutions based on how many there are.
            // After setting state, show the data on the page.
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

    // When the page loads calls first of three functions.
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

