const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
const User = require('../model/User');

// Login page
router.get('/login', (req, res) => res.render("login"));

// Login page
router.get('/register', (req, res) => res.render("register"));

// Register handle
router.post('/register', (req, res) => {
    console.log(req.body)
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // check required fields
    if(!name ||!email || !password ||!password2) {
        errors.push({msg: "Please fill all the fields"});
        console.log(errors)
    }
    
    // check passwords match
    if(password !== password2) {
        errors.push({msg: "Passwords do not match"});
    }

    // check password length
    if(password.length < 6) {
        errors.push({msg: "Password should be atleast 6 chars"});
    }
    if (errors.length > 0) {
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else{
        // Validation passed
        User.findOne({email: email})
        .then((user) => {
            if(user){
                // User exists
                errors.push({msg: "Email is already registered"})
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name, 
                    email, 
                    password
                });

                // Hash password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // Set pwd to hashed
                        newUser.password = hash;
                        console.log(newUser)
                        req.flash('success_msg', 'You are now registered and can login')
                        newUser.save()
                        .then((user) => {
                            res.redirect('/users/login');
                        })
                        .catch((err) => console.log(err))
                }))
            }
        });
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { 
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true 
    })(req, res, next);
});

// Logout Handle

router.get('/logout', (req, res, next) => {
    // Passport logout method
    req.logout();
    req.flash('success_msg', "You are logged out");
    res.redirect('/users/login')
})

module.exports = router;