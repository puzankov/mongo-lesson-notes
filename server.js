let express = require('express');

let app = express();
let db = '';
let dbUrl = require('./config/db').dbUrl;
const { MongoClient } = require('mongodb');

app.use(express.urlencoded({extended: true}));



const client = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const db = client.db("notes");

    require('./routes/index')(app,db);

});


app.listen(8000, () => {
    console.log('Live on http://localhost:8000');
})