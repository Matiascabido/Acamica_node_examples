const express = require('express');
const app = express();


class Libro {
 
  constructor(id, titulo,descripcion,anioPublicacion){
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.anioPublicacion = anioPublicacion;
  };
 
  toString(){
    return {id: this.id, titulo: this.titulo,descripcion:this.descripcion,anioPublicacion:this.anioPublicacion};
  };
 
};

class Autor{

  constructor(id, nombre,apellido,fechaNacimiento,libro = []){
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fechaNacimiento = fechaNacimiento;
    this.libro = libro;
  };

  toString(){
    return {id: this.id, nombre: this.nombre,
    apellido:this.apellido, fechaNacimiento:this.fechaNacimiento, libro:this.libro};
  };

}


const MobyDick = new Libro(1,'MobyDick','libro de cuentos',1993);
const Quijote = new Libro(2,'Qujote','libro de fantasia',1980);
const VueltaAlMundo = new Libro(3,'Vuelta al mundo en 80 dias','libro de sc-fi',1830);

const escritor = new Autor(1,'Mati','C',20029,[MobyDick.toString(),Quijote.toString(),VueltaAlMundo.toString()]);
const escritor2 = new Autor(2,'Lucas','C',20029,[MobyDick.toString()]);


let contactos = [];
let autores = [escritor,escritor2];

app.use(express.json());


//MIDLEWARRES
function log(req,res,next){
	const { method, path, query, body} = req;
	console.log(`${method} - ${path} - ${query} -${body} `);
	next();
}


//VALIDAR PARA OBTENER INFO
function validarAuroId(req,res,next){
  let a = {};
  if( a =  autores.find(i =>  i.id == req.params.id)){
    res.locals.autor_id = a;
    next();
  }else{
    res.status(404).json('Autor no encontrado');
  }
}

function getLibros(req,res,next){
  let a = {};
  if( a =  autores.find(i =>  i.id == req.params.id)){
    res.locals.libros = a.libro;
    next();
  }else{
    res.status(404).json('Libros inexistentes para ese autor');
  }

}

function validarLibroId(req,res,next){
  let a = {};
  let b = {};
  if(a = autores.find(i =>  i.id == req.params.id)){
    if(b = a.libro.find(i =>  i.id == req.params.idLibro)){
      console.log(b);
      res.locals.libro = b;
      next();
    }else{
      res.status(404).json('Libro inexistente para ese autor');
    } 
  }else{
    res.status(404).json('Autor no existente');
  }
}


// VALIDAR PARA AGREGAR INFO
function validar(req,res,next){
  let autor = req.body;
  if(autores.find(a => autor.id == a.id && autor.nombre == a.nombre)){
    res.status(409).json('Fallo al guardar los datos');
  }else{
    res.locals.autor = autor;
    autores.push(autor);
    next();
  }   
}

function validarNuevoLibro(req,res,next){
  let a = {};
  let libro = req.body;
  if( a = autores.find(i =>  i.id == req.params.id)){
    if(a.libro.find(i =>  i.id == libro.id )){
      res.status(201).json('Libro existente');
    }else{
      a.libro.push(libro);
      res.locals.libro = libro;
      next();
    }
   
  }else{
    res.status(404).json('Autor inexistente');
  }

}


//VALIDAR PARA ELIMINAR INFO
function validarDelete(req,res,next){
  let a = [];
  if(autores.find(i =>  i.id == req.params.id)){
    autores.forEach(i =>{i.id != req.params.id ? a.push(i):null});
    if(a){
      autores = [];
      a.forEach(b=> autores.push(b));
      next();
    }
  }else{
    res.status(404).json('Autor no encontrado');
  }
}

function validarDeleteLibro(req,res,next){
  let b = [];
  if(a = autores.find(i =>  i.id == req.params.id)){
   if(a.libro.find(i =>  i.id == req.params.idLibro)){
    a.libro.forEach(libros => {
      if(libros.id != req.params.idLibro){
        b.push(libros);
      }
    });
    autores.forEach(autor => {
      if(autor.id == a.id){
        autor.libro = b;
        next();
      }
    });
  }else{
    res.status(404).json('Libro no existente');
  }
  }else{
    res.status(404).json('Autor inexistente');
  }
}

app.use(log);

//RUTAS

//OBTENER INFO
app.get('/', function (req, res) {
  res.send(contactos);
});

app.get('/autores', (req,res)=>{
  res.json(autores);
});

app.get('/autores/:id', validarAuroId,(req,res)=>{
    res.status(200).json(`${res.locals.autor_id.name} esta entre nuestros autores`);
});

app.get('/autores/:id/libros',getLibros,(req,res)=>{
  res.status(200).json(res.locals.libros);
});

app.get('/autores/:id/libros/:idLibro', validarLibroId,(req,res)=>{
  res.status(200).json(`${res.locals.libro.titulo} - ${res.locals.libro.descripcion}`);
});


// AGREGAR INFO
app.post('/contacto', (req,res)=>{
  contactos.push(req.body);
  console.log(contactos);
  res.json("contacto agregado");
  
});

app.post('/autores', validar,(req,res)=>{
  res.status(201).json(res.locals.autor);

});

app.post('/autores/:id/libros', validarNuevoLibro,(req,res)=>{
  res.status(201).json(`${res.locals.libro.titulo} de ${res.locals.libro.anioPublicacion} fue agregado correctamente`);
});


//EDITAR INFO 




//ELIMINAR INFO
app.delete('/autores/:id', validarDelete,(req,res)=>{
  res.status(204).json('Autor eliminado con exito');
});

app.delete('/autores/:id/libro/:idLibro', validarDeleteLibro,(req,res)=>{
  res.status(204).json('Libro eliminado con exito');
});






//INICIO DE SERVIDOR
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



