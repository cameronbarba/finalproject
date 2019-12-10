module.exports = function(){
   var express = require('express');
   var router = express.Router();
   

   function getTeams(res, mysql, context, complete){
      //so only teams without a head coach show up in dropdown
      mysql.pool.query("SELECT teamID, name FROM team WHERE teamID NOT IN (SELECT t.teamID FROM team t INNER JOIN coach c ON t.teamID = c.teamID AND c.role = 'Head');", function(error, results, fields){
         if(error){
            res.write(JSON.stringify(error));
            res.end();
         }
         context.teams  = results;
         complete();
      });
   }

   function getAssistTeams(res, mysql, context, complete){
      //so only teams without a head coach show up in dropdown
      mysql.pool.query("SELECT teamID, name FROM team", function(error, results, fields){
         if(error){
            res.write(JSON.stringify(error));
            res.end();
         }
         context.assistteams  = results;
         complete();
      });
   }

   function getCoaches(res, mysql, context, complete){
      mysql.pool.query("SELECT t.name as name, c.coachID as coachID, c.firstName as firstName, c.lastName as lastName, c.role as role, c.tenure as tenure FROM coach c INNER JOIN team t WHERE c.teamID = t.teamID", function(error, results, fields){
         if(error){
            res.write(JSON.stringify(error));
            res.end();
         }
         context.coaches = results;
         complete();
      });
   }

   
   function getCoach(res, mysql, context, coachID, complete){
      var sql = "SELECT * FROM coach WHERE coachID=?";
      var inserts = [coachID];
      mysql.pool.query(sql, inserts, function(error, results, fields){
         if(error){
            res.write(JSON.stringify(error));
            res.end();
         }
         context.coach = results[0];
         complete();
      });
   }

   function getCoachesbyTeam(req,res,mysql,context,complete){
      var query = "SELECT t.teamID, t.name as name, c.coachID as coachID, c.firstName as firstName, c.lastName as lastName, c.role as role, c.tenure as tenure FROM coach c INNER JOIN team t ON t.teamID = c.teamID WHERE t.teamID = ?";
      var inserts = [req.params.teamID];
      mysql.pool.query(query, inserts, function(error, results, fields){
         if(error){
            res.write(JSON.stringify(error));
            res.end();
         }
            context.coaches = results;
            complete();
        });
   }

   router.get('/', function(req, res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["deletecoach.js","filtercoaches.js"];
      var mysql = req.app.get('mysql');
      getCoaches(res, mysql, context, complete);
      getTeams(res, mysql, context, complete);
      getAssistTeams(res, mysql, context, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 3){
            res.render('coaches', context);
         }
      }
   });

   router.get('/filter/:teamID', function(req, res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["deletecoach.js","filtercoaches.js"];
      var mysql = req.app.get('mysql');
      getCoachesbyTeam(req,res,mysql,context,complete);
      getTeams(res,mysql,context,complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 2){
            res.render('coaches',context);
         }
      }
   });

   router.post('/', function(req, res){
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO coach (firstName,lastName,role,tenure,teamID) VALUES (?,?,?,?,?)";
      var inserts = [req.body.firstName, req.body.lastName, req.body.role, req.body.tenure, req.body.team];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
         if(error){
             console.log(JSON.stringify(error))
             res.write(JSON.stringify(error));
             res.end();
         }else{
             res.redirect('/coaches');
         }
      });
   });

   router.get('/:coachID', function(req, res){
      callbackCount = 0;
      var context = {};
      context.jsscripts = ["updatecoach.js"];
      var mysql = req.app.get('mysql');
      getCoach(res, mysql, context, req.params.coachID, complete);
      getAssistTeams(res, mysql, context, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 2){
            res.render('updateCoaches', context);
         }
      }
   });

   router.put('/:coachID', function(req, res){
      var mysql = req.app.get('mysql');
      var sql = "UPDATE coach SET firstName=?, lastName=?, role=?, tenure=?, teamID=? WHERE coachID=?";
      var inserts = [req.body.firstName, req.body.lastName, req.body.role, req.body.tenure, req.body.team, req.params.coachID];

      sql = mysql.pool.query(sql, inserts, function(error, results, fields){
         if(error){
            console.log(error)
            res.write(JSON.stringify(error));
            res.end();
         }else{
            res.status(200);
            res.end();
         }

      });

   });

   router.delete('/:coachID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM coach WHERE coachID = ?";
        var inserts = [req.params.coachID];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    });


   return router;
}();
