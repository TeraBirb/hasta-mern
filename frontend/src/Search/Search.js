import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Search.css";

let options = {
    method: "GET",
    url: "https://us-real-estate.p.rapidapi.com/v2/for-rent",
    params: {
        city: "San Francisco",
        state_code: "CA",
        limit: "42",
        beds_min: "1",
        baths_min: "1",
        price_min: "1000",
        price_max: "5000",
        property_type:
            "apartment, single_family, condo, townhouse, multi_family, land, mobile, other",
        expand_search_radius: "25",
        //  1|5|10|25|50
    },
    headers: {
        "X-RapidAPI-Key": "e357b96598mshfde163274ffcabep1f1e31jsn8e13ff618822",
        "X-RapidAPI-Host": "us-real-estate.p.rapidapi.com",
    },
};

// handleSearch function that redirects to a ResultsList component
const Search = () => {
    const navigate = useNavigate();

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
        options.params.city = city;
        options.params.state_code = stateCode;
        options.params.price_min = minPrice;
        options.params.price_max = maxPrice;
        options.params.beds_min = minBedrooms;
        options.params.baths_min = minBathrooms;

        const selectedPropertyTypes = Object.entries(propertyTypes)
            .filter(([key, value]) => value === true)
            .map(([key]) => key)
            .join(", ");
        options.params.property_type = selectedPropertyTypes;
        // directs to /results
        // US REAL ESTATE API
        try {
            const response = await axios.request(options);
            const results = response.data.data.home_search.results;
            console.log(results);
            // extract only data we need
            const extractedData = results.map((result) => {
                return {
                    photos: result.photos,
                    location: result.location,
                    price: result.list_price,
                    contact: result.href,
                    description: result.description,
                    tags: result.tags,
                };
            });
            console.log("extracted! and saving all to database!");
            // console.log(extractedData);
            // save to database
            try {
                const createdDocs = await axios.post(
                    process.env.REACT_APP_BACKEND_URL + "/listing/saveAll",
                    extractedData
                );
                console.log("Here are the created docs!");
                console.log(createdDocs);
                const passedDocs = createdDocs.data;
                // attach data as state to navigate
                navigate("/results", { state: { data: passedDocs } });
                window.scrollTo(0, 0);
            } catch (err) {
                console.log(err);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // const handleSearch = () => {
    //     options.params.city = city;
    //     options.params.state_code = stateCode;
    //     options.params.price_min = minPrice;
    //     options.params.price_max = maxPrice;
    //     options.params.beds_min = minBedrooms;
    //     options.params.baths_min = minBathrooms;

    //     const selectedPropertyTypes = Object.entries(propertyTypes)
    //         .filter(([key, value]) => value === true)
    //         .map(([key]) => key)
    //         .join(", ");
    //     options.params.property_type = selectedPropertyTypes;

    //     console.log(options.params);
    // };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setPropertyTypes({
            ...propertyTypes,
            [name]: checked,
        });
    };

    return (
        <div className="search">
            {/* <h2>Discover the perfect place to call home</h2> */}
            <h3>Browse homes and apartments for rent</h3>
            <div className="search__main">
                <input
                    type="text"
                    placeholder="Enter an address, city, or ZIP code"
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
