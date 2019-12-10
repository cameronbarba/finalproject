function updateDivision(divisionID){
   $.ajax({
      url: '/divisions/' + divisionID,
      type: 'PUT',
      data: $('#update-division').serialize(),
      success: function(result){
         window.location.replace("./");
      }
   })
};