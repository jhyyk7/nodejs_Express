module.exports = {//
    HTML: function (title, list, option, body) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            <p><a href="/author">author</a><p>
            ${list}   
            ${option}
            ${body}
        </body>
        </html>
        `;
    },
    LIST:function (filelist) {
        var line = `<ul>`;
        for (var i = 0; i <filelist.length; i++) {
            line = line + `<li><a href="/page/${filelist[i].title}">${filelist[i].title}</a></li>`;
            }
            line = line + `</ul>`;
            return line;
    
    },


    Author:function (author_name, selected){
        var option = `<p><select name = "author">`;
        
        for ( var i =0; i<(author_name.length) ; i++){
            var tag = ``;
          if(author_name[i].id === selected) {
             tag = `selected`;
          }
             option = option + `<option value="${author_name[i].id}"${tag}>${author_name[i].name}</option>`;
             
            }
            option = option + `</select></p>`;

            return option;

        }
}
