var request = require('request');
var cheerio = require('cheerio');

var url='http://www.yelp.com/biz/dosa-on-fillmore-san-francisco-3'

url='http://www.yelp.com/menu/dosa-on-fillmore-san-francisco-3'
request(url, function(err,resp,body){
  if (err)
    throw err;
  $=cheerio.load(body);
  //console.log($('.popular-item').innerhtml())
  //grabs the link to the number one popular dish on page
  var populardish=$('.popular-item').find('a')['0'].attribs['href']
  //$(populardish).find()
  //console.log($().find(populardish))
  //var foundin = $('*:contains("Masala")');
  //console.log($('.menu-item-details'))
  //console.log($('h3:has(a[href="/menu/dosa-on-fillmore-san-francisco-3/item/masala])'))
  console.log(populardish)
  //console.log($('h3').innertext())
  //console.log($('h3').find(populardish))
  var arroflinks=$('a[href$="/menu/dosa-on-fillmore-san-francisco-3/item/masala"]').parent().parent()
  // for (var i=0; i < arroflinks.length; i++){
  //   console.log(arroflinks[i])
  // }
  console.log(arroflinks)
});