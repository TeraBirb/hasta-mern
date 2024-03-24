import Result from "./Result";

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
            image: "https://via.placeholder.com/150",
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
            image: "https://via.placeholder.com/150",
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
            image: "https://via.placeholder.com/150",
            title: "Title 3",
            price: "$3000",
            address: "91011 Elm St",
            bedrooms: 5,
            bathrooms: 4,
            sqFt: 1800,
        }
    ];

    return (
        <ul className="results-list">
            {DUMMY_DATA.map((result) => {
                return (
                    <Result
                        key={result.id}
                        id={result.id}
                        image={result.image}
                        title={result.title}
                        price={result.description}
                        address={result.address}
                        bedrooms={result.bedrooms}
                        bathrooms={result.bathrooms}
                        sqFt={props.onDeleteresult}
                    />
                );
            })}
        </ul>
    );
};
export default ResultsList;
