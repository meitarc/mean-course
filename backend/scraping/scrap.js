request = require('request');
cheerio = require('cheerio');
fs = require('fs');
const Scraper = require('../models/scrap');


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

urlToScrap = 'https://www.imdb.com/title/tt00';
urlMid = 30101;
urlEnd = '/';

for (index = 0;index < 200 ;index++) {
request(urlToScrap + String(urlMid + index) + urlEnd, function(error, response, body) {
  if(error) {
    //console.log("Error: ");
  }
  //console.log("Status code: ");

  $ = cheerio.load(body);

  title = new String($('.title_wrapper > h1').text().split('(')[0]);
  if ($('.title_wrapper > h1').text().split('(')[1] == undefined){
    year = 'undefined';
    //console.log('Year Undefined');

  }
  else {
    year = new String($('.title_wrapper > h1').text().split('(')[1].split(')')[0]);
  };
  summery = new String($('.summary_text').text().trim());
  len = new String($('.subtext > time').text().trim());
  if(len == String("")){
    len = "Not Listed";
  }
  director = new String($('.credit_summary_item > a').first('Director').text());



  // console.log(title);
  // console.log(year);
  // console.log(summery);
  // console.log(len);
  // console.log(director);


 if (String(summery).includes('Add a Plot')) {
  summery = "No Summery Exists";
  //console.log('changed to: ' + summery);
}

  scraper = new Scraper({
    title: title,
    year: year,
    summery: summery,
    len: len,
    director: director
  });
  // console.log('test1');

  scraper.save().then(result => {
     console.log('saved the information.');
    // res.status(201).json({
      //message: "scrap created!",
      //result: result
    //});
  })
  .catch(err => {
    //res.status(500).json({
     // message: 'Invalid authntication credintials!'

    //});
    console.log('Error');

  });

  // fs.appendFileSync('scrapedSite.txt',body);
  });
}

console.log('Finished the loop');


/* example code to extract information
 $('div.col1 > ul > li.grid-posts__item').each(function( index ) {
    title = $(this).find('h2 > a').text().trim();
    author = $(this).find('div.small-meta > div:nth-child(1) > a').text().trim();
    responses = $(this).find('div.small-meta > div:nth-child(3) > a').text();
    console.log(title);
    console.log(author);
    console.log(responses);
    fs.appendFileSync('buzzfeed.txt', title + '\n' + author + '\n' + responses + '\n');
  });

*/
