let express = require('express');
let router = express.Router();
let soundcloud = require('node-soundcloud');
let converter = require('json-2-csv');
let fs = require('fs');

let id = ''; // assign your client id
let secret = ''; // asign your secret
let uri = ''; // redirect uri (not used)

/* GET home page. */
router.get('/', function(req, res, next) {
  soundcloud.init({id, secret, uri});
  let download = req.query.download;
  let username = req.query.username; // username passed from find user button
  let style = "display:none"; // style for download button
  let userCsv;
  let trackCsv;

  switch (download) {
    case 'user':
      res.download('./public/user.csv');
      break;
    case 'tracks':
      res.download('./public/tracks.csv');
      break;
  }

  if (username != undefined) {
    getUser(username, res, (user, res) => {
      converter.json2csv([user], (error, csv) => {
        userCsv = csv;
        getTracks(user.id, res, (tracks, res) => {
          converter.json2csv(tracks, (error, csv) => {
            trackCsv = csv;
            fs.writeFile('./public/user.csv', userCsv, (error) => {
              console.log(error);
            });
            fs.writeFile('./public/tracks.csv', trackCsv, (error) => {
              console.log(error);
            });
            res.render('index', {user, tracks, style: "display:inline"});
          });
        });
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
      callback(tracks, res);
    }
  });
}

module.exports = router;
