const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app=express();
const PORT = process.env.PORT || 5678;

// Passport config
require('./config/passport')(passport);

// DB
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log("Mongo connected"))
.catch((err) => console.log(err))

// handlebarss
app.engine('handlebars', exphbs({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'handlebars',
    //new configuration parameter
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');

// middleware bodyparser
app.use(express.urlencoded({extended: false}))

// Express middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//   connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/api', require('./routes/jobs'))

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})