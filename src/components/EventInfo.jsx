import React from 'react';
import "./EventInfo.css";


const EventInfo = ({ event }) => {
    return (
        <li key={event.id}>
        <h2>{event.name}</h2>
        <img src={event.images[0].url} alt={event.name} />
        <p>{event.dates.start.localDate}</p>
        <p>{event._embedded.venues[0].name}, {event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.stateCode}</p>

        </li>
    );
    }

export default EventInfo;