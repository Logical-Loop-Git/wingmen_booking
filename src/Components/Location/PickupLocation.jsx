import React, { useContext } from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Context } from '../../Data/context';
import { useEffect } from 'react';


const PickupLocation = () => {

    const { setPickupLocation, pickupLocation } = useContext(Context)

    const { value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300
    });

    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    //PICKUP LOCATION
    const handleInputPickup = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    //GET LAT LNG FROM INPUT
    const handleSelectPickup = ({ description }) => () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                console.log("📍 Pickup coordinates: ", { lat, lng });
                setPickupLocation({
                    address: description,
                    latitude: lat,
                    longitude: lng
                })
            })
            .catch((error) => {
                console.log("😱 Error: ", error);
            });
    };

    //SUGGESTION FOR PICKUP LOCATION
    const renderSuggestionsPickup = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text }
            } = suggestion;

            return (
                <li key={place_id} onClick={handleSelectPickup(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    useEffect(() => {
        setValue(pickupLocation.address)
    }, [])


    return (
        <div ref={ref} className="location_input">
            <p>Choose your Pickup Location</p>
            <input
                value={value}
                onChange={handleInputPickup}
                name="address"
                placeholder="Enter pickup location"
            />
            {status === "OK" && <div className="location_suggestion_pickup"><ul>{renderSuggestionsPickup()}</ul></div>}
        </div>
    )
}

export default PickupLocation
