import "./Result.css";

const Result = props => {
    return (
        <div className="results">
            <div className="resultBox">
                <img src="" alt="" />
                <div className="resultInfo">
                    <img src={props.image} alt={`Listing image of ${props.title}`} />
                    <h3>{props.title}</h3>
                    <p>{props.price}</p>
                    <p>{props.address}</p>
                    <p>{props.bedrooms} bed, {props.bathrooms} bath</p>
                    <p>{props.sqFt} square feet</p>
                </div>
            </div>
        </div>
    );
};

export default Result;
