const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Car = new Schema({
  fabricante: {
    type: String
  },
  modelo: {
    type: String
  },
 ano: {
    type: String
  },
valor: {
    type: String
  },
  picture: {
    type: String
  }
},{
    collection: 'Car'
});

module.exports = mongoose.model('Car', Car);