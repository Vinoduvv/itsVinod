var express = require('express');
var router = express.Router();

var User = require('../models/User.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register', function(req, res, next) {

var data = {};
data.Username = req.body.Username;
data.Password = req.body.Password;


console.log(data);

console.log('saving');

console.log(User);

User.create(data,function(err,doc) {

if(err)
{
res.send('Someting went wrong');
}
else
{
console.log('saved');
return res.render('index', { title: 'MEAN Todo!' });
}
});

});



module.exports = router;
