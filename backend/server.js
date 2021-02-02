const express = require('express');
const cors = require('cors');
//Mongoose helps us to connect to our MongoDB Database
const mongoose = require('mongoose');
//Environment Variable
require('dotenv').config();

//Express Server
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//uri - database uri which we will get from MongoDB Atlas Dashboard

/*So for the connection string to work we have to set environment
 variable ATLAS_URI*/
const uri = process.env.ATLAS_URI;
/*useNewUrlParser are flags. Put these things everything on order
to deal with some of the updates to MongoDB*/
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//It starts the server and listening on certain port.
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});