var request = require('request');
var cheerio = require('cheerio');

//var url='http://www.yelp.com/menu/paulines-pizza-and-wine-bar-san-francisco-3'
var url="http://www.yelp.com/menu/arinell-pizza-san-francisco";


/**
*takes an array of menu urls , iterates through the urls finding the popular dish info and pushes 
*those to a results array
*/
exports.findpopulardish = function(arroflinks,cb){
  var populardishes=[];
  var response=0
  for(var i = 0; i <arroflinks.length; i++){
      url=arroflinks[i]
      request(url, (function(url){
        return function(err,resp,body){
          response++
          if (err)
            throw err;
          $=cheerio.load(body);
        //  console.log(url)

          //console.log($('.popular-item').innerhtml())
          //grabs the link to the number one popular dish on page
         //console.log('pushing',$('.popular-item').find('a')['0'].attribs['href'])
          //console.log(arroflinks[i],resp.statusCode);
          if (resp.statusCode!=404){
            //console.log('about to insert dish for url',arroflinks[i]);
            populardishes.push($('.popular-item').find('a')['0'].attribs['href']);
          }
          console.log(response)
          if(response===arroflinks.length){
            cb(populardishes)
          }

        }     
      })(url));
        //$(populardish).find()
        //console.log($().find(populardish))
        //var foundin = $('*:contains("Masala")');
        //console.log($('.menu-item-details'))
        //console.log($('h3:has(a[href="/menu/dosa-on-fillmore-san-francisco-3/item/masala])'))
        //console.log($('h3').innertext())
        //console.log($('h3').find(populardish))
        //var arroflinks=$('a[href$="/menu/dosa-on-fillmore-san-francisco-3/item/masala"]').parent().parent();
        // for (var i=0; i < arroflinks.length; i++){
        //   console.log(arroflinks[i])
        // }
        //console.log(arroflinks);
    }
    console.log('populardishes',populardishes);
  }


var findingmenu = function(){
    request(url, function(err,resp,body){
      if (err)
        throw err;
      $=cheerio.load(body);
      //console.log($('div div.yelp'))
    });
};


var finddish = function(){
  request(url, function(err,resp,body){
        if (err)
          throw err;
        if(resp.statusCode!= 404){
        //console.log(resp.connection.)
        // console.log('err',err)
        // console.log('resp',resp)
        // console.log('body',body)
          $=cheerio.load(body);
        //allows you to get all html
        // console.log($.html())

       }
      });
}

finddish()