import React from "react";
import { useNavigate } from "react-router-dom";

import "./NavigateBack.css";

const NavigateBack = () => {
    const navigate = useNavigate();

    const handleNavigateBack = () => {
        navigate(-1);
    };

    return (
        <div className="navigateBack">
            <img
                className="navigateBackButton"
                src="https://www.svgrepo.com/show/450517/back.svg"
                alt="back"
                onClick={handleNavigateBack}
            />
        </div>
    );
};

export default NavigateBack;
