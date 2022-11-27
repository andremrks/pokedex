

//saída do arquivo: um objeto com as funções de manipulação da PokéApi

//criando função que abstrai o consumo do http

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) { //Converter padrão da pokeapi em um padrão próprio
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const type = types[0]

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())  //pega a lista dos pokemons.results,faz uma nova requisição de "pokemons/url" //pega a response e converte em json
        .then((convertPokeApiDetailToPokemon))
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    return fetch(url)   //Usando Fetch para consumir API
        .then((response) => response.json())    //quando a promise for resolvida, peço para converter o body convertido para json
        .then((jsonBody) => jsonBody.results)   //recebendo o body convertido e buscando os "results" que são o que interessa no momento
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //mapeando a lista em uma lista de requisições do detalhe dos pokemons que é o novo fetch acima
        .then((detailRequests) => Promise.all(detailRequests)) //requisições, esperando a lista de promessas serem resolvidas
        .then((pokemonsDetails) => pokemonsDetails) //devolve minha lista   
}

