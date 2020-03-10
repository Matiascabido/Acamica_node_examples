const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('zP3QbMPjKj', 'zP3QbMPjKj', 'QjafH45ab1', {
  host: 'remotemysql.com',
  dialect:'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});




app.use(express.json());

try {

  sequelize.authenticate();
  //CONSULTA SELECT COMUN 
  sequelize.query('SELECT * FROM libros',{type:sequelize.QueryTypes.SELECT}).then(function(resul){console.log(resul)});

  //CONSULTA SELECT CON WHERE
  sequelize.query('SELECT titulo FROM libros WHERE titulo = :titulo or id_autor = :id_autor',{replacements:{titulo:'LIBRO',id_autor:'1'} ,type:sequelize.QueryTypes.SELECT}).then(function(resul){console.log(resul)});

  //CONSULTA PARA REALIZAR UPDATE
  let titulo_nuevo = 'UN NUEVO TITULO 4'
  sequelize.query(`UPDATE  libros set titulo = "${titulo_nuevo}" WHERE id_libro = :id_libro `,{replacements:{id_libro:1}}).then(function(resul){console.log(resul)});


  //CONSULTA PARA REALIZAR DELETE
  sequelize.query(`DELETE FROM libros WHERE id_libro = :id_libro `,{replacements:{id_libro:2}}).then(function(resul){console.log(resul)});


  //CONSULTA PARA REALIZAR INSERT
  sequelize.query('INSERT INTO libros( `titulo`, `description`, `id_autor`) VALUES (?,?,?)',
  {replacements:['Libro33','uN LIBRO que no es Libro2DSEF',1]}).then(function(resul){console.log(resul)});




  console.log('Connection has been established successfully.');

} catch (error) {
  console.error('Unable to connect to the database:', error);
}

//INICIO DE SERVIDOR
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
