const express = require('express');
const router = express.Router();
const axios = require('axios');
const chalk = require('chalk');

// Configs
const config= require('../config/keys')

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
};

const getJobs= (req, res) => {
    console.log("hit")

    const search=req.body.position;
    const location=req.body.location;
    const country='au';
    // destructuing request params
    // const {search, location, country = 'au'}= req.body;
  console.log(search, location, country)
    const targetURL = `${config.BASE_URL}/${country.toLowerCase()}/${config.BASE_PARAMS}&app_id=${config.APP_ID}&app_key=${config.API_KEY}&what=${search}&where=${location}`;
    
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
}

const getSearch= (req, res) =>{
  const pos=req.body.position;
  const loc=req.body.location;

  console.log(req.method);

  const search=req.body.position;
    const location=req.body.location;
    const country='au';
    // destructuing request params
    // const {search, location, country = 'au'}= req.body;
  // console.log(search, location, country)
    const targetURL = `${config.BASE_URL}/${country.toLowerCase()}/${config.BASE_PARAMS}&app_id=${config.APP_ID}&app_key=${config.API_KEY}&what=${search}&where=${location}`;
    let set ={}

    // let set = (JSON.stringify(({search, location, targetURL}),null,' \t'));
    if (req.method === 'POST') {
      console.log(chalk.green(`Proxy GET request to : ${targetURL}`));
      axios.get(targetURL)
        .then(response => {
          // res.writeHead(200, headers);
          // res.redirect(200, '/dashboard');
          // set = ({data: JSON.stringify(response.data)})
          set = response.data;
          // console.log(set)
          // res.render('../views/dashboard', {final: {s: (set), msg: req.flash('success_msg', 'You got there')}})
          // res.end(JSON.stringify(response.data));
        })
        .catch(err => {
          console.log(chalk.red(err));
          // res.writeHead(500, headers);
          res.send(JSON.stringify(err));
        });
    } 
  // res.render('dashboard', {final: {s: set, msg: req.flash('success_msg', 'You got there')}})
  console.log(JSON.stringify(set))
  res.render('dashboard', {final: JSON.stringify(set)})
}

module.exports= {
  getJobs,
  getSearch
};
