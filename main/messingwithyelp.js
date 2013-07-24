var yelp = require("yelp").createClient({
  consumer_key: "3Y0PsxdHhARDWieGwR9-0g", 
  consumer_secret: "3TdP-8uXJXXRDTOEngtf-AekJ4k",
  token: "fp8z5lJa5i2pG2Tk8TKeZhQbW8yf_jU2",
  token_secret: "9vzJzpLdFKnB4Ccg-emqM-X6JSM"
});

exports.yelpwithparams= function(term){
  yelp.search({term: term, offset:'20', sort:'2',limit:"20",location: "San Francisco"}, function(error, data) {
    console.log(error);
    //console.log('***',data.businesses)
    sendYelpResponse(data.businesses);
  });
}



//find all the resturants url's within a given area

exports.processYelpData = function(data) {
  //grab urls of restaurants in results then parse them and check to see if they have a menu page
  var menustocheck=[]
  for(key in data.businesses){
    url=data.businesses[key].url
    menustocheck.push(url.slice(0,20).concat('menu').concat(url.slice(23,url.length)))
  }
  //console.log(menustocheck);
  return menustocheck
}
