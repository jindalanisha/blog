
const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');

const app=express();// creating our app
app.use(express.static('./public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var con = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "",
  database:'node_project'
});

con.connect(function(err) {
  if (!err) 
  console.log("Connected!");
else console.log("not Connected",err);
});

/*$query = 'SELECT * from health';
con.query($query, function(err, rows, fields) {
    if(err){
        console.log("An error ocurred performing the query.");
        return;
    }

    //console.log("size of rows "+rows.length+"  size of feilds "+fields.length);
    // for(i=0;i<rows.length;i++)
    // {
    // 	console.log("data : ",rows[i]);
    // }
    console.log("Query succesfully executed: ", fields);
});
*/

app.get('/health',function(request,response){
	con.query('SELECT title,author from health',function(err,rows,fields){
     if(err)
		response.redirect('/home');
	response.render('mypage.html',{title:"Health ",data:rows});
	});
})
app.get('/investment',function(request,response){
	con.query('SELECT title,author from investment',function(err,rows,fields){
		if(err)
		response.redirect('/home');
	response.render('mypage.html',{title:"Investment",data:rows});
	});
})

app.get('/technology',function(request,response){
	con.query('SELECT title,author from technology',function(err,rows,fields){
		if(err)
		response.redirect('/home');
	response.render('mypage.html',{title:"Technology",data:rows});
   });
})


app.get('/nature',function(request,response){
	con.query('SELECT title,author from nature',function(err,rows,fields){
		if(err)
		response.redirect('/home');
	response.render('mypage.html',{title:"Nature",data:rows});
   });
})


app.get('/personal',function(request,response){
	con.query('SELECT title,author from personal_devlopment',function(err,rows,fields){
		if(err)
		response.redirect('/home');
	response.render('mypage.html',{title:"Personal Development",data:rows});
   });
})


app.get('/travel',function(request,response){
	con.query('SELECT title,author from travel',function(err,rows,fields){
		if(err)
		response.redirect('/home');
	response.render('mypage.html',{title:"Travel",data:rows});
    });
})



app.get('/home',function(request,response){
	response.render('home.html')
});

app.get('/view',function(request,response){
	var myans;
	if(request.query.field=='Personal Development')
        myans='personal_devlopment';
    else myans=request.query.field.toLowerCase()
    $qry="SELECT content FROM "+myans+" WHERE title = "+mysql.escape(request.query.title);
    con.query($qry,function(err,rows,fields){
    if (err) 
      {
         console.log("error"+err);
         response.redirect('/home');
      }
   else
      {
          console.log(rows);
          response.render('viewpage.html',{data:rows});
      }
})

});
/*app.get('/view',function(request,response){
	var myans=request.query.field.toLowerCase()
	$qry="SELECT content FROM "+myans+" WHERE title = "+mysql.escape(request.query.title);
	con.query($qry,function(err,rows,fields){
		if (err) 
		{
			console.log("error"+err);
			response.redirect('/home');
		}
		else
		{
			console.log(rows);
			response.render('viewpage.html',{data:rows});
		}
	});
	
});
/*
app.get('/view',function(request,response){
	/*var field;
	var title=request.query.title;
	console.log(request.query.field+'ayo'+request.query.title);
	if(request.query.field=='Health ')
		field='health';
	else if(request.query.field=='Investment')
		field='investment';
	else if(request.query.field=='Nature')
		field='nature';
	else if(request.query.field=='Technology')
		field='technology';
	else if(request.query.field=='Travel')
		field='travel';
	else field='personal_devlopment';
    
    console.log('SELECT content from '+field+' where title="'+title+'";');
	con.query('SELECT content from '+field+' where title='+title+';',function(err,rows,fields){
		if(err)
		{
			console.log("errror");
			response.redirect('/');
		}
		else
	    response.render('viewpage.html',rows);
    });
    response.render('viewpage.html');
})*/
app.get('/writeblog',function(request,response){
	response.render('writeblog.html');
})



app.post('/uploadblog',function(request,response){

$qery="INSERT INTO "+request.body.type+" (title, author, content, date_of_modify) VALUES ( "+mysql.escape(request.body.title)+" ,"+mysql.escape(request.body.author)+" ,"+mysql.escape(request.body.content)+" ,"+mysql.escape(request.body.date)+" )";
console.log($qery);
con.query($qery,function(err,rows,fields){
if(err)
{
console.log("error while inserting");
response.redirect('/home');
}
else
	//window.alert("Sucessfull");
response.redirect('/home');
})
});



app.listen(9000, function () {
	console.log('Server started at http://localhost:9000');
})

function sayhello(name){
	console.log("Hello "+ name);
}

sayhello("anisha");