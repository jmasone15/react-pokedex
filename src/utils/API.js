import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2/";

export default {
    // Gets all pokemon in the API database for random pokemon.
    getAllPokemon: () => {
        return axios.get(`${baseURL}pokemon/?limit=898`)
    },
    // Gets pokemon data for any link sent by the API
    getPokemonData: (url) => {
        return axios.get(url);
    },
    // Gets pokemon data for a specific pokemon by name or number
    getOnePokemon: (query) => {
        return axios.get(`${baseURL}pokemon/${query}`);
    },
    // Gets the list of pokemon between a range
    getPokemonRange: (limit, offset) => {
        return axios.get(`${baseURL}pokemon/?limit=${limit}&offset=${offset}`)
    }
}
