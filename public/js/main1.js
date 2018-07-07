$(document).ready(function(){
  $('.delete-mark').on('click', function(e){
    $target =$(e.target);
    const id =$target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url:'/marks/'+id,
      success: function(response){
        alert('Deleting marks');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
