$(document).ready(function(){
  $('.delete-assignment').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url:'/assignments/'+id,
      success: function(response){
        alert('Deleting assignment');
        window.location.href = '/assignments/teacher';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
