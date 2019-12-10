function updateRivalry(team1ID, team2ID){
   $.ajax({
      url: '/rivalries/' + team1ID + '/' + team2ID,
      type: 'PUT',
      data: $('#update-rivalry').serialize(),
      success: function(result){
         window.location.replace("../");
      }
   })
};
