import { useEffect, useState } from 'react';
import './App.css';
import PokemonInfo from './components/PokemonInfo'; // Ensure you have a PokemonInfo component

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=120`); // there are 1025 total pokem, limit to 120
      const jsonData = await response.json();
      setPokemon(jsonData.results);
    };
    fetchAllPokemon().catch(console.error);
  }, []);

  useEffect(() => {
    if (searchTerm !== '') {
      const filtered = pokemon.filter((pkmn) =>
        pkmn.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemon(filtered);
    } else {
      setFilteredPokemon([]);
    }
  }, [searchTerm, pokemon]);

  const handlePokemonNameSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  return (
    <div className="App">
      <h1>Pokémon Dashboard</h1>
      <input
        type="text"
        placeholder="Search Pokémon by name..."
        value={searchTerm}
        onChange={handlePokemonNameSearch}
      />
      <div className="summary">
        <p>Total Pokémon: {pokemon.length}</p>
      </div>
      <ul className="pokemon-list">
        {(filteredPokemon.length > 0 ? filteredPokemon : pokemon).map((pkmn) => (
          <li key={pkmn.name}>
            <PokemonInfo pokemon={pkmn} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
