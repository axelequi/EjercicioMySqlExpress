var mysql=require('mysql');

var conexion=mysql.createConnection({
    host:'remotemysql.com',
    user:'GtLlHg8RY7',
    password:'EHmf0Y1hGp',
    database:'GtLlHg8RY7'
});

conexion.connect(function (error){
    if (error)
        console.log('Problemas de conexion con mysql');
    else
        console.log('se inicio conexion');
});


module.exports=conexion;

