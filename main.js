var express = require('express');
var app = express();
var topic = require ('./lib/topic')
var bodyParser = require ('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(request, response){
  topic.Home(request, response);   
});
app.get('/page/:pageId', function(request, response){
  topic.Page(request, response);
});
app.get('/create', function(request, response){
  topic.create(request, response);
});
app.post('/create_process', function(request, response){
  topic.create_process(request, response);
});
app.get('/update/:pageId', function(request, response){
  topic.update(request, response);
});
app.post('/update_process', function(request, response){
  topic.update_process(request, response);
})
app.post('/delete_process', function(request, response){
  topic.delete_process(request, response);
})
app.listen(3000);
