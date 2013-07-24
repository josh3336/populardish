
var path = require('path');
var url = require('url');
var filePath;
var file;
var fs = require('fs');
var aj= require('./ajax.js');
var scraping=require('./scraping')
var yelphelpers=require('./messingwithyelp.js');
var yelp = require("yelp").createClient({
  consumer_key: "3Y0PsxdHhARDWieGwR9-0g", 
  consumer_secret: "3TdP-8uXJXXRDTOEngtf-AekJ4k",
  token: "fp8z5lJa5i2pG2Tk8TKeZhQbW8yf_jU2",
  token_secret: "9vzJzpLdFKnB4Ccg-emqM-X6JSM"
});

exports.handleRequest = function (req, res) {
  var fs = require('fs');
  var body='';

  if ( req.method==='POST' ){
    console.log('handling POST');
    req.on('data',function(chunk){
      body+=chunk;
    });
    req.on('end',function(chunk){
      console.log('body',typeof(body));
      body=JSON.parse(body);
      console.log('end of request, the body is',body.address);

      yelp.search({term: body.address, offset:'20', sort:'2',limit:"20",location: "San Francisco"}, function(error, data) {
        res.writeHead(200,{'Content-Type':'text/html'});
        menuurls = yelphelpers.processYelpData(data);
        console.log(menuurls);
        scraping.findpopulardish(menuurls,function(data){
          console.log('data',data)
        });
        res.end(JSON.stringify(data));
      });
    });
  }
  else if (req.method === 'GET') {
    if(req.url === '/' || req.url === '/index'){ 
      filePath = path.join(__dirname, "public/index.html");
      file=fs.readFileSync(filePath);
      console.log('need to serve index');
      res.writeHead(200,{'Content-Type':'text/html'});
      res.end(file);
    }
    if(req.url==='/handle_posts.js'){
      filePath=path.join(__dirname,"handle_posts.js");
      file = fs.readFileSync(filePath);
      res.writeHead(200,{'Content-Type':'script'});
      res.end(file);
    }
  }
  else{
    console.log('not serving');
    res.writeHead(404,{'Content-Type':'text/html'});
    res.end();
  }
};