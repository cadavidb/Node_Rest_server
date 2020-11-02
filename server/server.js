require('../config/config');

const express = require('express')

const app = express()


const bodyParser = require('body-parser')
    //middleware
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/usuario', function(req, res) {
    res.send('hola')
})

app.post('/usuario', function(req, res) {
    let body = req.body;
    res.send({
        "estudiante": body
    })
})

app.delete('/usuario', function(req, res) {
    res.send('hola peticion delete')
})

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id
    res.send('este es el id' + id)
})

app.listen(process.env.PORT, () => {
    console.log('servidor iniciado en el puerto ' + process.env.PORT);
})