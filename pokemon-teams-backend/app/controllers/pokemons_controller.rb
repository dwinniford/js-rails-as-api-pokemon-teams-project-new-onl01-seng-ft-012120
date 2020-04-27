require 'faker'

class PokemonsController < ApplicationController
    def create 
        trainer = Trainer.find(params[:trainer_id])
        if trainer.pokemons.length < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            new_pokemon = trainer.pokemons.build(nickname: name, species: species)
            new_pokemon.save
            render json: new_pokemon
        end
    end

    def destroy 
        pokemon = Pokemon.find(params["id"])
        pokemon.destroy 
        render json: pokemon 
    end
end
