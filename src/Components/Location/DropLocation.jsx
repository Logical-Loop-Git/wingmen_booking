import React, { useContext } from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Context } from '../../Data/context';


const DropLocation = () => {

    const { setDropLocation } = useContext(Context)

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

    // pickup location
    const handleInputDrop = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelectDrop = ({ description }) => () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                console.log("📍 Drop coordinates: ", { lat, lng });
                setDropLocation({
                    address: description,
                    latitude: lat,
                    longitude: lng
                })
            })
            .catch((error) => {
                console.log("😱 Error: ", error);
            });
    };

    const renderSuggestionsDrop = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text }
            } = suggestion;

            return (
                <li key={place_id} onClick={handleSelectDrop(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });


    return (
        <div ref={ref} className="location_input">
            <p>Choose your Drop Location</p>
            <input
                value={value}
                onChange={handleInputDrop}
                name="address"
                placeholder="Enter Drop location"
            />
            {status === "OK" && <div className="location_suggestion_pickup"><ul>{renderSuggestionsDrop()}</ul></div>}
        </div>
    )
}

export default DropLocation
