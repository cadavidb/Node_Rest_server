//configuracion del puerto

process.env.PORT = process.env.PORT || 8080;

//entorno
process.env.NODE_ENV=process.env.NODE_ENV || 'dev';

//base de datos
let urlDB;
if (process.env.NODE_ENV==='dev') {
    urlDB='mongodb://localhost:27017/usuarios';
}else{
    urlDB=process.env.urldb
}
process.env.URLDB=urlDB;