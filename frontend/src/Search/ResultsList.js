import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Result from "./Result";
import "./ResultsList.css";

const ResultsList = () => {
    const location = useLocation();
    const data = location.state.data;

    // Current page is stored in session storage
    const currentPageStorageKey = "currentPage";
    const [currentPage, setCurrentPage] = useState(
        parseInt(sessionStorage.getItem(currentPageStorageKey)) || 1
    );

    // Pagination logic
    const itemsPerPage = 6;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    useEffect(() => {
        sessionStorage.setItem(currentPageStorageKey, currentPage);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate median, mean, and maximum prices for each property type
    const propertyTypes = ["apartment", "single_family", "condos"];
    const pricesByType = {};

    // Function to calculate median
    const calculateMedian = (arr) => {
        const sortedArr = [...arr].sort((a, b) => a - b);
        const mid = Math.floor(sortedArr.length / 2);
        return sortedArr.length % 2 !== 0
            ? sortedArr[mid]
            : (sortedArr[mid - 1] + sortedArr[mid]) / 2;
    };

    // Function to calculate mean
    const calculateMean = (arr) => {
        const sum = arr.reduce((acc, val) => acc + val, 0);
        return sum / arr.length;
    };

    propertyTypes.forEach((type) => {
        const filteredData = data.filter(
            (result) => result.description.type === type
        );
        const prices = filteredData.map((result) => result.price);
        const medianPrice = calculateMedian(prices);
        const meanPrice = calculateMean(prices);
        const maxPrice = Math.max(...prices);
        pricesByType[type] = {
            medianPrice: medianPrice ? "$" + Math.round(medianPrice) : null,
            meanPrice: meanPrice ? "$" + Math.round(meanPrice) : null,
            maxPrice:
                maxPrice !== -Infinity ? "$" + Math.round(maxPrice) : null,
        };
    });

    // Get current date-time stamp
    // const currentDateTime = new Date().toLocaleString();

    return (
        <div className="resultsListWrapper">
            <ul className="resultsList">
                {data
                    .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                    )
                    .map((result) => (
                        <Result
                            key={result.id}
                            id={result.id}
                            type={result.description.type}
                            description={result.description}
                            contact={result.contact}
                            photos={result.photos}
                            price={result.price}
                            location={result.location}
                            tags={result.tags}
                        />
                    ))}
            </ul>
            <ul className="pagination">
                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={pageNumber === currentPage ? "active" : ""}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                ))}
            </ul>
            {/* Report Table */}
            <div className="reportTableWrapper bg-2">
                {/* <h2>Rental Prices Report</h2>
                <p>Report generated on: {currentDateTime}</p> */}
                <table className="reportTable">
                    <thead>
                        <tr>
                            <th>Property Type</th>
                            <th>Median Price</th>
                            <th>Mean Price</th>
                            <th>Maximum Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {propertyTypes.map((type) => (
                            <tr key={type}>
                                <td>{type.replace(/_/g, "-")}</td>
                                <td>{pricesByType[type].medianPrice}</td>
                                <td>{pricesByType[type].meanPrice}</td>
                                <td>{pricesByType[type].maxPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>
                    We currently display a maximum of 42 results. Consider
                    narrowing down your search filters for better relevance.
                </p>
            </div>
        </div>
    );
};

export default ResultsList;
