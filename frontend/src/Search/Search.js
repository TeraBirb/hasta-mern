import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Search.css";

const Search = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [searchInput, setSearchInput] = useState("");
    // const [city, setCity] = useState("San Francisco");
    // const [stateCode, setStateCode] = useState("CA");
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
        setIsLoading(true);

        try {
            const selectedPropertyTypes = Object.entries(propertyTypes)
                .filter(([key, value]) => value === true)
                .map(([key]) => key)
                .join(", ");

            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/listing", 
            {
                searchInput,
                minPrice,
                maxPrice,
                minBedrooms,
                minBathrooms,
                selectedPropertyTypes
            });

            console.log(response);

            // Redirect to results page
            navigate("/results", { state: { data: response.data } });
            window.scrollTo(0, 0);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
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
                <button onClick={handleSearch}>
                    {isLoading ? "SEARCHING..." : "SEARCH"}
                </button>
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
                    <div className="propertyTypes">
                        {Object.entries(propertyTypes).map(([key, value]) => (
                            <label key={key}>
                                <input
                                    type="checkbox"
                                    name={key}
                                    checked={value}
                                    onChange={handleCheckboxChange}
                                />
                                {key.replace("_", "-")}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
