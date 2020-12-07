const express = require('express');
const router = express.Router();

const {getJobs, getSearch} = require('../controller/jobs_controller');
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios');

router.post('/jobs', ensureAuthenticated, getJobs)
router.post('/searchBy',  getSearch )

module.exports= router;
