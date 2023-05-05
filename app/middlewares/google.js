import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();

const emails = ["saranicky2004@gmail.com"];


passport.use(
    "auth-google",
    new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:10000/auth/google"
  },
  function(accessToken, refreshToken, profile, cb) {

    return cb(null, profile);
  }
));