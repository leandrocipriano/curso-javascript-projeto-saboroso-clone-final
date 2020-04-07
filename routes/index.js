var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var router = express.Router();
var reservations = require('./../inc/resevations');
var contacts = require('./../inc/contacts');


/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results =>{
    //Render é o método que vai mesclar os dados com o template js
    res.render('index', {
      title: 'Restaurante Saboroso!',
      menus: results,
      isHome: true
    })

  }); 
  //res.render('index', { title: 'Restaurante Saboroso!' });

});

router.get('/reservations', function(req, res, next){

  menus.getMenus().then(results => {    
    reservations.render(req, res, results);
  });
  
});

router.get('/contacts', function(req, res, next){

  menus.getMenus().then(results =>{
    contacts.render(req, res, results);
  });
  
});

router.post('/contacts', function(req, res, next){

  if(!req.body.name){
    menus.getMenus().then(results => {    
      contacts.render(req, res, results, "Digite o nome");
    });
  } else if (!req.body.email){
    menus.getMenus().then(results => {    
      contacts.render(req, res, results, "Digite o e-mail");
    });
  } else if (!req.body.message){
    menus.getMenus().then(results => {    
      contacts.render(req, res, results, "Digite a sua mensagem");
    });
  } else {
    //res.send(req.body);
    contacts.save(req.body).then(results => {
      menus.getMenus().then(menusItens => {   
        req.body = {};

        contacts.render(req, res, menusItens, null, "Mensagem enviada com sucesso. Em breve, entraremos em contato!" );
      
      });
    }).catch(err => {

      menus.getMenus().then(menusItens => {   
        contacts.render(req, res, menusItens, err.message);
      });
      
    });
  }

});

router.get('/menus', function(req, res, next){

  menus.getMenus().then(results => {

    res.render('menus', {
      title: 'Menus - Restaurante Saboroso!',
      background:'images/img_bg_1.jpg',
      greeting:'Saboreie nosso menu!',
      menus: results,
      isHome: false
    });

  });
    
});

router.get('/reservations', function(req, res, next){

  menus.getMenus().then(results => {    
    reservations.render(req, res, results);
  });
  
});

router.post('/reservations', function(req, res, next){

  if(!req.body.name){
    menus.getMenus().then(results => {    
      reservations.render(req, res, results, "Digite o nome");
    });
  } else if (!req.body.email){
    menus.getMenus().then(results => {    
      reservations.render(req, res, results, "Digite o e-mail");
    });
  } else if (!req.body.people){
    menus.getMenus().then(results => {    
      reservations.render(req, res, results, "Selecione o número de pessoas");
    });
  } else if (!req.body.date){
    menus.getMenus().then(results => {    
      reservations.render(req, res, results, "Informe a data do evento");
    });
  } else if (!req.body.time){
    menus.getMenus().then(results => {    
      reservations.render(req, res, results, "Informe a hora do evento");
    });
  } else {
    //res.send(req.body);
    reservations.save(req.body).then(results => {
      menus.getMenus().then(menusItens => {   
        req.body = {};

        reservations.render(req, res, menusItens, null, "Reserva realizada com sucesso!" );
      
      });
    }).catch(err => {

      menus.getMenus().then(menusItens => {   
        reservations.render(req, res, menusItens, err.message);
      });
      
    });
  }

  
  
});

router.get('/services', function(req, res, next){

  menus.getMenus().then(results => {

  res.render('services', {
    title: 'Serviços - Restaurante Saboroso!',
    background:'images/img_bg_1.jpg',
    greeting:'É um prazer poder servir!',
      menus: results,
      isHome: false
    });

  });
  
});

module.exports = router;
