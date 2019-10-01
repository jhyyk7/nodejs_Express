var db = require ('./db');
var template = require ('./template');
// var url = require ('url');
// var qs = require ('querystring');
var path = require('path');
var sanitizedHtml = require ('sanitize-html');

exports.Home = function(request, response){
     var results = request.topiclist;
     var title = 'welcome';          
     var description = 'WEB is..'   
     var option = `<a href="/create">create</a>`;
     var list = template.LIST(results);
     var html = template.HTML(title, list, option, `<h2>${title}</h2>${description}
                              <img src = "images/hello.jpg" style="width:350px; display:block;
                              margin-left:auto; margin-right:auto; margin-top:auto;"` );                       
     response.send(html); 
}
exports.Page = function (request, response, next){
  
    var pageData = request.params.pageId;
    var filteredPage = path.parse(pageData).base;
    var results = request.topiclist;
               
        db.query(`SELECT * FROM topic LEFT OUTER JOIN author ON topic.author_id=author.id WHERE topic.title=?`, [filteredPage], function (error2, results2){
          if (error2) next (err);                    
            var title = sanitizedHtml(results2[0].title);
            var name = sanitizedHtml(results2[0].name);
            var profile = sanitizedHtml(results2[0].profile);            
            var description = sanitizedHtml(results2[0].description);          
            var option = 
              `<a href="/update/${filteredPage}">update</a>   
              <form action = "/delete_process" method = "post">
                <input type = "hidden" name = "id" value = "${filteredPage}">
                <input type = "submit" value = "delete">
              </form> `;
            var list = template.LIST(results);
            var html = template.HTML(title, list, option,  `<h2>${title}</h2>${description}<p>by ${name}</p><p>${name}'s job is ${profile}`);                               
            
            response.send(html);             
        });  
     
}
exports.create = function (request, response){
    var results = request.topiclist;
        db.query(`SELECT * FROM author`, function (error2, results2){
          if (error2) throw error2;                  
            var title = 'WEB-create';
            var option = `
                <a href = "/create">create</a>
                  <form action="/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p>
                      <textarea name="description" placeholder="description"></textarea>
                    </p>
                    ${template.Author(results2)}
                    <p>
                      <input type="submit">
                    </p>
                  </form>
                `;
          var list = template.LIST(results);
          var html = template.HTML(title, list, option, ``);                            
          response.send(html);    
        });    
}
exports.create_process = function (request, response){  
      var post = request.body;
      var author = post.author;
      var title = post.title;
      var description = post.description;                       
      db.query(`
              INSERT INTO topic (title, description, created, author_id) 
                  VALUES(?, ?, now(), ?)`,
              [title, description, author], function (error, results){              
          if(error) {
          throw error;
          }                    
          response.redirect(`/page/${title}`);
        
      });

}//TODO: update 부터 다시 하기 !! NOTE:(completed 09.28))
exports.update = function (request, response){
    var pageData = request.params.pageId;
    var filteredPage = path.parse(pageData).base;      
    var results = request.topiclist;
        db.query(`SELECT * FROM topic WHERE title=?`, [filteredPage], function (error2, results2){
          if (error2) throw error2;
          db.query(`SELECT * FROM author`, function (error3, results3){
            if (error3) throw error3;            
              var title = results2[0].title;
              var description = results2[0].description;
              var author = results2[0].author_id;
              var option = `
                <form action="/update_process" method="post">
                  <p><input type="hidden" name="id" value ="${filteredPage}"></p>
                  <p><input type="text" name="title" placeholder="title" value= ${title}></p>
                  <p>
                    <textarea name="description" placeholder="description">${description}</textarea>
                  </p>
                  ${template.Author(results3, author)}
                  <p>
                    <input type="submit">
                  </p>
                </form>
              `;            
              var list = template.LIST(results);
              var html = template.HTML(title, list, option, '');                                 
              response.send(html);
          });          
        });      

}
exports.update_process = function (request, response){
    var post = request.body;                       
    var title = post.title;
    var description = post.description;
    var id = post.id;
    var author = post.author;                  
      db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE title=?`,
              [title, description, author, id], function(error, result){
                  if (error) throw error;                       
                  response.redirect(`/page/${title}`)
                  })                
} 
exports.delete_process = function (request,response){
    var post = request.body;
    
      var id = post.id;
      db.query(`DELETE FROM topic WHERE title = ?`,[id],function(error, result){            
        if (error) throw error;       
        response.redirect('/');
      })
    
}