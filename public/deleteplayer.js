function deletePlayer(playerID){
    $.ajax({
        url: '/players/' + playerID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
