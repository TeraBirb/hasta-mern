import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import MainNavigation from "./Navigation/MainNavigation";
import Search from "./Search/Search";
import LoadingSpinner from "./UIElements/LoadingSpinner";
import ResultsList from "./Search/ResultsList";
import About from "./About/About";
import Authenticate from "./Authenticate/Authenticate";
import Listing from "./Search/Listing";

// App.js contains routes and navigation
const App = () => {
    const routes = (
        <Routes>
            {/* to only show page` when URL is exact, else it will show any page that starts with / */}
            <Route path="/" element={<Search />} />
            <Route path="/results" element={<ResultsList />} />
            {/* Temp */}
            <Route path="/favorites" element={<ResultsList />} />
            <Route path="/listing/:lid" element={<Listing />} />
            <Route path="/about" element={<About />} />
            <Route path="/authenticate" element={<Authenticate />} />
            {/* if path not found, redirect to path / */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );

    return (
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
    );
};

export default App;

// Frontend
    // Create a search page :)
    // Login page :)
    // Search results page :)
    // Refactor search button to redirect to resultslist :)
    // Individual result page :)
// Setup mongodb database
// Backend
    // Create API
    // Create routes
    // Create controllers for CRUD
    // Create models
    // Create middleware
    // Create error handling
    // Create authentication
    // Create authorization
// Integrate