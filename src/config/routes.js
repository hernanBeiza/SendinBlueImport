//Importar los módulos requeridos
var express = require('express');
var cors = require('cors');

//config
var config = require("./config");
//indexController
var indexController = require ("./../controllers/indexController");

//obtenemos el app contenido en app.js
module.exports = function(app){

	app.use(cors());
	
	app.all('/', function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');

		
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		//res.header('Access-Control-Allow-Headers', 'Content-Type');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		/*
		res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
		res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
		*/
		next();
	});
	app.all('/*', function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		//res.header('Access-Control-Allow-Headers', 'Content-Type');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		/*
		res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
		res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
		*/
		next();
	});
	
	app.get("/",indexController.saludar);
	app.post("/importarArchivo",indexController.importarArchivo);
	app.post("/importarCarpeta",indexController.importarCarpeta);
};