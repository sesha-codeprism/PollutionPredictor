const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient
const user = require("./controllers/User");
const InitiateMongoServer = require("./config/db");



const PORT = process.env.PORT || 5000;
// app.use(bodyParser.urlencoded({ extended: true }))
const connectionString = 'mongodb+srv://sesha:ZXcv!@34@cluster0-phzw0.mongodb.net/test?retryWrites=true&w=majority'

InitiateMongoServer();

app.use(bodyParser.json());

// MongoClient.connect("mongodb://localhost:27017/", { useUnifiedTopology: true })
//   .then(client => {
//     console.log('Connected to Database')
//     const db = client.db('testDB')
//     const collection = db.collection('testC');
//     app.post('/post', (req, res) => {
//       collection.insertOne(req.body)
//         .then(result => {
//           res.send(result)
//         })
//         .catch(error => console.error(error))  
//     })
//     app.get('/get', (req, res) => {
//       db.collection('testC').find().toArray()
//         .then(results => {
//           res.send(results)
//         })
//         .catch(error => console.error(error))
//     })


//   })
//   .catch(console.error)



app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

app.use("/user", user);



app.use(express.static(path.join(__dirname, 'templates')))





