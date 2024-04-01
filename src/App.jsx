import { useEffect, useState } from 'react';
import './App.css';
import EventInfo from './components/EventInfo';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stateSearch, setStateSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [genreCounts, setGenreCounts] = useState({});
  const [averageTicketPrice, setAverageTicketPrice] = useState(0);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}`
        );
        const jsonData = await response.json();
        if (jsonData && jsonData._embedded && jsonData._embedded.events) {
          setEvents(jsonData._embedded.events);
          calculateGenreCounts(jsonData._embedded.events);
          calculateAverageTicketPrice(jsonData._embedded.events);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllEvents().catch(console.error);
  }, []);

  const calculateGenreCounts = (eventsData) => {
    const counts = eventsData.reduce((acc, event) => {
      const genres = event.classifications ? event.classifications.map(classification => classification.genre.name) : [];
      genres.forEach(genre => {
        acc[genre] = (acc[genre] || 0) + 1;
      });
      return acc;
    }, {});
    setGenreCounts(counts);
  };

  const calculateAverageTicketPrice = (eventsData) => {
    const totalTicketPrices = eventsData.reduce((acc, event) => {
      const price = event.priceRanges ? event.priceRanges.reduce((min, range) => Math.min(min, range.min), Infinity) : 0;
      return acc + price;
    }, 0);
    const average = totalTicketPrices / eventsData.length;
    setAverageTicketPrice(average.toFixed(2)); // Round to 2 decimal places
  };

  const handleEventNameSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    if (value !== '') {
      const filtered = events.filter((event) =>
        event.name.toLowerCase().includes(value)
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents([]);
    }
  };

  const handleStateSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setStateSearch(value);
    if (value !== '') {
      const filtered = events.filter((event) =>
        event._embedded.venues[0].state.stateCode.toLowerCase().includes(value)
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents([]);
    }
  };

  return (
    <div className="App">
      <h1>Ticketmaster Events Dashboard</h1>
      <input
        type="text"
        placeholder="Search events by name..."
        value={searchTerm}
        onChange={handleEventNameSearch}
      />
      <input
        type="text"
        placeholder="Search events by state..."
        value={stateSearch}
        onChange={handleStateSearch}
      />
      <div className="summary">
        <p>Total Events: {events.length}</p>
        <p>Events by Genre:</p>
        <ul>
          {Object.entries(genreCounts).map(([genre, count]) => (
            <li key={genre}>{genre}: {count}</li>
          ))}
        </ul>
        <p>Average Ticket Price: ${averageTicketPrice}</p>
      </div>
      <ul className="event-list">
        {filteredEvents.length > 0
          ? filteredEvents.map((event) => (
            <ul key={event.id}>
              <EventInfo event={event} />
            </ul>
          ))
          : events.map((event) => (
            <ul key={event.id}>
              <EventInfo event={event} />
            </ul>
          ))}
      </ul>
    </div>
  );
}

export default App;
