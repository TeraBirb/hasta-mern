import { useNavigate } from "react-router-dom";

import "./Result.css";

const Result = (props) => {
    const navigate = useNavigate();
    const address = props.location.address;
    const streetAddress = `${address.street_number} ${address.street_name} ${
        address.street_suffix || ""
    } ${address.unit || ""}`;
    const cityState = `${address.city}, ${address.state_code}`;

    const handleClick = () => {
        // console.log("Clicked!");
        navigate("/listing/" + props.id, { state: props });
        window.scrollTo(0, 0);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="results">
            <div className="resultBox bg-2" onClick={handleClick}>
                <img src="" alt="" />
                <div className="resultInfo">
                    <img src={props.photos[0].href} alt="Listing" />
                    {/* `${result.description.beds} Bed, ${result.description.baths} Bath ${result.description.type}` */}
                    <h3>{`${
                        props.description.beds ||
                        props.description.beds_min ||
                        props.description.beds_max
                    } Bed, ${
                        props.description.baths ||
                        props.description.baths_min ||
                        props.description.baths_max
                    } Bath ${capitalizeFirstLetter(props.description.type)
                        .replace(/_/g, "-") // replace underscores with hyphens and remove 's' from end of string
                        .replace(/s$/, "")}`}</h3>
                    <p>{`$${props.price}`}</p>
                    <p>{streetAddress}</p>
                    <p>{cityState}</p>
                    <p>
                        {props.description.sqft ||
                        props.description.sqft_min ||
                        props.description.sqft_max
                            ? `${
                                  props.description.sqft ||
                                  props.description.sqft_min ||
                                  props.description.sqft_max
                              } sq ft`
                            : null}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Result;
