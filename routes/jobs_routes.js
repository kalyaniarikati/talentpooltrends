const express = require('express');
const router = express.Router();

const {getJobs, getSearch} = require('../controller/jobs_controller');
const { ensureAuthenticated } = require('../config/auth');
const config= require('../config/keys')
const axios = require('axios');
const chalk = require('chalk');

router.post('/jobs', ensureAuthenticated, getJobs)
router.post('/searchBy',  getSearch )

module.exports= router;
