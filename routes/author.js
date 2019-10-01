var express = require('express')
var router = express.Router();
var author=require('../lib/author')

  router.get('/', function (request, response){
    author.author_Home(request, response);
  })
  router.get('/create', function(request, response){
    author.author_Create(request, response);
  });
  router.post('/create_process', function(request, response){
    author.author_Create_process(request, response);
  });
  router.get('/update/:pageId', function(request, response){
    author.author_Update(request, response);
  });
  router.post('/update_process', function(request, response){
    author.author_Update_process(request, response);
  })
  router.post('/delete_process', function(request, response){
    author.author_Delete_process(request, response);
  })