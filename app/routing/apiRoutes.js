// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================let path = require("path");let friendData = require("../data/friendData");

// Pull in required dependencies
let path = require('path');

// Import the list of friend entries

let friendsData = require('../data/friends.js');

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
        res.json(friendsData);
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
        
        var totalDifference = 0;
        //Object to hold the best match
        var bestMatch = {
          name: "",
          photo: "",
          friendDifference: 1000
        };
    
        // Here we take the result of the user's survey POST and parse it.
        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;
        // Converting the users score to a number (Instead of string)
        var userScoresNum = userScores.map(function (item) {
          return parseInt(item, 10);
        });
    
        userData = {
          "name": req.body.name,
          "photo": req.body.photo,
          "scores": userScoresNum
        };
        console.log(userData);
    
    
        console.log("Name: " + userName);
        console.log("User Score " + userScores);
    
        console.log('userScoreNum outside function ' + userScoresNum);
    
        // Converting the users score to a sum number (Adds up all the numbers in array)
        //
        var userScoresSum = userScoresNum.reduce((tot, amt) => tot + amt, 0);
    
        console.log("Sum of users score " + userScoresSum);
        console.log("Best match friend diff " + bestMatch.friendDifference);
    
    
        console.log("+++++++=================++++++++++");
    
        // Loop through all the friend possibilities in the database. 
        for (var i = 0; i < friendsData.length; i++) {
    
          console.log(friendsData[i].Name);
          totalDifference = 0;
          console.log("Total Diff " + totalDifference);
          console.log("Best match friend diff " + bestMatch.friendDifference);
    
          var friendScoreSum = friendsData[i].scores.reduce((tot, amt) => tot + amt, 0);
          console.log("Total friend score " + friendScoreSum);
          totalDifference += Math.abs(userScoresSum - friendScoreSum);
          console.log(" -------------------> " + totalDifference);
    
          // If the sum of differences is less then the differences of the current "best match"
          if (totalDifference <= bestMatch.friendDifference) {
    
            // Reset the bestMatch to be the new friend. 
            bestMatch.name = friendsData[i].name;
            bestMatch.photo = friendsData[i].photo;
            bestMatch.friendDifference = totalDifference;
            // }
    
          }
          console.log(totalDifference + " Total Difference");
    
        }
        console.log(bestMatch);
        // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
        // the database will always return that the user is the user's best friend).
        friendsData.push(userData);
        console.log("New User added");
        console.log(userData);
        // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page. 
        res.json(bestMatch);
        console.log(bestMatch)
    
      });

    

    // ---------------------------------------------------------------------------

};
