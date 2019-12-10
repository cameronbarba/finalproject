module.exports = function(){
   var express = require('express');
   var router = express.Router();
   

   function getTeams(res, mysql, context, complete){
      mysql.pool.query("SELECT teamID, name FROM team", function(error, results, fields){
         if(error){
            res.write(JSON.stringify(error));
            res.end();
         }
         context.teams  = results;
         complete();
      });
   }


   function getRivalries(res, mysql, context, complete){
      mysql.pool.query("SELECT DISTINCT t1.teamID AS team1ID, t2.teamID as team2ID, t1.name AS t1Name, t2.name AS t2Name FROM team t1 INNER JOIN team_team tt ON t1.teamID = tt.team1ID INNER JOIN team t2 ON t2.teamID = tt.team2ID AND team1ID!=team2ID", function(error, results, fields){
         if(error){
           
            res.write(JSON.stringify(error));
            res.end();
         }
         context.rivalries = results;
         complete();
      });
   }

   
   function getRivalry(res, mysql, context, team1ID, team2ID, complete){
      var sql = "SELECT t1.teamID AS team1ID, t2.teamID as team2ID, t1.name AS t1Name, t2.name AS t2Name FROM team t1 INNER JOIN team_team tt ON t1.teamID = tt.team1ID INNER JOIN team t2 ON t2.teamID = tt.team2ID WHERE team1ID=? AND team2ID=?";
      var inserts = [team1ID, team2ID];
      mysql.pool.query(sql, inserts, function(error, results, fields){
         if(error){
            res.write(JSON.stringify(error));
            res.end();
         }
         context.rivalry = results[0];
         complete();
      });
   }


   router.get('/', function(req, res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["deleterivalry.js"];//,"filterpeople.js","searchpeople.js"];
      var mysql = req.app.get('mysql');
      getRivalries(res, mysql, context, complete);
      getTeams(res, mysql, context, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 2){
            res.render('rivalries', context);
         }
      }
   });

   router.post('/', function(req, res){
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO team_team (team1ID, team2ID) VALUES (?,?)";
      var inserts = [req.body.team1, req.body.team2];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
         if(error){
             console.log(JSON.stringify(error))
             res.write(JSON.stringify(error));
             res.end();
         }else{
             res.redirect('/rivalries');
         }
      });
   });

   router.get('/:team1ID/:team2ID', function(req, res){
      callbackCount = 0;
      var context = {};
      context.jsscripts = ["updaterivalry.js"];
      var mysql = req.app.get('mysql');
      getRivalry(res, mysql, context, req.params.team1ID, req.params.team2ID, complete);
      getTeams(res, mysql, context, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 2){
            res.render('updateRivalries', context);
         }
      }
   });

   router.put('/:team1ID/:team2ID', function(req, res){
      var mysql = req.app.get('mysql');
      var sql = "UPDATE team_team SET team1ID=?, team2ID=? WHERE team1ID=? AND team2ID=?";
      var inserts = [req.body.team1ID, req.body.team2ID, req.params.team1ID, req.params.team2ID];

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

   router.delete('/:team1ID/:team2ID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM team_team WHERE team1ID=? AND team2ID=?";
        var inserts = [req.params.team1ID, req.params.team2ID];
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
