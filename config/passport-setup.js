const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { CLIENT_ID, CLIENT_SECRET } = require('./SECRETS').google;
const User = require('../models/userModel');

passport.serializeUser((user, done) => {
  done(null, user.id);
});  // takes the user's unique identifier & makes it amenable to be stored in a cookie, a cookie will allow us to auth the user in further requests.

passport.deserializeUser(async (id, done) => {  // This takes the cookie and checks if the user exits in the db, attaches the user obj to the req obj in the route handler
  let user = await User.findById(id)
  done(null, user);
});

passport.use(new GoogleStrategy({
  // options for the google strategy
  callbackURL: '/auth/google/redirect',  // the url where google sends us back when a successfull login is achieved
  clientID: CLIENT_ID,  // obtained from the googel developer console.
  clientSecret: CLIENT_SECRET,  // obtained from the google developer console
  }, async (accessToken, refreshToken, profile, done) => {
    // passport callback function
    
    // accessToken for reaccessing the google db for changing things
    // refereshToken is for refreshing the accestoken
    // profile is the data that comes from google
    // done is next()
    // console.log(profile);

    // check if user already exists in our db
    let user = await User.findOne({googleId: profile.id});
    if (user) {
      // already have the user
      // console.log("user already exsits: ", user);
      done(null, user);
    } else {
      let newUser = await User.create({
        username: profile.displayName,
        googleId: profile.id
      });
      // console.log("newUser: ", newUser);
      done(null, newUser);
    }
  })
);