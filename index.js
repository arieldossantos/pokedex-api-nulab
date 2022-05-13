const { default: axios } = require("axios");
const express = require("express")

const app = express()
app.listen(3001, () => console.log("app is up"))

app.get("/pokemon", async (req, res, next) => {
    const pokemon = await obterTodosPokemon();
    const result = [];
    for(var i = 0; i < pokemon.length; i++) {
        const detalhesDoPokemon = await obterPokemon(pokemon[i].name)
        result.push({
            ...pokemon,
            height: detalhesDoPokemon.height
        })
    }
    res.status(200).send(result);
})

async function obterTodosPokemon() {
    var pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=6&offset=0")
    return pokemon.data.results
}

async function obterPokemon(nomePokemon) {
    var pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
    return pokemon.data
}

module.exports = {
    app,
    obterTodosPokemon,
    obterPokemon
};