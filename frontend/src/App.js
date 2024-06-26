import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import { useAuth } from "./Hooks/auth-hook";
import { AuthContext } from "./Context/auth-context";

import MainNavigation from "./Navigation/MainNavigation";
import Search from "./Search/Search";
import LoadingSpinner from "./UIElements/LoadingSpinner";
import ResultsList from "./Search/ResultsList";
import About from "./About/About";
import Authenticate from "./Authenticate/Authenticate";
import Listing from "./Search/Listing";
import Favories from "./Favorites/Favorites";
import Account from "./Account/Account";

// App.js contains routes and navigation
const App = () => {
    const { token, login, logout, userId } = useAuth();

    const routes = (
        <Routes>
            {/* to only show page` when URL is exact, else it will show any page that starts with / */}
            <Route path="/" element={<Search />} />
            <Route path="/results" element={<ResultsList />} />
            {/* Temp */}
            <Route path="/favorites" element={<Favories />} />
            <Route path="/listing/:lid" element={<Listing />} />
            <Route path="/about" element={<About />} />
            <Route path="/authenticate" element={<Authenticate />} />
            <Route path="/account" element={<Account />} />
            {/* if path not found, redirect to path / */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                login: login,
                logout: logout,
            }}
        >
            <Router>
                <MainNavigation />
                {/* Routes prevents cascade when path matches route, useful for pages */}
                <main>
                    <Suspense
                        fallback={
                            <div className="center">
                                <LoadingSpinner />
                            </div>
                        }
                    >
                        {routes}
                    </Suspense>
                </main>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;

// Frontend
// Create a search page :)
// Login page :)
// Search results page :)
// Refactor search button to redirect to resultslist :)
// Individual result page :)
// Add map to individual result page :)
// Setup mongodb database :)
// Backend
// Create API :)
// Create routes :)
// Create controllers for CRUD :)
// Create models :)
// Create middleware :)
// Create error handling :)
// Create authentication :)
// Create authorization :)
// Set up US Real Estate Listings API
// Integrate
// Mock integrate :)
// Add favorite functionality to listing page
// Backend :)
// Integrate
    // Mock data to call backend api
    // Use actual 3rd party api and push data to backend
    // create a cleaner method to delete db data eventually?? maybe
// Add authorization on backend and frontend 
    // Backend
    // Frontend
