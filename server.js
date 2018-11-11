const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port = process.env.PORT || 3000;

var app=express();

hbs.registerPartials(__dirname+"/views/partials");

hbs.registerHelper('getDate',()=>{return new Date().getFullYear();});

app.use(express.static(__dirname+"\\public_html"));

// app.use((req,resp,next)=>{

// 	resp.send('<h1>under maintainence</h1>');
// });


app.use((req,resp,next)=>{
	var date = new  Date().toString()+req.method+'\n';
	fs.appendFile('server.txt',date, function(args) {
		// body
	})
	console.log(date);
	next();});

app.set('view engine','hbs');

app.get('/',function(req,resp){ resp.render('home.hbs'); });

app.get('/404',function(req,resp){ resp.send('Page not found'); });

app.get('/about',function(req,resp){ resp.render('about.hbs')});

app .listen(port,()=>{
	console.log(`Server Started at ${port} port. `);
});