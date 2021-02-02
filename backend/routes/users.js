const router = require('express').Router();
let User = require('../models/user.model');

/*This is the first route so this is the first end point that handles incoming HTTP GET Request
on the /users URL path*/
router.route('/').get((req, res) => {

    /*.find is a mongoose method will get all the users list from MongoDB Atlas database
     /users/*/
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*This is the second route so this is the second end point that handles incoming HTTP POST Request
on the /users URL path*/

router.route('/add').post((req, res) => {
  const username = req.body.username;

  //Instance of new User is created.
  const newUser = new User({username});

  //newUser will be saved to database using .save method.
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;