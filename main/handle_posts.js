//function that handles is called when user submits data into form which then passes data to server
var serverurl="http://127.0.0.1:8080";

handle_posts=function(posted){
  console.log('handling',posted);
  var url = {};
  url.address=posted;
  url=JSON.stringify(url);
  if(posted !==''){
    $.ajax(serverurl, {
      'content-type': 'application/json',
      type: 'POST',
      data: url,
      success: function(data){
        console.log('Message submitted to server.', data);
      },
      error: function(data) {
        console.log('Ajax POST request failed');
      }
    });

  }
};