import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../Context/auth-context";

import "./Favorites.css";

const Favorites = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(
                    process.env.REACT_APP_BACKEND_URL +
                        "/listing/user/" +
                        auth.userId
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

        if (auth.isLoggedIn) {
            fetchFavorites();
        }
    }, []);

    return (
        <div className="favorites">
            {auth.isLoggedIn ? (
                <h2>
                    Looks like you haven't saved a listing yet. This is where
                    your saved listings go.
                </h2>
            ) : (
                <h2>
                    Please log in or sign up to start saving listings to your
                    favorites.
                </h2>
            )}
        </div>
    );
};

export default Favorites;
