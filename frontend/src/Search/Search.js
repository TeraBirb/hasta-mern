import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Search.css";

const Search = () => {
    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState("");
    const [city, setCity] = useState("San Francisco");
    const [stateCode, setStateCode] = useState("CA");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minBedrooms, setMinBedrooms] = useState("1");
    const [minBathrooms, setMinBathrooms] = useState("1");
    const [propertyTypes, setPropertyTypes] = useState({
        any: false,
        townhome: false,
        coop: false,
        condo: false,
        apartment: false,
        single_family: false,
    });

    const handleSearch = async () => {
        console.log("Searching...");

        try {
            // Get city and state from location suggestion
            const locationSuggestionOptions = {
                method: "GET",
                url: "https://us-real-estate.p.rapidapi.com/location/suggest",
                params: { input: searchInput },
                headers: {
                    "X-RapidAPI-Key":
                        "e357b96598mshfde163274ffcabep1f1e31jsn8e13ff618822",
                    "X-RapidAPI-Host": "us-real-estate.p.rapidapi.com",
                },
            };

            const locationResponse = await axios.request(
                locationSuggestionOptions
            );
            console.log(locationResponse.data);
            const suggestedCity = locationResponse.data.data[0].city;
            const suggestedStateCode = locationResponse.data.data[0].state_code;
            setCity(suggestedCity);
            setStateCode(suggestedStateCode);

            // Prepare options for the second request with updated city and state
            const selectedPropertyTypes = Object.entries(propertyTypes)
                .filter(([key, value]) => value === true)
                .map(([key]) => key)
                .join(", ");

            const options = {
                method: "GET",
                url: "https://us-real-estate.p.rapidapi.com/v2/for-rent",
                params: {
                    city: suggestedCity,
                    state_code: suggestedStateCode,
                    limit: "42",
                    beds_min: minBedrooms,
                    baths_min: minBathrooms,
                    price_min: minPrice,
                    price_max: maxPrice,
                    property_type: selectedPropertyTypes,
                    expand_search_radius: "25",
                },
                headers: {
                    "X-RapidAPI-Key":
                        "e357b96598mshfde163274ffcabep1f1e31jsn8e13ff618822",
                    "X-RapidAPI-Host": "us-real-estate.p.rapidapi.com",
                },
            };

            // Make the second request
            const response = await axios.request(options);
            const results = response.data.data.home_search.results;
            console.log(results);

            // Extract data and save to database
            const extractedData = results.map((result) => ({
                photos: result.photos,
                location: result.location,
                price:
                    result.list_price ||
                    result.list_price_min ||
                    result.list_price_max,
                contact: result.href,
                description: result.description,
                tags: result.tags,
            }));

            console.log("Extracted data and saving all to database!");
            const createdDocs = await axios.post(
                process.env.REACT_APP_BACKEND_URL + "/listing/saveAll",
                extractedData
            );
            console.log("Here are the created docs!");
            console.log(createdDocs.data);
            
            // Redirect to results page
            navigate("/results", { state: { data: createdDocs.data } });
            window.scrollTo(0, 0);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setPropertyTypes({
            ...propertyTypes,
            [name]: checked,
        });
    };

    return (
        <div className="search">
            <h3>Browse homes and apartments for rent</h3>
            <div className="search__main">
                <input
                    type="text"
                    placeholder="Enter an address, city, or ZIP code"
                    onInput={(e) => setSearchInput(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="filters">
                <div className="filter-item">
                    <label htmlFor="">Minimum price:</label>
                    <input
                        type="text"
                        placeholder="$"
                        onInput={(e) => setMinPrice(e.target.value)}
                    />
                </div>
                <div className="filter-item">
                    <label htmlFor="">Maximum price:</label>
                    <input
                        type="text"
                        placeholder="$"
                        onInput={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
                <div className="filter-item">
                    <label htmlFor="">Bedrooms:</label>
                    <select
                        value={minBedrooms}
                        onChange={(e) => setMinBedrooms(e.target.value)}
                    >
                        <option value="any">any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                    </select>
                    <label htmlFor="">Bathrooms:</label>
                    <select
                        value={minBathrooms}
                        onChange={(e) => setMinBathrooms(e.target.value)}
                    >
                        <option value="any">any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                    </select>
                </div>
                <div className="filter-item">
                    <label htmlFor="">Property Type:</label>
                    <div>
                        {Object.entries(propertyTypes).map(([key, value]) => (
                            <label key={key}>
                                <input
                                    type="checkbox"
                                    name={key}
                                    checked={value}
                                    onChange={handleCheckboxChange}
                                />
                                {key.replace("_", " ")}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;