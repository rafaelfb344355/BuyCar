const express = require('express');
const app = express();
const carRoutes = express.Router();
const Car = require('../model/Car');

// api to add car
carRoutes.route('/add').post(function (req, res) {
  let car = new Car(req.body);
  car.save()
  .then(car => {
    res.status(200).json({'status': 'success','mssg': 'car added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get cars
carRoutes.route('/').get(function (req, res) {
  Car.find(function (err, cars){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','cars': cars});
    }
  });
});

carRoutes.route('/car/:fabricante').get(function (req, res) {
  let fabricante = req.params.fabricante;
  
  Car.find({ fabricante: fabricante }, function(err, cars) {
    if (err) {
      // Tratar erros de busca no banco de dados
      res.status(500).send('Erro interno do servidor');
    } else if (cars.length === 0) {
      // Lidar com o caso em que nenhum carro é encontrado com o fabricante fornecido
      res.status(404).send('Nenhum carro encontrado');
    } else {
      // Caso carros sejam encontrados, você pode retorná-los como resposta
      res.status(200).json(cars);
    }
  });
});


// api to get car
carRoutes.route('/car/:id').get(function (req, res) {
  let ID = req.params.id;
  Car.findById(ID, function (err, car){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','car': car});
    }
  });
});

// api to update route
carRoutes.route('/update/:id').put(function (req, res) {
    Car.findById(req.params.id, function(err, car) {
    if (!car){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        car.fabricante = req.body.fabricante;
        car.email = req.body.email;
        car.phone_number = req.body.phone_number;

        car.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
carRoutes.route('/delete/:id').delete(function (req, res) {
  Car.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = carRoutes;