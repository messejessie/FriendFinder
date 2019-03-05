// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================let path = require("path");let friendData = require("../data/friends");

// Pull in required dependencies
var path = require('path');

// Import the list of friend entries

var friendData = require('../data/friends.js');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
    app.get("/api", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });


    app.get("/api/friends", function (req, res) {
        res.json(friendData);
        console.log("I am here");
    });


    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a survay request... this data is then sent to the server...
    // Then the server saves the data to the friendArray array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a friend or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware
     
      
    });

    // ---------------------------------------------------------------------------

};
