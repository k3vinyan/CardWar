$(document).ready(function(){
  $("img").hover(function(){
    var desc = $(this).attr("data-desc");
    $("span.desc").text(desc);
  })
});
