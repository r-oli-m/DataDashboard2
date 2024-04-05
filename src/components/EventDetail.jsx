import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const EventDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);
    useEffect(() => {
        const getEventData = async () => {
            const venueDetails = await fetch(
                `https://app.ticketmaster.com/discovery/v2/venues/${params.id}.json?apikey=${API_KEY}`);
            // const eventDetails = await fetch(
            //     `https://app.ticketmaster.com/discovery/v2/events/${params.id}.json?apikey=${API_KEY}`);

            const venueJson = await venueDetails.json();
            // const eventJson = await eventDetails.json();
            setFullDetails(venueJson); 
            // ,"eventData":eventJson});
        }
        getEventData().catch(console.error);
    }, [params.id]);


    return (
        <div>
            <h3>hi</h3>
            {fullDetails &&  (
                <div>
                    <h1>Eent Detsail</h1>


                    <table>
                        <tbody>
                            <tr>
                                <th>Venue Name</th>
                                <th>{fullDetails.name}</th>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <th>{`${fullDetails.address.line1}, 
                                      ${fullDetails.address.state.stateCode}, 
                                      ${fullDetails.country}`}</th>
                            </tr>
                            <tr>
                                <th>Venue Name</th>
                                <th></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EventDetail;
