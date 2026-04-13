import { useNavigate } from "react-router-dom";

import "./Result.css";

const Result = (props) => {
    const navigate = useNavigate();
    const address = props.location.address;
    const streetAddress = address.line;
    const cityState = `${address.city}, ${address.state_code}`;
    const rentalType = props.description.type !== "other" ? props.description.type.replace(/_/g, " ") : "";

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
                <div className="resultInfo">
                    <img
                        className="resultInfoImage"
                        src={props.photos[0].href}
                        // temporary fix for image size in mobile devices
                        // will be replaced when migrating to Tailwind CSS
                        style={{ 
                            height: "auto", 
                            width: "100%", 
                            borderRadius: "5px" 
                        }} 
                        alt="Listing"
                    />
                    {/* `${result.description.beds} Bed, ${result.description.baths} Bath ${result.description.type}` */}
                    <h3>{`${
                        props.description.beds ||
                        props.description.beds_min ||
                        props.description.beds_max
                    } Bed, ${
                        props.description.baths ||
                        props.description.baths_min ||
                        props.description.baths_max
                    } Bath ${capitalizeFirstLetter(rentalType)}`}</h3>
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
