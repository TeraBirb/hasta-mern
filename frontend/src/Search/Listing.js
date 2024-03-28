import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import NavigateBack from "../UIElements/NavigateBack";
import Map from "../UIElements/Map";
import { AuthContext } from "../Context/auth-context";

import "./Listing.css";

const HEART_ICON_FALSE = "https://www.svgrepo.com/show/404845/black-heart.svg";
const HEART_ICON_TRUE = "https://www.svgrepo.com/show/407319/red-heart.svg";
const NO_INFO = "Visit main listing for more information.";

const Listing = () => {
    const location = useLocation();
    const listing = location.state;
    const auth = useContext(AuthContext);

    const [isFavorite, setIsFavorite] = useState(false);

    const address = listing.location.address;
    const streetAddress = `${address.street_number} ${address.street_name} ${address.street_suffix} ${address.unit}`;
    const cityState = `${address.city}, ${address.state_code}`;

    useEffect(() => {
        const checkFavorite = async () => {
            if (auth.isLoggedIn) {
                // fetch user's favorites
                // check if this listing is in user's favorites
                // setIsFavorite(true);
                console.log("checking favorites using useEffect");
                try {
                    const response = await axios.get(
                        process.env.REACT_APP_BACKEND_URL + "/listing/check/" + auth.userId + "/" + listing.id,
                        {
                            headers: {
                                Authorization: `Bearer ${auth.token}`,
                            },
                        }
                    );
                    console.log(response.data);
                    if (response.data.isListingInFavorites === true) {
                        setIsFavorite(true);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            // console.log("isFavorite: ", isFavorite);
        };
        checkFavorite();
    }, []);

    const handleFavorite = async () => {
        if (!auth.isLoggedIn) {
            console.log("log in first!")
            return;
        }
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);

        // add or remove from user's favorites
        if (isFavorite) {
            // remove from favorites
            console.log("removing");
            try {
                await axios.delete(
                    process.env.REACT_APP_BACKEND_URL + "/listing/" + auth.userId + "/" + listing.id,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        }
                    }
                );
            } catch (err) {
                console.log(err);
            }
        } else {    
            // add to favorites
            try {
                console.log(listing.id);
                await axios.patch(
                    process.env.REACT_APP_BACKEND_URL + "/listing/save",
                    {
                        userId: auth.userId,
                        listingId: listing.id
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    }
                );
            } catch (err) {
                console.log(err);
            }
            
        }

    };

    return (
        <React.Fragment>
            <div className="listing">
                <NavigateBack />
                <div className="listingImageWrapper">
                    {listing.photos.map((photo, index) => {
                        return (
                            <img
                                key={index}
                                className="listingImage"
                                src={photo.href}
                                alt="Listing"
                            />
                        );
                    })}
                </div>
                <div className="listingDetails">
                    <img
                        className="favorite"
                        src={isFavorite ? HEART_ICON_TRUE : HEART_ICON_FALSE}
                        alt={listing.title}
                        onClick={handleFavorite}
                    />
                    <h2>{listing.title}</h2>
                    <h3>{`\$${listing.price || NO_INFO}`}</h3>
                    <h4>{streetAddress || NO_INFO}</h4>
                    <h4>{cityState || NO_INFO}</h4>
                    <h4>
                        {`${listing.description.beds} bed, ${listing.description.baths} bath`}
                    </h4>
                    <h4>{listing.description.sqft || NO_INFO} square feet</h4>
                    <div className="mapContainer">
                        <Map
                            center={{
                                lat: address.coordinate.lat,
                                lng: address.coordinate.lon,
                            }}
                            zoom={16}
                        />
                    </div>
                    <hr />
                    <p>More information</p>
                    <ul>
                        {listing.tags.map((tag, index) => {
                            return <li key={index}>{tag}</li>;
                        })}
                    </ul>
                    <a
                        href={listing.contact}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit the Complete Listing
                    </a>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Listing;
