const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const app = express();

const session = require('express-session');
const passport = require('./passport');

// Settings
app.set('port', process.env.PORT || 3000);

// Engine

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "logindiscord",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
const auth = require('./auth');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs({
    extname: ".hbs"
}));
app.set('view engine', '.hbs');

// Static Files
app.set(express.static("public"));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World')
});

app.use("/login", passport.authenticate("discord", {failureRedirect: '/'}) , (req, res) => {
    res.redirect('/perfil')
});

app.use("/perfil", auth,(req, res) => {
    res.json({
        datos_discord: req.user
    })
});

// Listening
app.listen(app.get('port'), () => {
    console.log('Server on port:', app.get('port'))
});