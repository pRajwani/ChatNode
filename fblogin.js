var config = require("./config");
var FacebookStrategy = require("passport-facebook").Strategy;
var passport = require("passport");
var User = require('./models/User');

passport.serializeUser((user,done)=>{
    return done(null,user)
})
passport.deserializeUser((id,done)=>{
    return done(null,id)
})

// passport.use(new FacebookTokenStrategy({
//     clientID: config.facebook.clientId,
//     clientSecret: config.facebook.clientSecret,
//     callbackURL:'https://localhost:3443/fbcallback'
// }, (accessToken, refreshToken, profile, done) => {
//     console.log("Facebook Strategy")
//     console.log(accessToken)
//     console.log(profile);
    
// }
// ))

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret,
    callbackURL: "https://localhost:3443/fbcallback",
    profileFields: ["id", "name", "emails"]
  },
  function(accessToken, refreshToken, profile, done) {

    User.findOne({username: profile.id}, (err, user) => {
        if(err) {
            return done(err, false);
        }
        else if(!err && user !== null) {
            return done(null, user);
        }
        else {
            user = new User({username: profile.id});
            user.name = profile.name.givenName+' '+profile.name.familyName;
            
            user.save((err, user) => {
                if(err)
                return done(err, false);
                else
                return done(null, user);
            })
        }
    });

    //return cb(null, user);
  }
));
