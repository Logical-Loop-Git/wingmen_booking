import React from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useEffect } from 'react';
import { Col, Row } from 'reactstrap';


const AddStops = ({ state, setState }) => {

    // const { addStops, setAddStops } = useContext(Context)

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
                console.log("📍 Stops: ", { lat, lng });
                setState({
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
        setValue(state.address)
    }, [])


    return (
        <div ref={ref} className="location_input">
            <div>
                <Row>
                    <Col md="10" xs="10">
                        <p>Choose your Stop Location</p>
                    </Col>
                </Row>
                <input
                    value={value}
                    onChange={handleInputPickup}
                    name="address"
                    placeholder="Enter stop location"
                />
                {status === "OK" && <div className="location_suggestion_pickup"><ul>{renderSuggestionsPickup()}</ul></div>}
            </div>

        </div>
    )
}

export default AddStops
