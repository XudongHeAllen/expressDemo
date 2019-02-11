var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require ('body-parser');
var multer = require('multer');
var urlencodedParser = bodyParser.urlencoded({extended : false})

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({ dest: '/temp/'}).array('image'));

app.get('/index.html', function (req, res){
	res.sendFile(__dirname + "/" + "index.html");
})

//for index 2
app.get('/index2.html', function (req, res){
	res.sendFile(__dirname + "/" + "index2.html");
})

//for index 3 (uploading)
app.get('/index3.html', function (req, res){
	res.sendFile(__dirname + "/" + "index3.html");
})

//for index 2
app.post('/process_post', urlencodedParser, function(req, res){
	//output in JSON
	var response2 = {
		"first_name": req.body.first_name,
		"last_name": req.body.last_name
	};
	console.log(response2);
	res.end(JSON.stringify(response2));
})

//for index 1
app.get('/process_get', function(req, res){
	var response ={
		"first_name": req.query.first_name,
		"last_name": req.query.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));
})

//for index 3
app.post('/file_upload', function (req, res) {
 
   console.log(req.files[0]);  
 
   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response3 = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname
              };
          }
          console.log( response3 );
          res.end( JSON.stringify( response3 ) );
       });
   });
})

var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port

	console.log ("Access Address:   http://%s:%s", host, port)
})