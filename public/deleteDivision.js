function deleteDivision(divisionID){
    $.ajax({
        url: '/divisions/' + divisionID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
