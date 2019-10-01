var express = require('express');
var app = express();
var helmet = require ('helmet')
var topic = require ('./lib/topic');
var bodyParser = require ('body-parser');
var compression = require ('compression');
var template = require ('./lib/template');
var author = require('./lib/author');
var indexRouter = require('./routes/index')
var topicRouter = require('./routes/topic')
var authorRouter = require('./routes/author')


//TODO: refacntory source code using to make middleware
app.post('*', bodyParser.urlencoded({ extended: false }))
app.use(compression());
app.use(helmet());
app.get('*', template.infoTopic);
app.use(express.static('public'));
app.use('*',template.infoAuthor);

app.use('/', indexRouter)
app.use('/topic', topicRouter)
app.use('/author', authorRouter)

// app.get('/', function(request, response){
//   topic.Home(request, response);   
// });
// app.get('/author', function (request, response){
//   author.author_Home(request, response);
// })
// app.get('/author/create', function(request, response){
//   author.author_Create(request, response);
// });
// app.post('/author/create_process', function(request, response){
//   author.author_Create_process(request, response);
// });
// app.get('/author/update/:pageId', function(request, response){
//   author.author_Update(request, response);
// });
// app.post('/author/update_process', function(request, response){
//   author.author_Update_process(request, response);
// })
// app.post('/author/delete_process', function(request, response){
//   author.author_Delete_process(request, response);
// })

// app.get('/page/:pageId', function(request, response){
//   topic.Page(request, response);
// });
// app.get('/create', function(request, response){
//   topic.create(request, response);
// });
// app.post('/create_process', function(request, response){
//   topic.create_process(request, response);
// });
// app.get('/update/:pageId', function(request, response){
//   topic.update(request, response);
// });
// app.post('/update_process', function(request, response){
//   topic.update_process(request, response);
// })
// app.post('/delete_process', function(request, response){
//   topic.delete_process(request, response);
// })
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
  });
app.use(function(err, req, res, next) { //TODO: 아직 미완성 , 여러개의 에러처리 만들기
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000);