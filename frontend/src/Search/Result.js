import { useNavigate } from "react-router-dom";

import Listing from "./Listing";

import "./Result.css";

const Result = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("Clicked!");
        // after we set up backend, we will navigate to specific listing
        navigate("/listing/" + props.id, { state: props });
        // navigate("/listing");
    };

    return (
        <div className="results">
            <div className="resultBox" onClick={handleClick}>
                <img src="" alt="" />
                <div className="resultInfo">
                    <img
                        src={props.image}
                        alt={`Listing image of ${props.title}`}
                    />
                    <h3>{props.title}</h3>
                    <p>{props.price}</p>
                    <p>{props.address}</p>
                    <p>
                        {props.bedrooms} bed, {props.bathrooms} bath
                    </p>
                    <p>{props.sqFt} square feet</p>
                </div>
            </div>
        </div>
    );
};

export default Result;
