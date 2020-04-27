const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {

    fetch(TRAINERS_URL)
        .then(function(response) {
            return response.json()
        })
        .then(function(trainers) {
            console.log(trainers) 
            for (trainer of trainers) {
                let trainerCard = document.createElement("DIV")
                trainerCard.setAttribute("data-id", trainer.id)
                trainerCard.classList.add("card")
                document.querySelector("MAIN").appendChild(trainerCard)
                let nameHeader = document.createElement("P")
                nameHeader.innerHTML = trainer.name 
                trainerCard.appendChild(nameHeader)
                let addButton = document.createElement("BUTTON")
                addButton.setAttribute("data-trainer-id", trainer.id)
                addButton.innerHTML = "Add Pokemon"
                trainerCard.appendChild(addButton)
                let pokemonList = document.createElement("UL")
                trainerCard.appendChild(pokemonList)
                function createPokemonItem(pokemon, pokemonList) {
                    let pokemonItem = document.createElement("LI")
                    let releaseButton = document.createElement("BUTTON")
                    releaseButton.innerHTML = "Release"
                    releaseButton.setAttribute("data-pokemon-id", pokemon.id)
                    releaseButton.classList.add("release")
                    pokemonItem.innerHTML = `${pokemon.nickname} (${pokemon.species})`
                    pokemonItem.appendChild(releaseButton)
                    pokemonList.appendChild(pokemonItem)
                    releaseButton.addEventListener("click", function(event) {
                        const configObject = {
                            method: "delete",
                            headers: {
                                'Content-Type': "application/json",
                                "Accept": "application/json"
                            }
                        }
                        fetch(`${POKEMONS_URL}/${event.target.getAttribute("data-pokemon-id")}`, configObject)
                            .then(function(response) {
                                return response.json();
                            })
                            .then(function(deletedPokemon) {
                                console.log(deletedPokemon)
                                event.target.parentNode.remove()
                            })
                    })
                }
                addButton.addEventListener("click", function(event) {
                    const configObject = {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            "trainer_id": event.target.getAttribute("data-trainer-id")
                        })
                    }
                    console.log(configObject)
                    fetch(POKEMONS_URL, configObject)
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(newPokemon) {
                            console.log(newPokemon)
                            createPokemonItem(newPokemon, pokemonList)
                        })
                })
                
                for (pokemon of trainer.pokemons) {
                   createPokemonItem(pokemon, pokemonList)
                }


            }
            
        })

})
