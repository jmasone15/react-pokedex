import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2/";

export default {
    getAllPokemon: () => {
        return axios.get(`${baseURL}pokemon-species/?limit=900`)
    }
}
