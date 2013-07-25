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
        dishes=JSON.parse(data);
        console.log('dishes',dishes.length)
        $('#main').html('')
        for (var i = 0 ; i < dishes.length; i++){
          console.log('dishes',dishes[i].url)
          $('#main').append("<div><a href='"+dishes[i].url+"'>get menu</a></div>");
          $('#main').append("<img src='"+dishes[i].pic+"'height='100' width='100'>")
        }
         // $('.main').append(data.map(function(message) {
         //  return "<div class='message'>"+dish.url+"</div>";

      },
      error: function(data) {
        console.log('Ajax POST request failed');
      }
    });

  }
};