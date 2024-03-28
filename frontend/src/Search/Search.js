import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Search.css";

const options = {
    method: "GET",
    url: "https://us-real-estate.p.rapidapi.com/v2/for-rent",
    params: {
        city: "San Francisco",
        state_code: "CA",
        limit: "42",
        offset: "0",
        price_min: "1000",
        price_max: "5000",
        property_type:
            "apartment, single_family, condo, townhouse, multi_family, land, mobile, other",
        expand_search_radius: "25",
    },
    headers: {
        "X-RapidAPI-Key": "e357b96598mshfde163274ffcabep1f1e31jsn8e13ff618822",
        "X-RapidAPI-Host": "us-real-estate.p.rapidapi.com",
    },
};

// handleSearch function that redirects to a ResultsList component
const Search = () => {
    const navigate = useNavigate();

    // const handleSearch = async () => {
    //     console.log("Searching...");
    //     // directs to /results
    //     try {
    //         const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/listing/search/TEST");
    //         // extract data
    //         const data = response.data;

    //         if (response.status !== 200) {
    //             throw new Error(data);
    //         }
    //         console.log(data);
    //         // attach data as state to navigate
    //         navigate("/results", { state: { data: data } });
    //         window.scrollTo(0, 0);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const handleSearch = async () => {
        console.log("Searching...");
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
                    <input type="text" placeholder="$" />
                </div>
                <div className="filter-item">
                    <label htmlFor="">Maximum price:</label>
                    <input type="text" placeholder="$" />
                </div>
                <div className="filter-item">
                    <label htmlFor="">Bedrooms:</label>
                    <select name="" id="">
                        <option value="">any</option>
                        <option value="">op1</option>
                        <option value="">op2</option>
                    </select>
                    <label htmlFor="">Bathrooms:</label>
                    <select name="" id="">
                        <option value="">any</option>
                        <option value="">op1</option>
                        <option value="">op2</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Search;
