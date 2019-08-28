request = require('request');
cheerio = require('cheerio');
fs = require('fs');

const Scraper = require('../models/scrapedSite');

// urlToScrap = "https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States"

urlToScrap = 'https://www.imdb.com/title/tt0010000/';

request(urlToScrap, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  $ = cheerio.load(body);

  title = $('.title_wrapper > h1').text().split('(')[0];
  year = $('.title_wrapper > h1').text().split('(')[1].split(')')[0];
  summery = $('.summary_text').text().trim();
  len = $('.subtext > time').text().trim();
  director = $('.credit_summary_item > a').first('Director').text();


  console.log(title);
  console.log(year);
  console.log(summery);
  console.log(len);
  console.log(director);

  const scraper = new Scraper({
    title: title,
    year: year,
    summery: summery,
    len: len,
    director: director
  });
  console.log('test1');

  scraper.save();

  // fs.appendFileSync('scrapedSite.txt',body);
  });

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
