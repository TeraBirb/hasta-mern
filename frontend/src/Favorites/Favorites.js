import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Favorites = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // grab userID from Context
        const userId = "66030a8e5fc33f570f2d5945";
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(
                    process.env.REACT_APP_BACKEND_URL +
                        "/listing/user/" +
                        userId
                );
                const data = response.data;

                if (response.status !== 200) {
                    throw new Error(data);
                }

                console.log(data);
                navigate("/results", { state: { data: data } });
                window.scrollTo(0, 0);
            } catch (err) {
                console.error(err);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div>
            <h2>Loading...</h2>
        </div>
    );
};

export default Favorites;
