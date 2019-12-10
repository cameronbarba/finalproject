module.exports = function(){
   var express = require('express');
   var router = express.Router();
   
 function getDivisions(res, mysql, context, complete){
      mysql.pool.query("SELECT divisionID, name FROM division", function(error, results, fields){
         if(error){
            res.write(JSON.stringify(error));
            res.end();
         }
         context.divisions  = results;
         complete();
      });
   }
   
   function getTeams(res, mysql, context, complete){
      mysql.pool.query("SELECT name, location, mascot, jerseycolor, divisionID FROM team", function(error, results, fields){
         if(error){
            res.write(JSON.stringify(error));
            res.end();
         }
         context.teams  = results;
         complete();
      });
   }

    router.get('/', function(req, res){
      var callbackCount = 0;
      var context = {};
      var mysql = req.app.get('mysql');
      getTeams(res, mysql, context, complete);
      getDivisions(res, mysql, context, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 1){
            res.render('divisions', context);
         }
      }
   });


   return router;
}();
