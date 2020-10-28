var express = require('express');
var router = express.Router();

var bd=require('./bd');

//Creación de la tabla
router.get('/creartabla', function(req, res, next) {
   bd.query('drop table if exists alumnos',function (error,resultado){
        if (error) {
          console.log(error);                
          return;
        }
   });    
   bd.query('create table alumnos ('+
                       'MatriculaAlumno int primary key auto_increment,'+
                       'NombreAlumno varchar(30),'+
                       'ApellidoAlumno varchar(30),'+
                       'CursoAlumno int,'+
                       'DivisionAlumno int,'+
                       'TurnoAlumno varchar(7),'+
                       'FechaNacAlumno date,'+
                       'EmailAlumno varchar(30)'+
                    ')', function (error,resultado){
        if (error) {            
          console.log(error);                
          return;
        }  
  });    
  res.render('mensajealumnos',{mensaje:'La tabla se creo correctamente.'});  
});


//Alta de registros
router.get('/alta', function(req, res, next) {
  res.render('altaalumnos');
});


router.post('/alta', function(req, res, next) {
      var registro={
          NombreAlumno:req.body.NombreAlumno,
          ApellidoAlumno:req.body.ApellidoAlumno,
          CursoAlumno:req.body.CursoAlumno,
          DivisionAlumno:req.body.DivisionAlumno,
          TurnoAlumno:req.body.TurnoAlumno,
          FechaNacAlumno:req.body.FechaNacAlumno,
          EmailAlumno:req.body.EmailAlumno
        };
      bd.query('insert into alumnos set ?',registro, function (error,resultado){
          if (error){
              console.log(error);
              return;
          }
      });    
  res.render('mensajealumnos',{mensaje:'La carga se efectuo correctamente'});
});


//Listado de registros
router.get('/listado', function(req, res, next) {
  bd.query('select MatriculaAlumno,NombreAlumno,ApellidoAlumno,CursoAlumno,DivisionAlumno,TurnoAlumno,FechaNacAlumno,EmailAlumno from alumnos', function(error,filas){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        res.render('listaralumnos',{alumnos:filas});
  });
});


//Consulta
router.get('/consulta', function(req, res, next) {
  res.render('consultaalumnos');
});


router.post('/consulta', function(req, res, next) {
  bd.query('select NombreAlumno,ApellidoAlumno,CursoAlumno,DivisionAlumno,TurnoAlumno,FechaNacAlumno,EmailAlumno from alumnos where MatriculaAlumno=?',req.body.MatriculaAlumno, function(error,filas){
            if (error) {            
                console.log('error en la consulta');
                return;
            }
            if (filas.length>0) {
                res.render('listadoconsulta',{alumnos:filas});
            } else {
                res.render('mensajealumnos',{mensaje:'No existe la matricula de alumno ingresada'});
            }    
        });
});


//Modificacion
router.get('/modificacion', function(req, res, next) {
  res.render('consultamodificacion');
});


router.post('/modificar', function(req, res, next) {
  bd.query('select MatriculaAlumno,NombreAlumno,ApellidoAlumno,CursoAlumno,DivisionAlumno,TurnoAlumno,FechaNacAlumno,EmailAlumno from alumnos where MatriculaAlumno=?',req.body.MatriculaAlumno, function(error,filas){
            if (error) {            
                console.log('error en la consulta');
                return;
            }
            if (filas.length>0) {
                res.render('formulariomodifica',{alumnos:filas});
            } else {
                res.render('mensajealumnos',{mensaje:'No existe la matricula de alumno ingresada'});
            }    
        });
});


router.post('/confirmarmodifica', function(req, res, next) {
  var registro={
        NombreAlumno:req.body.NombreAlumno,
        ApellidoAlumno:req.body.ApellidoAlumno,
        CursoAlumno:req.body.CursoAlumno,
        DivisionAlumno:req.body.DivisionAlumno,
        TurnoAlumno:req.body.TurnoAlumno,
        FechaNacAlumno:req.body.FechaNacAlumno,
        EmailAlumno:req.body.EmailAlumno
      };    
  bd.query('UPDATE alumnos SET ? WHERE ?',[registro,{MatriculaAlumno:req.body.MatriculaAlumno}], function(error,filas){
            if (error) {            
                console.log('error en la consulta');
                console.log(error);
                return;
            }
            res.render('mensajealumnos',{mensaje:'El alumno fue modificado'});
        });
});


module.exports = router;
