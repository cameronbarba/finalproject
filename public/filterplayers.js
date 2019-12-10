function filterplayersbyteam() {
   //get the id of the selected homeworld from the filter dropdown
   var teamID = document.getElementById('team_filter').value
   //construct the URL and redirect to it
   window.location = '/players/filter/' + parseInt(teamID)
}
