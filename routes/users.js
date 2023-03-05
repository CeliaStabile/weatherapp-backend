var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const City = require('../models/cities');
const User = require('../models/users');
const {checkBody} = require('../modules/checkBody');

const OWM_API_KEY = 'ce7418650c86eae6629dfcfdda141c14';

//créer un nouvel utilisateur 
router.post("/signup", (req, res) => {
 let patternEmail =  new RegExp(req.body.email,'i')
 //d'abord vérifier si tous les champs sont remplis même avant de faire la requête à la database
 //en utilisant notre fonction checkBody
 if(!checkBody(req.body, ['name','email','password']))

 {
     res.json({ result:   false, error: 'Missing or empty fields'}) }

  User.findOne({email : patternEmail}) 
  .then(data => {
    if(data){
            res.json({ result: false, error: 'User already exists' })
    } else {
        const newUser = new User ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });
         newUser.save()
         .then(res.json({result: true}))}
})
});

// POST /signin : route chargée de vérifier la connexion d’un utilisateur.

// Si l’email ou le mdp renvoyé est indéfini ou vide, renvoyez : { result: false, error: 'Missing or empty fields' }.


// Si aucun utilisateur est trouvé avec cet email et mdp, renvoyez : { result: false, error: 'User not found' }.


// Sinon, renvoyez : { result: true }.

router.post("/signin", (req, res) => {
    let patternEmail =  new RegExp(req.body.email,'i')
   
    if(!checkBody(req.body,['email','password'])) {
        res.json({result: false, error: "missing of empty fields"})
    }

     User.findOne({email : patternEmail, password: req.body.password}) 
     .then(data => {
        if(!data){
               res.json({ result: false, error: 'User not found' })
       } else {
           res.json({result: true})}
   })
   });

module.exports = router;
