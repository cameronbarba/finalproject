var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', 1957);
app.set('mysql', mysql);
app.use('/players', require('./players.js'));
app.use('/coaches', require('./coaches.js'));
app.use('/rivalries', require('./rivalries.js'));
app.use('/divisions', require('./divisions.js'));
app.use('/teams', require('./teams.js'));
app.use('/', express.static('public'));

app.get('/',function(req,res){
   res.render('index');
});

app.get('/home',function(req,res){
   res.render('index');
});

app.use(function(req,res){
   res.status(404);
   res.render('404');
});

app.use(function(err, req, res, next){
   console.error(err.stack);
   res.type('plain/text');
   res.status(500);
   res.render('500');
});

app.listen(app.get('port'), function(){
   console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
