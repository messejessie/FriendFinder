// ===============================================================================
// DATA
// Below data will hold all of the reserved tables.
// Initially we just set it equal to a "dummy" friend.
// But you could have it be an empty array as well.
// ===============================================================================

var friendArray = [
    {
        "name":"Ahmed",
        "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
        "scores":[
            5,
            1,
            4,
            4,
            5,
            1,
            2,
            5,
            4,
            1
          ]
      },
      {
        "name":"Jess",
        "photo":"https://www.facebook.com/photo.php?fbid=2751182508441212&set=a.1380253412200802&type=3&theater",
        "scores":[
            3,
            2,
            1,
            1,
            5,
            5,
            4,
            3,
            4,
            1
          ]
      }
    ];
  // Note how we export the array. This makes it accessible to other files using require.
  module.exports = friendArray;
  