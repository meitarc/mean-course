request = require('request');
cheerio = require('cheerio');
fs = require('fs');

request("https://news.ycombinator.com/news", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  $ = cheerio.load(body);

  $('tr.athing:has(td.votelinks)').each(function( index ) {
    title = $(this).find('td.title > a').text().trim();
    link = $(this).find('td.title > a').attr('href');
    fs.appendFileSync('hackernews.txt', body);
  });

});
