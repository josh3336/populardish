exports.ajax = function(){
 $.ajax({
        url: "http://api.yelp.com/v2/search.html",
        context: document.body
      }).done(function() {
        $(this).addClass("done");
      });
};