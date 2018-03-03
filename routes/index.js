let express = require('express');
let router = express.Router();
let soundcloud = require('node-soundcloud');

let id = ''; // assign your client id
let secret = ''; // asign your secret
let uri = ''; // redirect uri (not used)

/* GET home page. */
router.get('/', function(req, res, next) {
  soundcloud.init({id, secret, uri});
  let username = req.query.username; // username passed from find user button
  let style = "display:none"; // style for download button

  if (username != undefined) {
    getUser(username, res, (user, res) => {
      console.log(user.id);
      getTracks(user.id, res, (tracks, res) => {
        res.render('index', {user, style: "display:inline"});        
      });
    });
  } else {
    res.render('index', {style});      
  }
});

/*
** Get user by username
*/
function getUser(username, res, callback) {
  soundcloud.get(`/resolve?url=http://soundcloud.com/${username}`, function(error, user) {
      if (error) {
        console.log(error); // TODO: should show alert
      } else {
        console.log(user.permalink);
        callback(user, res);
      }
    });
}

/*
** Get tracks by user id
*/
function getTracks(userId, res, callback) {
  soundcloud.get(`/users/${userId}/tracks`, function(error, tracks) {
    if (error) {
      console.log(error); // TODO: should show alert
    } else {
      console.log(tracks);
      callback(tracks, res);
    }
  });
}

module.exports = router;
