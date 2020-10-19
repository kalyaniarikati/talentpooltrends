const express = require('express');
const router = express.Router();

const axios = require('axios');
// const URL=require('url').URL;
const chalk = require('chalk');

// Configs
const { ensureAuthenticated } = require('../config/auth');
const config= require('../config/keys')

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
};

router.get('/jobs', ensureAuthenticated, (req, res) => {
    console.log("hit")
    // console.dir(req.path)
    //  const search='javascript';
    // const location='sydney';
    // const country = 'au';

    const {search, location, country = 'au'}= req.query;

    const targetURL = `${config.BASE_URL}/${country.toLowerCase()}/${config.BASE_PARAMS}&app_id=${config.APP_ID}&app_key=${config.API_KEY}&what=${search}&where=${location}`;
    // const targetURL = 'http://api.adzuna.com/v1/api/jobs/au/search/1?app_id=85ff9cc6&app_key=e10e6ca5ef1d3a1972e86d1aedd41ea8&results_per_page=20&what=javascript%20developer&content-type=application/json';
    // console.log(targetURL)
    if (req.method === 'GET') {
        console.log(chalk.green(`Proxy GET request to : ${targetURL}`));
        axios.get(targetURL)
          .then(response => {
            // res.writeHead(200, headers);
            // res.redirect(200, '/dashboard');
            res.send({data: JSON.stringify(response.data.results[0].location)})
            // res.end(JSON.stringify(response.data));
          })
          .catch(err => {
            console.log(chalk.red(err));
            // res.writeHead(500, headers);
            res.send(JSON.stringify(err));
          });
      } 
})

module.exports= router;
