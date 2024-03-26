import { useNavigate } from "react-router-dom";

import "./Result.css";

const Result = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("Clicked!");
        // after we set up backend, we will navigate to specific listing
        navigate("/listing/" + props.id, { state: props });
        window.scrollTo(0, 0);
    };

    return (
        <div className="results">
            <div className="resultBox" onClick={handleClick}>
                <img src="" alt="" />
                <div className="resultInfo">
                    <img
                        src={props.photos[0]}
                        alt="Listing"
                    />
                    <h3>{props.title}</h3>
                    <p>{`\$${props.price}`}</p>
                    <p>{props.address}</p>
                    <p>{props.sqft} square feet</p>
                </div>
            </div>
        </div>
    );
};

export default Result;
