const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const cookieSession = require('cookie-session');
const passportSetup = require('./config/passport-setup');  // we must import this file here so that passport can work
const mongoose = require('mongoose');
const { dbURI } = require('./config/SECRETS').mongodb;
const { cookieKey } = require('./config/SECRETS').session
const passport = require('passport');

const app = express();

// setting up cookie-session, encrypts the id inside the cookie recvd from serializeUser, only happens once the user is logged in
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,  // one day in milliseconds
  keys: [cookieKey]    // encrypts the id inside the cookie
}));  

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connecting to MongoDB
mongoose.connect(dbURI, () => {
  console.log('connected to MongoDB');
})

// set up view engine
app.set('view engine', 'ejs')

// Set up auth routes
app.use('/auth', authRoutes)

// set up profile routes
app.use('/profile', profileRoutes);

// Create home route  
app.get('/', (req, res) => {
  res.render('home');
})


app.listen(3000, () => {
  console.log('App now listening on port 3000')
})