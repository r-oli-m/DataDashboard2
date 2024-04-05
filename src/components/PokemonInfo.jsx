import React from 'react';
import "./PokemonInfo.css";
import { Link } from 'react-router-dom';

const PokemonInfo = ({ pokemon }) => {
    return (

        <ul>
            <Link 
                style={{ color: "White" }}
                to={`/pokemon/${pokemon.name}`}
                key={pokemon.name}
                >
                {pokemon.name} <span className="tab"></span> <img
                    src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
                    alt={`Sprite of ${pokemon.name}`}
                />
            </Link>

        </ul>
    );
}

export default PokemonInfo;
