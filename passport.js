const passport = require('passport');
const { Strategy } = require('passport-discord');

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})

passport.use(new Strategy({
    clientID: "899711568370102412",
    clientSecret: "Dtjbwe2PhDeH_VaiFNticAJWenQ-hU8-",
    callbackURL: "https://localhost:3000/login",
    scope: ["identify"]
}, (accesstoken, refreshtoken, profile, cb) => {
    process.nextTick(() => {
        return cb(null, profile)
    })
}))

module.exports = passport