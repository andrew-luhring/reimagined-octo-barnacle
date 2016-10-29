$(document).ready(function(){
  $.get('/info',{}, function(){
    console.log(arguments);
  }, 'xml');
});