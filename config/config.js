//configuracion del puerto

process.env.PORT = process.env.PORT || 3000;

//entorno
process.env.NODE_ENV=process.env.NODE_ENV || 'dev';

//base de datos
let urlDB;
if (process.env.NODE_ENV==='dev') {
    urlDB='mongodb://localhost:27017/usuarios';
}else{
    urlDB='mongodb+srv://brayan:sTfvMNsQ0nxWUiMK@bdcloud.8lvgj.mongodb.net/usuarios'
}
process.env.URLDB=urlDB;