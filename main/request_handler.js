
var path = require('path');
var url = require('url');
var filePath;
var file;
var fs = require('fs');
var aj= require('./ajax.js');
var yelp=require('./messingwithyelp.js');


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

      yelp.yelpwithparams(body.address);

      res.writeHead(302,{'Content-Type':'text/html'});
      res.end();
      console.log('ending post');
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