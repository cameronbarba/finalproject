module.exports = function(){
   var express = require('express');
   var router = express.Router();
   

   function getDivisions(res, mysql, context, complete){
      mysql.pool.query("SELECT * FROM division", function(error, results, fields){
         if(error){
            res.write(JSON.stringify(error));
            res.end();
         }
         context.divisions  = results;
         complete();
      });
   }

   function getDivision(res, mysql, context, divisionID, complete){
      var sql = "SELECT * FROM division WHERE divisionID=?";
      var inserts = [divisionID];
      mysql.pool.query(sql, inserts, function(error, results, fields){
         if(error){
            res.write(JSON.stringify(error));
            res.end();
         }
         context.division = results[0];
         complete();
      });
   }




  
   router.get('/', function(req, res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["deleteDivision.js"];
      var mysql = req.app.get('mysql');
      getDivisions(res, mysql, context, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 1){
            res.render('divisions', context);
         }
      }
   });
 
    router.post('/', function(req, res){
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO division (name) VALUES (?)";
      var inserts = [req.body.name];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
         if(error){
             console.log(JSON.stringify(error))
             res.write(JSON.stringify(error));
             res.end();
         }else{
             res.redirect('/divisions');
         }
      });
   });

   router.get('/:divisionID', function(req, res){
      callbackCount = 0;
      var context = {};
      context.jsscripts = ["updateDivision.js"];
      var mysql = req.app.get('mysql');
      getDivision(res, mysql, context, req.params.divisionID, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 1){
            res.render('updateDivision', context);
         }
      }
   });

   router.put('/:divisionID', function(req, res){
      var mysql = req.app.get('mysql');
      var sql = "UPDATE division SET name=? WHERE divisionID=?";
      var inserts = [req.body.name];

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

     router.delete('/:divisionID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM division WHERE divisionID = ?";
        var inserts = [req.params.divisionID];
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
