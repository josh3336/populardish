var request = require('request');
var cheerio = require('cheerio');

var url='http://www.yelp.com/biz/suppenk%C3%BCche-san-francisco-2'
request(url, function(err,resp,body){
  if (err)
    throw err;
  $=cheerio.load(body);
  console.log($)
}