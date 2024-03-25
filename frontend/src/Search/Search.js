import { useNavigate } from "react-router-dom";

import "./Search.css";

// handleSearch function that redirects to a ResultsList component
const Search = () => {
    const navigate = useNavigate();

    const handleSearch = () => {
        console.log("Searching...");
        // directs to /results
        navigate("/results");
    };
    

    return (
        <div className="search">
            <h2>Discover the perfect place to call home</h2>
            <p>Browse homes and apartments for rent</p>
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
