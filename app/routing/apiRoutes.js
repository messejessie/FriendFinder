// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================let path = require("path");let friendData = require("../data/friendData");

// Pull in required dependencies
let path = require('path');

// Import the list of friend entries

let friendData = require('../data/friendData.js');

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


    app.get("/api/friendData", function (req, res) {
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

    app.post("/api/friendData", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a friend or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware
        console.log("i hate JS")
        let userResponse = req.body
        let diff = [];
        //console.log(friendData)
        //res.json(true);
        let arrayData = friendData.scores
        //computing friendData 
        let matchfriend = "";
        let matchImage = "";
        let totaldiff = 10000
        //4 loop needed fo examination of friendData 
        for (let i = 0; i < arrayData.length; i++) {
            console.log(i);
            //let diff = 0;
            //apparently for loop needed for User response / j
            for (let j = 0; j < userResponse.length; j++) {

                diff += Math.abs(userResponse[j].scores[j] - arrayData[j]);

            };

            if (diff < totaldiff) {
                totaldiff = diff;
                matchFriend = friendData[i].name;
                matchImage = friendData[i].photo;


                //push new user:
                friendData.push(friendData);
                //send response
                res.json({ status: 'OK', matchFriend: matchfriend, matchImage: matchImage });
            }

        };

    });

    // ---------------------------------------------------------------------------

};
