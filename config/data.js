// import jobs data models
const IndeedAus = require('../model/IndeedAus');
const IndeedUk = require('../model/IndeedUk');
const IndeedUsa = require('../model/IndeedUsa');
const SeekAus = require('../model/SeekAus');

// const fsPromises = require('fs').promises
const fs = require('fs')

async function loadData() {

    // synchronous version
    // seekAus
    // let seekAusData = fs.readFileSync('./data/seek_aus.json', 'utf-8')
    // let parsedSeekAus= JSON.parse(seekAusData)
    //     console.log(parsedSeekAus)
    //     parsedSeekAus.jobs.forEach(job => {
    //         let seekAus = new SeekAus(
    //             {
    //             title: job.title,
    //             company: job.company,
    //             location: job.location,
    //             url: job.url,
    //             blurb: job.blurb
    //         });
    //         console.log(seekAus)
    //         seekAus.save(function(err) {
    //             if (err) return err;
    //         })
    //     })

    // indeedAus
    // let indeedAusData = fs.readFileSync('./data/indeed_aus.json', 'utf-8')
    // let parsedIndeedAus = JSON.parse(indeedAusData)
    //     console.log(parsedIndeedAus)
    //     parsedIndeedAus.jobs.forEach(job => {
    //         let indeedAus = new IndeedAus(
    //             {
    //             title: job.title,
    //             company: job.company,
    //             location: job.location,
    //             url: job.url,
    //             blurb: job.blurb
    //         });
    //         console.log(indeedAus)
    //         indeedAus.save(function(err) {
    //             if (err) return err;
    //         })
    //     })

    // indeedUk
    // let indeedUkData = fs.readFileSync('./data/indeed_uk.json', 'utf-8')
    // let parsedIndeedUk = JSON.parse(indeedUkData)
    //     console.log(parsedIndeedUk)
    //     parsedIndeedUk.jobs.forEach(job => {
    //         let indeedUk = new IndeedUk(
    //             {
    //             title: job.title,
    //             company: job.company,
    //             location: job.location,
    //             url: job.url,
    //             blurb: job.blurb
    //         });
    //         console.log(indeedUk)
    //         indeedUk.save(function(err) {
    //             if (err) return err;
    //         })
    //     })

    // indeedUsa
    // let indeedUsaData = fs.readFileSync('./data/indeed_usa.json', 'utf-8')
    // let parsedIndeedUsa = JSON.parse(indeedUsaData)
    //     console.log(parsedIndeedUsa)
    //     parsedIndeedUsa.jobs.forEach(job => {
    //         let indeedUsa = new IndeedUsa(
    //             {
    //             title: job.title,
    //             company: job.company,
    //             location: job.location,
    //             url: job.url,
    //             blurb: job.blurb
    //         });
    //         console.log(indeedUsa)
    //         indeedUsa.save(function(err) {
    //             if (err) return err;
    //         })
    //     })
    }

    //Async version
    // var parsedIndeedAus;
    // let indeedAusData = await fsPromises.readFile('./data/indeed_aus.json', 'utf-8', (err, data) => {
    //     if (err) {
    //         console.log(err)
    //         return
    //     }
    //     parsedIndeedAus = JSON.parse(data)
    //     console.log(parsedIndeedAus)
    //     parsedIndeedAus.jobs.forEach(job => {
    //         let indeedAus = new IndeedAus(
    //             {
    //             title: job.title,
    //             company: job.company,
    //             location: job.location,
    //             url: job.url,
    //             blurb: job.blurb
    //         });
    //         console.log(indeedAus)
    //         indeedAus.save(function(err) {
    //             if (err) return err;
    //         })
    //     })
    // });
    
    // var parsedIndeedUk;
    // let indeedUkData = await fsPromises.readFile('./data/indeed_uk.json', 'utf-8', (err, data) => {
    //     if (err) {
    //         console.log(err)
    //         return
    //     }
    //     parsedIndeedUk = JSON.parse(data)
    //     console.log(parsedIndeedUk)
    //     parsedIndeedUk.jobs.forEach(job => {
    //         let indeedUk = new IndeedUk(
    //             {
    //             title: job.title,
    //             company: job.company,
    //             location: job.location,
    //             url: job.url,
    //             blurb: job.blurb
    //         });
    //         console.log(indeedUk)
    //         indeedUk.save(function(err) {
    //             if (err) return err;
    //         })
    //     })
    // });
    
    
    // let indeedUsaData = await fsPromises.readFile('./data/indeed_usa.json', 'utf-8', (err, data) => {
    //     if (err) {
    //         console.log(err)
    //         return
    //     }
    //     return indeedUsaData = JSON.parse(data)   
    // });
    
    // let seekAusData = await fsPromises.readFile('./data/seek_aus.json', 'utf-8', (err, data) => {
    //     if (err) {
    //         console.log(err)
    //         return
    //     }
    //     return seekAusData = JSON.parse(data)
    // });


    // console.log(JSON.stringify(indeedAusData.jobs))
    // console.log(parsedIndeedAus)
    //add json data to indeedAus collection
    // parsedIndeedAus.jobs.forEach(job => {
    //     let indeedAus = new IndeedAus(
    //         {
    //         title: job.title,
    //         company: job.company,
    //         location: job.location,
    //         url: job.url,
    //         blurb: job.blurb
    //     });
    //     console.log(indeedAus)
    //     indeedAus.save(function(err) {
    //         if (err) return err;
    //     })
    // })
    //add json data to indeedUk collection
    // indeedUkData.jobs.forEach(job => {
    //     let indeedUk = new IndeedUk({
    //         title: job.title,
    //         company: job.company,
    //         location: job.location,
    //         url: job.url,
    //         blurb: job.blurb
    //     });
    //     console.log(indeedUk)
    //     indeedUk.save(function(err) {
    //         if (err) return err;
    //     })
    // })
    // //add json data to indeedUsa collection
    // indeedUsaData.jobs.forEach(job => {
    //     let indeedUsa = new IndeedUsa({
    //         title: job.title,
    //         company: job.company,
    //         location: job.location,
    //         url: job.url,
    //         blurb: job.blurb
    //     });
    //     console.log(indeedUsa)
    //     indeedUsa.save(function(err) {
    //         if (err) return err;
    //     })
    // })
    // //add json data to seekAus collection
    // seekAusData.jobs.forEach(job => {
    //     let seekAus = new SeekAus({
    //         title: job.title,
    //         company: job.company,
    //         location: job.location,
    //         url: job.url,
    //         blurb: job.blurb
    //     });
    //     console.log(seekAus)
    //     seekAus.save(function(err) {
    //         if (err) return err;
    //     })
    // })



module.exports = { loadData }