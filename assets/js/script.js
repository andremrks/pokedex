
//Atribuindo a uma variável a estrutura criada no HTML
const pokemonList = document.getElementById('pokemonList')

//Selecionando botão para carregar mais Pokémons
const moreBtn = document.getElementById('moreBtn')

const maxRecords = 151
const limit = 10
let offset = 0

//Criando função para transformar lista recebid em uma lista HTML
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}bg">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            
            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

//Chamando a função pokeApi criada no outro arquivo. Então, pego esse resultado, que são os pokemons e transformo em uma lista, inserindo na function criada em cima

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('') //Pega a lista de pokemons, mapeia(converte a lista para uma lista de LI) e junta todos os li sem separador
        pokemonList.innerHTML += newHtml
        
    })
}

loadPokemonItens(offset,limit)

moreBtn.addEventListener('click', () => {
    offset += limit
    const numRecordsNextPage = offset + limit

    if (numRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset,newLimit)

        moreBtn.parentElement.removeChild(moreBtn)
    } else {
        loadPokemonItens(offset,limit)
    }
    
})  
