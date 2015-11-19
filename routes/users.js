var express = require('express');
var router = express.Router();
var db = require('../lib/db');

/* Verify user. */
router.post('/verify', function(req, res, next) {
  db.get(req.body.user, function(err, users){
    if(err)
      throw err;

    if(users.length !== 1 ){
      res.send(401);
    }else{
      req.session.team = users.team;
      req.session.id = users._id;
      req.session.save();
      res.send({error:false});
    }

  });
});

/*Create a new user*/
router.post('/', function(req, res, next) {
  db.insert(req.body.user, function(err, user){
    if(err)
      throw err;
    res.send(user);
  });
});

module.exports = router;
