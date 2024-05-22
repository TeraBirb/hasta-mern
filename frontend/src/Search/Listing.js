import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import NavigateBack from "../UIElements/NavigateBack";
import Map from "../UIElements/Map";
import Toast from "../UIElements/Toast";
import { AuthContext } from "../Context/auth-context";

import "./Listing.css";

const HEART_ICON_FALSE = "https://www.svgrepo.com/show/404845/black-heart.svg";
const HEART_ICON_TRUE = "https://www.svgrepo.com/show/407319/red-heart.svg";
const NO_INFO = " N/A ";

const Listing = () => {
    const location = useLocation();
    const listing = location.state;
    const auth = useContext(AuthContext);

    const [isFavorite, setIsFavorite] = useState(false);

    const address = listing.location.address;
    const streetAddress = `${address.street_number} ${address.street_name} ${
        address.street_suffix || ""
    } ${address.unit || ""}`;
    const cityState = `${address.city}, ${address.state_code}`;

    // console.log(listing);

    useEffect(() => {
        const checkFavorite = async () => {
            if (auth.isLoggedIn) {
                // fetch user's favorites
                // check if this listing is in user's favorites
                // setIsFavorite(true);
                try {
                    const response = await axios.get(
                        process.env.REACT_APP_BACKEND_URL +
                            "/listing/check/" +
                            auth.userId +
                            "/" +
                            listing.id,
                        {
                            headers: {
                                Authorization: `Bearer ${auth.token}`,
                            },
                        }
                    );
                    // console.log(response.data);
                    setIsFavorite(response.data.isListingInFavorites === true);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        checkFavorite();
        
        // ensures isFavorite is updated on reload. Auth loads after component and useEffect runs, resulting in isFavorite being false
    }, [auth.isLoggedIn, auth.userId, auth.token, listing.id]); 

    const handleFavorite = async () => {
        if (!auth.isLoggedIn) {
            // console.log("log in first!");
            return;
        }
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);

        // add or remove from user's favorites
        if (isFavorite) {
            // remove from favorites
            // console.log("removing");
            try {
                await axios.delete(
                    process.env.REACT_APP_BACKEND_URL +
                        "/listing/" +
                        auth.userId +
                        "/" +
                        listing.id,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    }
                );
            } catch (err) {
                console.log(err);
            }
        } else {
            // add to favorites
            try {
                // console.log(listing.id);
                await axios.patch(
                    process.env.REACT_APP_BACKEND_URL + "/listing/save",
                    {
                        userId: auth.userId,
                        listingId: listing.id,
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
            {!auth.isLoggedIn && <Toast message="Sign up or log in to save this listing!" />}
            <div className="listing bg-2">
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
                    {/* <h2>{listing.title}</h2> */}
                    <h3>{`$${listing.price || NO_INFO}`}</h3>
                    <h4>{streetAddress || NO_INFO}</h4>
                    <h4>{cityState || NO_INFO}</h4>
                    <h4>
                        {`${
                            listing.description.beds ||
                            listing.description.beds_min ||
                            listing.description.beds_max
                        } bed, ${
                            listing.description.baths ||
                            listing.description.baths_min ||
                            listing.description.baths_max
                        } Bath`}
                    </h4>
                    <h4>
                        {listing.description.sqft ||
                            listing.description.sqft_min ||
                            listing.description.sqft_max ||
                            NO_INFO}{" "}
                        square feet
                    </h4>
                    <div className="mapContainer">
                        <Map
                            center={{
                                lat: address.coordinate.lat,
                                lng: address.coordinate.lon,
                            }}
                            zoom={10}
                        />
                    </div>
                    <hr />
                    <p>More information</p>
                    <ul>
                        {listing.tags.map((tag, index) => {
                            const formattedTag = tag.replace(/_/g, " "); // Replace underscores with spaces
                            return <li key={index}>{formattedTag}</li>;
                        })}
                    </ul>
                    <a
                        href={listing.contact}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact hl-1"
                    >
                        Visit the Complete Listing
                    </a>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Listing;
