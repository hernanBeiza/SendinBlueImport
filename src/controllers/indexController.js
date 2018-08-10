const fs = require('fs')
const path = require('path'); 

const chalk = require('chalk');
const request = require("request");

const configJSON = require('./../config/config.json')[process.env.NODE_ENV];
var config = require("./../config/config");
 

function saludar(req,res) {
	console.log(chalk.cyan("indexController: saludar();"));
    res.json({mensaje:"Bienvenido a la API de prueba de sesiones"});
}

function importarArchivo(req,res) {
	console.log(chalk.cyan("indexController: importarArchivo();"));
	console.log(chalk.yellow(config["archivo"]));

	const archivoBody = fs.readFileSync(config["archivo"]).toString();
	console.log(archivoBody);

	var request = require("request");
	var options = { 
	    headers: {
			'Content-Type': 'application/json',
			'api-key': config["api-key"]
	    },
		method: 'POST',
		url: 'https://api.sendinblue.com/v3/contacts/import',
		body: { 
			listIds: [config["idlista"]],
			fileBody: archivoBody 
		},
		json: true
	};

	request(options, function (error, response, body) {
		console.log(chalk.yellow("Fin carga de archivo "+ config["archivo"]));

		if (error) {
			console.log(chalk.red(error));
		    res.json({result:false,error:error});
		} else {
			console.log(chalk.cyan(body.toString()));
		    res.json({result:true,mensajes:"Fin carga de archivo "+config["archivo"],body:body});
		}

	});

}

function importarCarpeta(req,res) {
	console.log(chalk.cyan("indexController: importarCarpeta();"));
	console.log(chalk.yellow(config["carpeta"]));
	//1 Obtener archivos de la carpeta
	var listaArchivosCSV = fs.readdirSync(config["carpeta"]);
	var totalCargados = 0;
	var listaFiltradaCSV = [];
	//console.log(archivosCSV);

	//2 Filtrar según la extensión para evitar archivos basuras del sistema u otros 
	listaArchivosCSV.filter(function(element){
		var extName = path.extname(element);
		//Ojo con la mayúscula
		var extFilter = "csv";
		return extName === '.' + extFilter; 
	}).forEach(function(nombreArchivo) {
	    //console.log(nombreArchivo);
	    listaFiltradaCSV.push(nombreArchivo);
	});

	//3 Cargar uno a uno
	for (var i = 0; i < listaFiltradaCSV.length; i++) {
		var nombreArchivo = listaFiltradaCSV[i];

	    var ruta = config["carpeta"]+nombreArchivo;
		const archivoBody = fs.readFileSync(ruta).toString();
		//console.log(archivoBody);

		/*
		fs.readFile(config["archivo"], function read(err, data) {
		    if (err) {
		    	console.log(chalk.red(err));
		    } else {
			    console.log(data);	    	
		    }
		});
		*/

		var options = {
		    headers: {
				'Content-Type': 'application/json',
				'api-key': config["api-key"]
		    },
			method: 'POST',
			url: 'https://api.sendinblue.com/v3/contacts/import',
			body: { 
				listIds: [config["idlista"]],
				fileBody: archivoBody 
			},
			json: true
		};

		request(options, function (error, response, body) {
			console.log(chalk.yellow("Fin carga de archivo "+ listaFiltradaCSV[totalCargados]));
			if (error) {
				console.log(chalk.red(error));
			    res.json({result:false,error:error});
			} else {
				console.log(body);
				totalCargados++;
				console.log(chalk.yellow("Archivo " + totalCargados + " cargado de " + listaFiltradaCSV.length));
				if(totalCargados==listaFiltradaCSV.length){
					var mensajes = "Carga de archivos de la carpeta "+config["carpeta"] + " completada. Total de archivos cargados " + totalCargados + " de " + listaFiltradaCSV.length;
					console.log(chalk.cyan(mensajes));
					res.json({result:true,mensajes:mensajes});
				}
			}
		});

	};

}

module.exports = {
	saludar:saludar,
	importarArchivo:importarArchivo,
	importarCarpeta:importarCarpeta,
};
