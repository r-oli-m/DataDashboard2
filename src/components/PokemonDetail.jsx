import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {
        const getPokemonData = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
            const data = await response.json();
            setFullDetails(data);
        };

        getPokemonData().catch(console.error);
    }, [params.name]);

    return (
        <div>
            <h3>Pokemon Detail</h3>
            {fullDetails && (
                <div>
                    <h1>{fullDetails.name.toUpperCase()}</h1>
                    <img src={fullDetails.sprites.front_default} alt={fullDetails.name}/>
                    <p>Base Experience: {fullDetails.base_experience}</p>
                    <p>Height: {fullDetails.height} dm</p>
                    <p>Weight: {fullDetails.weight} hg</p>

                    <h4>Abilities</h4>
                    <ul>
                        {fullDetails.abilities.map((ability) => (
                            <li key={ability.ability.name}>{ability.ability.name}</li>
                        ))}
                    </ul>

                    <h4>Types</h4>
                    <ul>
                        {fullDetails.types.map((type) => (
                            <li key={type.type.name}>{type.type.name}</li>
                        ))}
                    </ul>

                    <h4>Base Stats</h4>
                    <ul>
                        {fullDetails.stats.map((stat) => (
                            <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EventDetail;
