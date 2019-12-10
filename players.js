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


   function getPlayers(res, mysql, context, complete){
      mysql.pool.query("SELECT t.name as name, p.playerID as playerID, p.firstName as firstName, p.lastName as lastName, p.height as height, p.weight as weight, p.position as position FROM player p INNER JOIN team t ON p.teamID = t.teamID", function(error, results, fields){
         if(error){
            res.write(JSON.stringify(error));
            res.end();
         }
         context.players = results;
         complete();
      });
   }

   
   function getPlayer(res, mysql, context, playerID, complete){
      var sql = "SELECT * FROM player WHERE playerID=?";
      var inserts = [playerID];
      mysql.pool.query(sql, inserts, function(error, results, fields){
         if(error){
            res.write(JSON.stringify(error));
            res.end();
         }
         context.player = results[0];
         complete();
      });
   }

   function getPlayersbyTeam(req,res,mysql,context,complete){
      var query = "SELECT t.teamID, t.name as name, p.playerID as playerID, p.firstName as firstName, p.lastName as lastName, p.height as height, p.weight as weight, p.position as position FROM player p INNER JOIN team t ON p.teamID = t.teamID WHERE t.teamID = ?";
      var inserts = [req.params.teamID];
      mysql.pool.query(query, inserts, function(error, results, fields){
         if(error){
            res.write(JSON.stringify(error));
            res.end();
         }
            context.players = results;
            complete();
        });
   }

   function getPlayerSearch(req, res, mysql, context, complete){
      var query  = "SELECT t.teamID, t.name as name, p.playerID as playerID, p.firstName as firstName, p.lastName as lastName, p.height as height, p.weight as weight, p.position as position FROM player p INNER JOIN team t on p.teamID = t.teamID WHERE firstName LIKE " + mysql.pool.escape(req.params.s += '%');
      mysql.pool.query(query, function(error, results, fields){
         if(error){
            res.write(JSON.stringify(error));
            res.end();
         }
         context.players = results;
         complete();
      });

   }

   router.get('/', function(req, res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["deleteplayer.js","filterplayers.js","searchplayer.js"];
      var mysql = req.app.get('mysql');
      getPlayers(res, mysql, context, complete);
      getTeams(res, mysql, context, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 2){
            res.render('players', context);
         }
      }
   });

   router.get('/filter/:teamID', function(req, res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["deleteplayer.js","filterplayers.js","searchplayer.js"];
      var mysql = req.app.get('mysql');
      getPlayersbyTeam(req,res,mysql,context,complete);
      getTeams(res,mysql,context,complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 2){
            res.render('players',context);
         }
      }
   });

   router.get('/search/:s', function(req, res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["deleteplayer.js","filterplayers.js","searchplayer.js"];
      var mysql = req.app.get('mysql');
      getPlayerSearch(req, res, mysql, context, complete);
      getTeams(res, mysql, context, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 2){
            res.render('players', context);
         }
      }
    });



   router.post('/', function(req, res){
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO player (firstName,lastName,height,weight,position,teamID) VALUES (?,?,?,?,?,?)";
      var inserts = [req.body.firstName, req.body.lastName, req.body.height, req.body.weight, req.body.position, req.body.team];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
         if(error){
             console.log(JSON.stringify(error))
             res.write(JSON.stringify(error));
             res.end();
         }else{
             res.redirect('/players');
         }
      });
   });

   router.get('/:playerID', function(req, res){
      callbackCount = 0;
      var context = {};
      context.jsscripts = ["updateplayer.js"];
      var mysql = req.app.get('mysql');
      getPlayer(res, mysql, context, req.params.playerID, complete);
      getTeams(res, mysql, context, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 2){
            res.render('updatePlayers', context);
         }
      }
   });

   router.put('/:playerID', function(req, res){
      var mysql = req.app.get('mysql');
      var sql = "UPDATE player SET firstName=?, lastName=?, height=?, weight=?, position=?, teamID=? WHERE playerID=?";
      var inserts = [req.body.firstName, req.body.lastName, req.body.height, req.body.weight, req.body.position, req.body.team, req.params.playerID];

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

   router.delete('/:playerID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM player WHERE playerID = ?";
        var inserts = [req.params.playerID];
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
