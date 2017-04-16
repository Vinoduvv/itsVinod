var express = require('express');
var router = express.Router();

var User = require('../models/User.js');

var auth = function(req, res, next) {
	//###############  console.log(req.session);
  if (req.authenticated)
    return next();
  else
    return res.render('login');
};


/* GET home page. */
router.get('/',auth, function(req, res, next) {
  res.render('index', { title: 'MEAN Todo!' });
});


router.post('/login', function(req, res, next) {
 
 console.log('login');
 
 console.log(req.body);
 
 
   var userData={
  'Username': req.body.Username,
  'Password': req.body.Password
  };
 
  User.findOne(userData, function(err, doc) {
	if (err) {
		return err
	}
	else if(doc){
    req.authenticated = true;
	console.log(""+req.body.username+" authenticated.Login success!");
	res.redirect('/');	
	}	
	

});

});



router.get('/logout', function (req, res) {
  

  req.authenticated=null;
  res.render('index', {title:"MEAN Todo!"});

});


module.exports = router;
