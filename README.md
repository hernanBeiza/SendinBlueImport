# SendinBlueImport

## Pasos para dividr CSV

Procesar Excel: Revisar que contenga emails válidos

Exportar Excel en un gran CSV

Dividir el gran CSV en pequeños usando el comando 

`split -l 1000 gran.csv`

Renombrar todos los csv pequeños generados usando el comando 

`for i in *; do mv "$i" "$i.csv"; done`

## Modificar archivo de contactos CSV en la configuración

Se modifica el archivo según las necesidades especificas del CSV (datos mal parseados, etc)

## Actualizar el archivo de configuración

## Ejecutar la ruta correspondiente
Consultar routes.js para identificar si es un archivo .csv o una carpeta con varios .csv
