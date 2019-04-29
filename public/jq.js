$(document).ready(function(){
  $("img").hover(function(){
    var desc = $(this).attr("data-desc");
    $("div#desc").text(desc);
    console.log(desc)
  });
});
