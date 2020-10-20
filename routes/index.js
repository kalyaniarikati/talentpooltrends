const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const { loadData } = require('../config/data');

// Welcome Page
router.get('/', (req, res) => {
    res.render('welcome');
    loadData();
});

// Dashboard
router.get('/dashboard',ensureAuthenticated, (req, res) => res.render('dashboard', {name: req.user.name}));


module.exports = router;