import { useState } from "react";

import Result from "./Result";

import "./ResultsList.css";

const ResultsList = (props) => {
    // if (props.items.length === 0) {
    // if (!props.items) {
    //   return (
    //     <div className="results-list center">
    //         <h2>No places listings found.</h2>
    //     </div>
    //   );
    // }

    const DUMMY_DATA = [
        {
            key: "1",
            id: "1",
            image: "https://fakeimg.pl/345x180",
            title: "Title 1",
            price: "$1000",
            address: "1234 Elm St",
            bedrooms: 3,
            bathrooms: 2,
            sqFt: 1200,
        },
        {
            key: "2",
            id: "2",
            image: "https://fakeimg.pl/345x180",
            title: "Title 2",
            price: "$2000",
            address: "5678 Elm St",
            bedrooms: 4,
            bathrooms: 3,
            sqFt: 1500,
        },
        {
            key: "3",
            id: "3",
            image: "https://fakeimg.pl/345x180",
            title: "Title 3",
            price: "$3000",
            address: "91011 Elm St",
            bedrooms: 5,
            bathrooms: 4,
            sqFt: 1800,
        },
        {
            key: "4",
            id: "4",
            image: "https://fakeimg.pl/345x180",
            title: "Title 4",
            price: "$4000",
            address: "121314 Elm St",
            bedrooms: 6,
            bathrooms: 5,
            sqFt: 2100,
        },
        {
            key: "5",
            id: "5",
            image: "https://fakeimg.pl/345x180",
            title: "Title 5",
            price: "$5000",
            address: "151617 Elm St",
            bedrooms: 7,
            bathrooms: 6,
            sqFt: 2400,
        },
        {
            key: "6",
            id: "6",
            image: "https://fakeimg.pl/345x180",
            title: "Title 6",
            price: "$6000",
            address: "181920 Elm St",
            bedrooms: 8,
            bathrooms: 7,
            sqFt: 2700,
        },
        {
            key: "7",
            id: "7",
            image: "https://fakeimg.pl/345x180",
            title: "Title 7",
            price: "$4000",
            address: "121314 Elm St",
            bedrooms: 6,
            bathrooms: 5,
            sqFt: 2100,
        },
        {
            key: "8",
            id: "8",
            image: "https://fakeimg.pl/345x180",
            title: "Title 8",
            price: "$5000",
            address: "151617 Elm St",
            bedrooms: 7,
            bathrooms: 6,
            sqFt: 2400,
        },
        {
            key: "9",
            id: "9",
            image: "https://fakeimg.pl/345x180",
            title: "Title 9",
            price: "$6000",
            address: "181920 Elm St",
            bedrooms: 8,
            bathrooms: 7,
            sqFt: 2700,
        },
    ];

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
                            image={result.image}
                            title={result.title}
                            price={result.price}
                            address={result.address}
                            bedrooms={result.bedrooms}
                            bathrooms={result.bathrooms}
                            sqFt={result.sqFt}
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
