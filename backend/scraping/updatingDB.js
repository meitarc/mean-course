request = require('request');
cheerio = require('cheerio');
fs = require('fs');
const Scraper = require('../models/scrapedSite');


const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Fox:"+ 'Wb6CZi82Z8t5u9dO' +"@cluster0-ugkpd.mongodb.net/node-angular?retryWrites=true&w=majority")
// mongoose.connect("mongodb://localhost:27017/tester")
.then(()=>{
  console.log('Connected to database');
}).catch(()=>{
  console.log('Connection failed');
});
old = ({
  summery: "Add a Plot »"
});
newer = ({
  "summery": "No Summery exists."
});

var scraper = new Scraper({
  "summery": "Add a Plot »",
});

// Convert the Model instance to a simple object using Model's 'toObject' function
// to prevent weirdness like infinite looping...
var upsertData = newer;

// Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
// delete upsertData._id;

// Do the upsert, which works like this: If no Contact document exists with
// _id = contact.id, then create a new doc using upsertData.
// Otherwise, update the existing doc with upsertData
// testy = Scraper.update({"summery": scraper.summery}, upsertData);

console.log('finished with: ' + Scraper.Collection.update(scraper, newer));

