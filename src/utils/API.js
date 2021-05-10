import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2/";

export default {
    getAllPokemon: () => {
        return axios.get(`${baseURL}pokemon/?limit=898`)
    },
    getPokemonData: (url) => {
        return axios.get(url);
    },
    getOnePokemon: (query) => {
        return axios.get(`${baseURL}pokemon/${query}`);
    }
}
