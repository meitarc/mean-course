request = require('request');
cheerio = require('cheerio');
fs = require('fs');
const Scraper = require('../models/scrapedSite');


const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
//mongoose.connect("mongodb+srv://Fox:"+ 'Wb6CZi82Z8t5u9dO' +"@cluster0-ugkpd.mongodb.net/node-angular?retryWrites=true&w=majority")
mongoose.connect("mongodb://localhost:27017/tester")
.then(()=>{
  console.log('Connected to database');
}).catch(()=>{
  console.log('Connection failed');
});

urlToScrap = 'https://www.imdb.com/title/tt00';
urlMid = 10101;
urlEnd = '/';

for (index = 0;index < 5 ;index++) {
request(urlToScrap + String(urlMid + index) + urlEnd, function(error, response, body) {
  if(error) {
    console.log("Error: ");
  }
  console.log("Status code: ");

  $ = cheerio.load(body);

  title = $('.title_wrapper > h1').text().split('(')[0];
  year = $('.title_wrapper > h1').text().split('(')[1].split(')')[0];
  summery = $('.summary_text').text().trim();
  len = $('.subtext > time').text().trim();
  director = $('.credit_summary_item > a').first('Director').text();
  /*
  console.log(title);
  console.log(year);
  console.log(summery);
  console.log(len);
  console.log(director);
  */
  scraper = new Scraper({
    title: title,
    year: year,
    summery: summery,
    len: len,
    director: director
  });
  // console.log('test1');

  scraper.save().then(result => {
    // console.log('test2');
    res.status(201).json({
      message: "scrap created!",
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      message: 'Invalid authntication credintials!'
    });
  });

  // fs.appendFileSync('scrapedSite.txt',body);
  });
}

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
