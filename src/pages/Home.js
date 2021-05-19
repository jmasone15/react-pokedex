import React, { useEffect, useState } from 'react';
import Pokedex from "../components/Pokedex";
import RandomPoke from "../components/RandomPoke";
import SearchPoke from "../components/SearchPoke";
import PokemonInfo from "../components/PokemonInfo";
import API from "../utils/API";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import NavBar from "../components/NavBar";

export default function Home() {

    const [randomPokemon, setRandomPokemon] = useState("");
    const [searchPokemon, setSearchPokemon] = useState("");
    const [searchNumber, setSearchNumber] = useState("");
    const [pokemonData, setPokemonData] = useState({});
    const [rangePokemon, setRangePokemon] = useState([]);
    const [pokeInfo, setPokeInfo] = useState({});
    const [show, setShow] = useState("");
    const [allShow, setAllShow] = useState(false);

    useEffect(() => {
        getRangeData(100);
    }, []);

    // Function to find all pokemon in a range
    async function getRangeData(limit, offset) {
        setRangePokemon([]);

        const results = await API.getPokemonRange(limit, offset);
        setRangePokemon(results.data.results);
    }

    function pokemonRangeData(e, url) {
        e.preventDefault();

        API.getPokemonData(url).then((res) => {
            setPokeInfo(res.data);
            setShow("pokedex");
            setAllShow(true);
        });
    }

    // Function to find random pokemon
    async function handleRandomClick(e) {
        e.preventDefault();

        let pokemon = await API.getAllPokemon();

        // Generate random number based on size of array.
        // Grab a random array value.
        // Capitilize the first letter of the name.
        let num = Math.floor(Math.random() * pokemon.data.results.length);
        let random = pokemon.data.results[num];
        let upperCase = random.name.charAt(0).toUpperCase() + random.name.slice(1);

        // Get Data on individual pokemon with url link
        setRandomPokemon(upperCase);
        getPokemonInfo(random.url);

    }

    // Function to find pokemon by search
    async function handleSearchFormSubmit(e) {
        e.preventDefault();

        if (searchNumber === "") {

            // Lowercase search query and remove white space
            // Capitilize the first letter of the name.
            let searchString = searchPokemon.toLowerCase().replace(/\s+/g, '')
            let pokemon = await API.getOnePokemon(searchString);
            if (pokemon === {}) {
                alert("No results found");
            } else {
                let upperCase = pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.slice(1);

                setSearchPokemon(upperCase);
                setPokemonData(pokemon.data);
                setShow("search");
                setAllShow(true);
            }

        } else if (searchPokemon === "") {

            // Lowercase search query and remove white space
            // Capitilize the first letter of the name.
            let pokemon = await API.getOnePokemon(searchNumber);
            if (pokemon === {}) {
                alert("No results found");
            } else {
                let upperCase = pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.slice(1);

                setSearchPokemon(upperCase);
                setPokemonData(pokemon.data);
                setShow("search");
                setAllShow(true);
            }

        } else if (searchNumber === "" && searchPokemon === "") {
            alert("Please enter a valid name or number.")
        }

    }

    // Function to get individual pokemon info.
    async function getPokemonInfo(url) {
        const info = await API.getPokemonData(url);

        setPokemonData(info.data);
        setShow("random");
        setAllShow(true);
    }

    return (
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
                            <Card>
                                <Form>
                                    <Form.Group>
                                        <Form.Label htmlFor="search">Search by Name:</Form.Label>
                                        <Form.Control type="text" name="search" value={searchPokemon} onChange={(e) => setSearchPokemon(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="searchNumber">Search by Number:</Form.Label>
                                        <Form.Control type="number" min="1" max="898" name="searchNumber" value={searchNumber} onChange={(e) => setSearchNumber(e.target.value)} />
                                    </Form.Group>
                                    <Button onClick={(e) => handleSearchFormSubmit(e)}>Search</Button>
                                    <Button onClick={(e) => handleRandomClick(e)}>Surprise Me</Button>
                                </Form>
                            </Card>
                            <br />
                        </Col>
                        {allShow === true && (
                            <Col>
                                <Card>
                                    {show === "random" && (
                                        <RandomPoke pokemon={randomPokemon} data={pokemonData} />
                                    )}
                                    {show === "search" && (
                                        <SearchPoke pokemon={searchPokemon} data={pokemonData} />
                                    )}
                                    {show === "pokedex" && (
                                        <PokemonInfo data={pokeInfo} />
                                    )}
                                </Card>
                            </Col>
                        )}
                    </Row>
                    <Row>
                        <Col>
                            <Pokedex getRangeData={getRangeData} rangePokemon={rangePokemon} pokemonRangeData={pokemonRangeData} />
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    )
}
