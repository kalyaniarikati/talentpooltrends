const express = require ('express');
const router = express.Router ();
const axios = require ('axios');
const chalk = require ('chalk');

// data from files
const fs = require('fs')

// Configs
// const config = require ('../config/keys');
const APP_ID = require ('../config/keys').APP_ID || APP_ID;
const API_KEY = require ('../config/keys').API_KEY || API_KEY;
const BASE_URL = require ('../config/keys').BASE_URL || BASE_URL;
const BASE_PARAMS = require ('../config/keys').BASE_PARAMS || BASE_PARAMS;


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
        // console.log (set.results[0], parsedSeekAus.jobs.length, parsedIndeedUk.jobs.length );

        let syd=set.results.filter((job) => { return (job.location.display_name.toLowerCase()).includes('sydney') || (job.location.display_name.toLowerCase()).includes('new south wales') || (job.location.display_name.toLowerCase()).includes('newsouthwales') || (job.location.display_name.toLowerCase()).includes('nsw') || (job.location.display_name.toLowerCase()).includes('camberwell') || (job.location.display_name.toLowerCase()).includes('canberra')});


        let mel=set.results.filter((job) => {return (job.location.display_name.toLowerCase()).includes('melbourne') || (job.location.display_name.toLowerCase()).includes('victoria')});


        let bris=set.results.filter((job) =>{return (job.location.display_name.toLowerCase()).includes('brisbane') || (job.location.display_name.toLowerCase()).includes('queensland') ||  (job.location.display_name.toLowerCase()).includes('adelaide')});
        
        console.log("**********************************************")
        
console.log(set.results[1].location.display_name.toLowerCase())
console.log(syd.length, mel.length, bris.length, set.results.length)
        res.render ('dashboard', {
          set: new Set(set.results),
          tech: search,
          adFrom: set.__CLASS__.split(":", 1),
          parsedSeekAus, parsedIndeedAus, parsedIndeedUk, parsedIndeedUsa,
          syd, mel, bris
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
