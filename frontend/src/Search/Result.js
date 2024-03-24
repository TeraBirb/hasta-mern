const Result = props => {
    return (
        <div className="results">
            <div className="result__box">
                <img src="" alt="" />
                <div className="result__info">
                    <h3>{props.title}</h3>
                    <p>{props.price}</p>
                    <p>{props.address}</p>
                    <p>{props.bedrooms}</p>
                    <p>{props.bathrooms}</p>
                    <p>{props.sqFt}</p>
                </div>
            </div>
        </div>
    );
};

export default Result;
