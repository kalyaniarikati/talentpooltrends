const express = require ('express');
const router = express.Router ();
const axios = require ('axios');
const chalk = require ('chalk');

// data from files
const fs = require('fs')

// Configs
const config = require ('../config/keys');

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
};

function getJobs() {
  console.log ('hit');
 // seekAus
 let seekAusData = fs.readFileSync('./data/seek_aus.json', 'utf-8')
 let parsedSeekAus= JSON.parse(seekAusData)

  // indeedAus
  let indeedAusData = fs.readFileSync('./data/indeed_aus.json', 'utf-8')
  let parsedIndeedAus = JSON.parse(indeedAusData)

  // indeedUk
  let indeedUkData = fs.readFileSync('./data/indeed_uk.json', 'utf-8')
  let parsedIndeedUk = JSON.parse(indeedUkData)

  // indeedUsa
  let indeedUsaData = fs.readFileSync('./data/indeed_usa.json', 'utf-8')
  let parsedIndeedUsa = JSON.parse(indeedUsaData)

  return {parsedSeekAus, parsedIndeedAus, parsedIndeedUk, parsedIndeedUsa}
};

const getSearch = (req, res) => {
  const pos = req.body.position;
  const loc = req.body.location;

  console.log (req.method);
  let {parsedSeekAus, parsedIndeedAus, parsedIndeedUk, parsedIndeedUsa} = getJobs();
  const search = req.body.position;
  const location = req.body.location;
  const country = 'au';

  const targetURL = `${config.BASE_URL}/${country.toLowerCase ()}/${config.BASE_PARAMS}&app_id=${config.APP_ID}&app_key=${config.API_KEY}&what=${search}&where=${location}`;
  let set = {};

  if (req.method === 'POST') {
    console.log (chalk.green (`Proxy GET request to : ${targetURL}`));
    axios
      .get (targetURL)
      .then (response => {
        set = response.data;
        console.log (set.results[0], parsedSeekAus.jobs.length, parsedIndeedUk.jobs.length );

        res.render ('dashboard', {
          set: set.results,
          tech: search,
          parsedSeekAus, parsedIndeedAus, parsedIndeedUk, parsedIndeedUsa
        });
      })
      .catch (err => {
        console.log (chalk.red (err));
        res.send (JSON.stringify (err));
      });
  }
};

module.exports = {
  getJobs,
  getSearch,
};
