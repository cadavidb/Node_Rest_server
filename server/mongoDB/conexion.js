const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true)
let bd = mongoose.connect(process.env.URLDB,

    { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {

        if (err) {
            console.log('error al conectarse');
            return;
        }
        console.log('MONGODB****funcionando');


    });


module.exports = bd