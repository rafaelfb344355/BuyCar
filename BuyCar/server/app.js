var express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/BuyCar', { useNewUrlParser: true , useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)});

const CarRoute = require('./routes/car.route');
const Pet = require('./model/Car');
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/car', CarRoute);
app.get('/', CarRoute);
app.get("/car/:id",CarRoute);
app.get("/car/:name",CarRoute);


app.listen(3000,function(){
    console.log('Listening on port 3000!');
});