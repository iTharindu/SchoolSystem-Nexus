$(document).ready(function() {

  $('[id^="option"]').change(function() {
     $('.btn-group > label').removeClass().addClass('btn btn-default');
  });

  $('#option1').change(function(){
     $(this).parent().removeClass('btn-default').addClass("btn-primary");
  });

  $('#option2').change(function(){
     $(this).parent().removeClass('btn-default').addClass("btn-primary");
  });

});
