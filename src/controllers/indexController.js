const fs = require('fs')
const chalk = require('chalk');

var config = require("./../config/config");
 

function saludar(req,res) {
	console.log(chalk.cyan("indexController: saludar();"));
    res.json({mensaje:"Bienvenido a la API de prueba de sesiones"});
}

function importar(req,res) {
	console.log(chalk.cyan("indexController: importar();"));
	console.log(chalk.yellow(config["archivo"]));

	const archivoBody = fs.readFileSync(config["archivo"]).toString();
	console.log(archivoBody);
	/*
	fs.readFile(config["archivo"], function read(err, data) {
	    if (err) {
	    	console.log(chalk.red(err));
	    } else {
		    console.log(data);	    	
	    }
	});
	*/
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

module.exports = {
	saludar:saludar,
	importar:importar,
};
