import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";

import "./Listing.css";
import NavigateBack from "../UIElements/NavigateBack";
import Map from "../UIElements/Map";

const DUMMY_DESCRIPTION = `Hello world, this is where the listing description will go.
I will add links to where the thingy was pulled from.
Discover suburban bliss at 350 AMBAR Way. This luxurious
3-bedroom, 2.5-bathroom 2,590 Sq. Ft Single Family Home is
nestled on a sprawling 10,735 Sq. Ft lot with an exquisite
backyard, & ideally situated on a serene, quiet, wide
tree-lined street in the heart of Central Menlo Park. The
home offers a seamless layout designed for both relaxation
and entertainment. The 3 bedrooms provide ample space for
privacy and comfort, while the open living areas invite the
flow of natural light and a sense of togetherness.Everything
filters out through to the beautiful backyard patio which
can be accessed through multiple french doors. Home boasts a
large kitchen with an island & pantry. The 3rd bedroom has
custom built-in cabinets ideal for working from home. Enjoy
your master bedroom suite with a nice size bathroom &
closets. Utilize the attached large 2 car garage which has
plenty of additional storage. Tucked away on a peaceful
street of many exceptionally maintained homes on large lots,
you'll find yourself surrounded by a harmonious blend of the
best of Silicon Valley living. Make the most of the
highly-regarded Menlo Park school district. In this esteemed
neighborhood, you'll find yourself part of a community that
values quality education and excellence. Indulge in the
convenience of being within walking distance to parks and
shopping. Biking to Stanford University, Palo Alto or Sand
Hill Rd. is also right at your doorstep. Envision creating
your very own sanctuary where memories are made, whether
it's entertaining guests or simply unwinding beneath the
open sky in your gorgeous private manicured backyard.
Explore the remarkable lifestyle, renowned schools, sense of
community, and convenience that embodies the essence of
Central Menlo Park Living. Contact us today to embark on
this exciting journey towards experiencing the allure of
this amazing area! Owner will pay for gardener. Tenant is
responsible for all other desired & required utilities
including water, garbage, PGE, Phone, Internet, Etc.`;

const HEART_ICON_FALSE = "https://www.svgrepo.com/show/404845/black-heart.svg";
const HEART_ICON_TRUE = "https://www.svgrepo.com/show/407319/red-heart.svg";
const NO_INFO = "N/A";

const Listing = () => {
    const location = useLocation();
    const listing = location.state;
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavorite = () => {
        setIsFavorite(prevIsFavorite => !prevIsFavorite);
    };

    const handleApply = () => {
        console.log("Leaving website...");
    }

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
                            src={photo}
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
                <h4>{listing.address || NO_INFO}</h4>
                <h4>
                    {`${listing.beds || NO_INFO} bedrooms, ${listing.baths || NO_INFO} bathrooms`}
                </h4>
                <h4>{listing.sqft || NO_INFO} square feet</h4>
                <div className="mapContainer">
                    {/* <Map center={listing.coordinates} zoom={16} /> */}
                    <Map center={{lat: -34.397, lng: 150.644}} zoom={16} />
                </div>
                <hr />
                <p>{DUMMY_DESCRIPTION}</p>
                <button onClick={handleApply}>Apply on the Listing Site</button>
            </div>
        </div>
        </React.Fragment>
    );
};

export default Listing;
