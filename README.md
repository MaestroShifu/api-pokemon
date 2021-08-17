# api-pokemon

# Como correr el proyecto
* Instalar las dependencias del mismo ``npm install``.
* Necesitara tener dentro de su maquina una base de datos postgresql para el manejo de la informacion del API.
Si necesita el [Docker-Compose](https://github.com/MaestroShifu/docker-save-life/blob/main/postgresql/docker-compose.yaml) que utilizo para correr mi proyecto de forma local.
* Una vez montada nuestra base de datos revisar el siguiente archivo de configuracion del entorno [Archivo-env](https://github.com/MaestroShifu/api-pokemon/blob/main/environment/development.env).
* Como puede ver en el archivo hay un parametro ``DATABASE_URL`` en donde tendra que modificarlo dependiento de su host de base de datos.
* Vamos a lanzar nuestras migraciones y los datos semilla con ``npm run migration:up`` y ``npm run seed:run``, esto creara las tablas en su base de datos local y agregara los datos base para que el proyecto empieze a funcionar.
* Corremos nuestro proyecto de forma ``development`` con el comando ``npm run dev``
* Y listo!! tiene su Api de pokemon lista para probarse.


# Documentacion
* Una vez tenga el proyecto corriendo satisfactoriamente ingresara por medio del navegador a esta [URL](http://localhost:3000/api-docs/#/).
* Tambien se le agregara la collection de Postman que se utilizo para el desarrollo de la misma [Postman-collection](https://github.com/MaestroShifu/api-pokemon/blob/main/static/Api%20Pokemon.postman_collection.json).
