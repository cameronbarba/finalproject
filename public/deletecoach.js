function deleteCoach(coachID){
    $.ajax({
        url: '/coaches/' + coachID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
