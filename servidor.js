const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('acamica', 'lfd123', 'lfd123456789', {
  host: 'db4free.net',
  dialect:'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});




app.use(express.json());

try {

  sequelize.authenticate();
  // //CONSULTA SELECT COMUN 
 // sequelize.query('SELECT * FROM libro',{type:sequelize.QueryTypes.SELECT}).then(function(resul){console.log(resul)});

  // //CONSULTA SELECT CON WHERE
  // sequelize.query('SELECT titulo FROM libro WHERE titulo = :titulo or id_autor = :id_autor',{replacements:{titulo:'LIBRO',id_autor:'1'} ,type:sequelize.QueryTypes.SELECT}).then(function(resul){console.log(resul)});

  // //CONSULTA PARA REALIZAR UPDATE
  // let titulo_nuevo = 'UN NUEVO TITULO 4'
  // sequelize.query(`UPDATE  libro set titulo = "${titulo_nuevo}" WHERE id_libro = :id_libro `,{replacements:{id_libro:1}}).then(function(resul){console.log(resul)});


  // //CONSULTA PARA REALIZAR DELETE
  // sequelize.query(`DELETE FROM libro WHERE id_libro = :id_libro `,{replacements:{id_libro:2}}).then(function(resul){console.log(resul)});


  // //CONSULTA PARA REALIZAR INSERT
  // sequelize.query('INSERT INTO libro( `titulo`, `descripcion`, `id_autor`,`anyo_publicacion`) VALUES (?,?,?,?)',
  // {replacements:['Libro33','uN LIBRO que no es Libro2DSEF',1,2020]}).then(function(resul){console.log(resul)});




  console.log('Connection has been established successfully.');

} catch (error) {
  console.error('Unable to connect to the database:', error);
}

//INICIO DE SERVIDOR
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
