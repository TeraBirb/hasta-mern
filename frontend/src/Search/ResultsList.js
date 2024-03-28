import { useState } from "react";

import Result from "./Result";

import "./ResultsList.css";
import { useLocation } from "react-router-dom";

const ResultsList = () => {
    // if (props.items.length === 0) {
    // if (!props.items) {
    //   return (
    //     <div className="results-list center">
    //         <h2>No places listings found.</h2>
    //     </div>
    //   );
    // }

    
    let DUMMY_DATA = [];
    const location = useLocation();
    const data = location.state.data;

    DUMMY_DATA = data;

    // Pagination logic
    const itemsPerPage = 6;
    const totalPages = Math.ceil(DUMMY_DATA.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    const paginationList = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    return (
        <div className="resultsListWrapper">
            <ul className="resultsList">
                {DUMMY_DATA.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                ).map((result) => {
                    return (
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
                    );
                })}
            </ul>
            <ul className="pagination">
                {paginationList.map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={pageNumber === currentPage ? "active" : ""}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default ResultsList;
