// Require express module
var express = require('express');

// set up handlebars view engine
var handlebars = require('express-handlebars')
                  .create({ defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// Create instance of express as app
var app = express();

app.use(express.static(__dirname + '/public'));


var fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  'Whenever possible, keep it simple.'
];

// set port config of app as the environment port (set when starting server as an option) or 3000
app.set('port', process.env.PORT || 3000);


// app.get is the method we use to add new routes. app.VERB is used in docs as a placeholder for
// app.get or app.post as examples. the method takes two parameters, a path and a function.
// the path is what defines the route. .get doesn't care about trailing slashes or query strings.
// Homepage route
//

app.get('/', function(req, res){
  res.render('home');
});

// About page route
app.get('/about', function(req, res){
  var randomFortune =
    fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', { fortune: randomFortune });
});

// custom 404 page
//
// These routes use .use method by express to add middleware.
app.use(function(req, res) {
  res.status(404);
  res.render('404');

});

// custom 500 page
//
app.use(function(err, req, res, next){
  console.log(err.stack);
  res.status(500);
  res.render('500');
});

// Send terminal message
app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
  app.get('port') + '; press Ctrl-C to terminate.' );
});
