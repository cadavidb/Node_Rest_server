//configuracion del puerto

process.env.PORT = process.env.PORT || 3000;

//vencimiento del token
process.env.Vtoken='1 day';

process.env.semilla=process.env.semilla || 'semilla desarrollo'



//google client id
process.env.clientid=process.env.clientid || '1076107682274-evqdi2hgctjsin2c0r8u7hdbldf7l5le.apps.googleusercontent.com'

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