var request = require('request');
var cheerio = require('cheerio');

//var url='http://www.yelp.com/menu/paulines-pizza-and-wine-bar-san-francisco-3'
var url="http://www.yelp.com/menu/zero-zero-san-francisco";

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
            console.log(url);
            
            var popularitem=$('.popular-item').find('a')['0'];
            //check if popular items exist
            if (popularitem!=undefined){
              dishurl="http://www.yelp.com"+popularitem.attribs['href'];
              dishurlarr=dishurl.split('/');
              dish=dishurlarr[dishurlarr.length-1];
              console.log('dish:',dish)
              try{
                var description=$('h3').find('a').filter(function(index){return $(this).text().toLowerCase()===dish})[0].parent.next.next.children[0].data.replace(/(\r\n|\n|\r)/gm,"");
              }
              catch(err){
                console.log('description not working for: ',dishurl)
              }
              if (description===undefined){
                description=''
              }
              pic=($('.popular-item').find('.photo-box-img')[0].attribs.src);
              dishinfo={"url":dishurl,
                      "name": dish,
                    "pic": pic,
                    "description": null||description};
              populardishes.push(dishinfo);
            }
          }
          if(response===arroflinks.length){
            cb(populardishes);
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

          var stored=$('h3').find('a').filter(function(index){return $(this).text().toLowerCase()==="castro"})[0].parent.next.next.children[0].data.replace(/(\r\n|\n|\r)/gm,"");
          console.log(stored)
          //console.log($('h3').find('a').attribs['href']);
        //allows you to get all html
        // console.log($.html())
        //finds popular item
         // urlarr=($('.popular-item').find('a')['0'].attribs['href']).split('/')
         // console.log(urlarr[urlarr.length-1])
         
         // console.log($('.popular-items-container').html())
         // console.log($('.popular-item').find('.photo-box-img')[0].attribs.src)
          //console.log($.html())
       }
      });
}

finddish()