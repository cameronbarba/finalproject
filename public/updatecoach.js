function updateCoach(coachID){
   $.ajax({
      url: '/coaches/' + coachID,
      type: 'PUT',
      data: $('#update-coach').serialize(),
      success: function(result){
         window.location.replace("./");
      }
   })
};
