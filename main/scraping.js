var request = require('request');
var cheerio = require('cheerio');

//var url='http://www.yelp.com/menu/paulines-pizza-and-wine-bar-san-francisco-3'
//var url="http://www.yelp.com/menu/velvet-cantina-san-francisco";
var url = 'http://www.yelp.com/menu/nicks-crispy-tacos-san-francisco'
/**
*takes an array of menu urls , iterates through the urls finding the popular dish info and pushes 
*those to a results array
*/

//arroflinks? call it menulinks
//change cb to senddata
exports.findPopularDish = function(arroflinks,cb){
  var populardishes=[];
  var response=0;
  for(var i = 0; i <arroflinks.length; i++){
      url=arroflinks[i];

      request(url, (function(url){
        return function(err,resp,body){
          response++;
          var description = '';
          var reviews = '';
          if (err)
            throw err;
          $=cheerio.load(body);
          //grabs the link to the number one popular dish on page
         //console.log('pushing',$('.popular-item').find('a')['0'].attribs['href'])
          if (resp.statusCode!=404){
            //console.log('about to insert dish for url',arroflinks[i]);
            console.log(url);
            
            var popularitem=$('.popular-item').find('a')['0'];
            //check if popular items exist
            if (popularitem!=undefined){
              var dishurl="http://www.yelp.com"+popularitem.attribs['href'];
              var dishurlarr=dishurl.split('/');
              var dish=dishurlarr[dishurlarr.length-1];
              console.log('dish:',dish);
              //remove number on end of letter


              try{
                reviews = $('a[href$="'+dish+'#menu-reviews"]').children()[0].next.data
                description=$('a[href$="'+dish+'#menu-reviews"]').parent().parent().find('p')[0].children[0].data.replace(/(\r\n|\n|\r|\t)/gm,"");
                console.log('reviews',reviews)
              } catch(err) {
                console.log('description not working for: ',dishurl);
              }

              pic = ($('.popular-item').find('.photo-box-img')[0].attribs.src);
              dishinfo = {
                    "url"         :dishurl,
                    "name"        : dish,
                    "pic"         : pic,
                    "reviews"     : reviews,
                    "description" : description
              };
              populardishes.push(dishinfo);
            }
          }
          if(response === arroflinks.length){
            cb(populardishes);
          }
        };
      })(url));
   }
    console.log('populardishes',populardishes);
};

var findingmenu = function(){
  request(url, function(err,resp,body){
    if(err){ throw err; }
    $ = cheerio.load(body);
  });
};


/** function used to find dish information for testing
*/
var finddish = function(){
  request(url, function(err,resp,body){
        if (err)
          throw err;
        if(resp.statusCode != 404){
          $ = cheerio.load(body);

         // var stored = $('h3').find('a').filter(function(index){return $(this).text().toLowerCase()==="castro"})[0].parent.next.next.children[0].data.replace(/(\r\n|\n|\r)/gm,"");
          pop=$('.popular-item').find('a')['0']
          dishurl="http://www.yelp.com"+pop.attribs['href'];
          dishurlarr=dishurl.split('/');
          dish=dishurlarr[dishurlarr.length-1];

          //find children
          console.log('dish',dish)
          console.log($('a[href$="'+dish+'#menu-reviews"]').children()[0].next.data)
          //console.log($('a[href$="'+dish+'"]')[0].parent.next.next.children[0].data)
          //console.log($('a[href$="'+dish+'#menu-reviews"]').parent().prev()[0].children.data)
          console.log($('a[href$="'+dish+'#menu-reviews"]').parent().parent().find('p')[0].children[0].data)
          //$('amatriciana#menu-reviews')

          ///finds number of reviews
          //console.log($('h3').find('a').filter(function(index){return $(this).text().toLowerCase()==="castro"})[0].parent.parent.children[5].children[1].children[0].next.data)
          //console.log($('h3').find('a').filter(function(index){return $(this).text().toLowerCase()==="castro"})[0].parent.parent.children[5].children[1].children[0].next.data);

       }
      });
};

