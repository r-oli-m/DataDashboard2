import React, { Component, useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from "recharts";
const API_KEY = import.meta.env.VITE_API_KEY;


const GrowthRateChart = ({ }) => {
    // for ever of the 6 types of growth rate names, 
    // make a chart with level and corresponding expereince. on hover shows you that pokmon

    // level = x-axis
    // experience = y-axis
    // point = pokemon name, hover = pokemon name
    // title = growth rate name
    // first j try with 1 growth rate 
    // need to get and save the data above w use effect api call
    // use recharts to chart with the saved data
    // actuallly IM NOT SURE I CAN GET POKEMON, think have can get only list of pokemon specises :( w that growth rate)

    const [growthRateData, setGrowthRateData] = useState(null); // level, experience
    const [pkmnSpecies, setPkmnSpecies] = useState(null); // pokemon species list
    const [growthRateName, setGrowthRateName] = useState(null); // growth rate name

    useEffect(() => {
        const fetchGrowthRateDatae = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/growth-rate/1`) //hardcoded for now
            const json = await response.json();
            setGrowthRateData(json.levels);
            setPkmnSpecies(json.pokemon_species)
            setGrowthRateName(json.name);
        }
        fetchGrowthRateDatae().catch(console.error);
        console.log(growthRateData);
    }, [])


    return (
        <>
            <h2>Growth Rate: {growthRateName}</h2>
            {growthRateData && (
                <LineChart width={600} height={300} data={growthRateData}>
                    <Line type="monotone" dataKey="experience" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="level">
                        <Label value="Level" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis label={{ value: "Experience", angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                </LineChart>
            )}
            <div>
                <h1>Species With Growth Rate: {growthRateName}</h1>
                <ul>
                    {pkmnSpecies && pkmnSpecies.map((pkmn) => (
                        <li key={pkmn.name}>{pkmn.name}</li>
                    ))}
                </ul>
            </div>
        </>
    )

}
export default GrowthRateChart;