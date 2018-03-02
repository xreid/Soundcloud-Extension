let express = require('express');
let router = express.Router();
let soundcloud = require('node-soundcloud');

let id = ''; // assign your client id
let secret = ''; // asign your client secret
let uri = '';

/* GET home page. */
router.get('/', function(req, res, next) {
  soundcloud.init({id, secret, uri});
  
  soundcloud.get('/resolve?url=http://soundcloud.com/soulection', function(error, user) {
    if (error) {
      throw error;
    } else {
      console.log('user retrieved:', user);
    }
  });

  res.render('index');
});

module.exports = router;
