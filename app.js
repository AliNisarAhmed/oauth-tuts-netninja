const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');  // we must import this file here so that passport can work
const mongoose = require('mongoose');
const { dbURI } = require('./config/SECRETS').mongodb;

const app = express();

// COnnecting to MongoDB
mongoose.connect(dbURI, () => {
  console.log('connected to MongoDB');
})

// set up view engine
app.set('view engine', 'ejs')

// Set up routes
app.use('/auth', authRoutes)

// Create home route  
app.get('/', (req, res) => {
  res.render('home');
})


app.listen(3000, () => {
  console.log('App now listening on port 3000')
})