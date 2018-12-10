const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { CLIENT_ID, CLIENT_SECRET } = require('./SECRETS').google;
const User = require('../models/userModel');

passport.use(new GoogleStrategy({
  // options for the google strategy
  callbackURL: '/auth/google/redirect',  // the url where google sends us back when a successfull login is achieved
  clientID: CLIENT_ID,  // obtained from the googel developer console.
  clientSecret: CLIENT_SECRET,  // obtained from the google developer console
  }, async (accessToken, refreshToken, profile, done) => {
    // passport callback function
    
    // accessToken for reaccessing the google db for changing things
    // refereshToekn is for refreshing the accestoken
    // profile is the data that comes from google
    // done is next()
    // console.log(profile);

    // check if user already exists in our db
    let user = await User.findOne({googleId: profile.id});
    if (user) {
      // already have the user
      console.log("user already exsits: ", user);
    } else {
      let newUser = await User.create({
        username: profile.displayName,
        googleId: profile.id
      });
      console.log("newUser: ", newUser);
    }
  })
);