import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Search.css";

// handleSearch function that redirects to a ResultsList component
const Search = () => {
    const navigate = useNavigate();

    const handleSearch = async () => {
        console.log("Searching...");
        // directs to /results
        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/listing/search/TEST");
            // extract data
            const data = response.data;

            if (response.status !== 200) {
                throw new Error(data);
            }
            console.log(data);
            // attach data as state to navigate
            navigate("/results", { state: { data: data } });
            window.scrollTo(0, 0);
        } catch (err) {
            console.log(err);
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
