function deleteRivalry(team1ID, team2ID){
    $.ajax({
        url: '/rivalries/' + team1ID + '/' + team2ID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
