// node core modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// my modules
const listingRoutes = require("./routes/listing-routes.js");
const userRoutes = require("./routes/user-routes");

// script code
const app = express();

app.use(bodyParser.json());

// middleware for CORS
app.use((req, res, next) => {
    // cant lock down API access, e.g. Postman still works
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    
    next();
});

// import logic from routes,
// will only route if the path starts with /api/user or /api/listing
app.use("/api/listing", listingRoutes);
app.use("/api/user", userRoutes);

// middleware handling all requests that dont match any routes
app.use((req, res, next) => {
    throw new Error("Could not find this route.");
});


// connects to "hasta" db
const url =
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rxibjsv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
    .connect(url)
    .then(() => {
        app.listen(process.env.PORT || 5000);
    })
    .catch((err) => {
        console.log(err);
    });


// Backend
    // Create API
    // Create routes :)
    // Create controllers for CRUD
    // Create models :)
    // Create middleware :)
    // Create error handling
    // Create authentication :)
    // Create authorization