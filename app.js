var express = require('express');
var app = express();
let session = require('express-session')
let path = require('path')
let multer = require('multer')


//parametre de stockage
const storage = multer.diskStorage({
    destination :'./public/logos',
    filename    : (req,file,cb)=>{
         cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))       
    }
})


//initialisation upload
const upload = multer({
    storage     : storage,
    limits      : {fileSize: 1000000},

}).single('logoEcole')

//Verifiction de l'extension du logo
function VerificationExtension(file,cb){
const fileTypes = /jpeg|jpg|png|gif/;
//check extend
const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//check mime
const mimetype = fileTypes.test(file.mimetype)
}


//Moteur de template
app.set('view engine', 'ejs')
//middlewares
app.use('/assets',express.static('public'))
app.use(express.json())//a rechercher
app.use(express.urlencoded({extended:false}))//a rechercher
app . use ( session ( {
    secret : ' awsdllfl ' , 
    resave : false , 
    saveUninitialized : true , 
    cookie : {  secure : false }   
  } ) )
app.use(require('./middlewares/flash'))


//les Routes
app.get('/Bullectronic/Accueil', function(req,res){
    //pour afficher les données 
    let Ecole = require('./models/ecole')
    Ecole.afficher(function(ecole){
    res.render('pages/accueil',{ecoles : ecole })  
    })
});

app.get('/Bullectronic', function(req,res){
    res.render('pages/index')
});

app.get('/Bullectronic/Ajouter', function(req,res){
    res.render('pages/ajouter')
});

app.get('/Bullectronic/modifier/:id', function(req,res){
    let a=req.params.id
    console.log(a)
    res.render('pages/modifier')

});



app.get('/bullectronic/supprimer/:id',(req, res)=>{
    let a=req.params.id
    console.log(a)
    let Ecole = require('./models/ecole')
    Ecole.supprimer(a,function(){
    res.redirect('/bullectronic/Accueil')
    })
})

app.post('/Bullectronic',(req,res)=>{
//authentification
 if(req.body.user =='stanislas' && req.body.mdp =='0826016607'){
    res.redirect('/Bullectronic/Accueil')
 }else{
     let err
    res.render('pages/index',{err:"Identifiant ou mot de passe incorrecte"})
   // req.flash('err', " Identifiant ou mot de passe incorrecte")
 }
});


app.post('/Bullectronic/Ajouter',(req,res)=>{
    //recuperation l'image
    var error
   
    upload(req,res,(err)=>{

        if(err){ 
            res.render('pages/ajouter',{
                msg : err
            })
        }else{
            console.log(req.file.filename)

                //recuperation des donnees en json
                     var school ={
                            'nom'      : req.body.nomEcole,
                            'categorie': req.body.categorieEcole,
                            'commune'  : req.body.communeEcole,
                            'quartier' : req.body.quartierEcole,
                            'avenue'   : req.body.avenueEcole,
                            'numero'   : req.body.numeroEcole,
                            'logo'     : req.file.filename
                        }

                        console.log(school)
                        let Ecole = require('./models/ecole')
                            Ecole.ajouter(school.nom,school.categorie,school.commune,school.quartier,school.avenue,school.numero,school.logo,function(){
                            res.redirect('/bullectronic/Accueil')
                        })


        }
    })

});

app.post('/Bullectronic/modifier/:id',(req,res)=>{
    let a=req.params.id
    console.log(a)
    upload(req,res,(err)=>{
        if(err){
            res.render('pages/ajouter',{
                msg : err
            })
        }else{
            console.log(req.file.filename)

                //recuperation des donnees en json
                var school ={
                    'nom'      : req.body.nomEcole,
                    'categorie': req.body.categorieEcole,
                    'commune'  : req.body.communeEcole,
                    'quartier' : req.body.quartierEcole,
                    'avenue'   : req.body.avenueEcole,
                    'numero'   : req.body.numeroEcole,
                    'logo'     : req.file.filename
                }
                let Ecole = require('./models/ecole')
                Ecole.modifier(a,school.nom,school.categorie,school.commune,school.quartier,school.avenue,school.numero,school.logo,function(){
                res.redirect('/bullectronic/Accueil')
                                    })
            }
    })
});
app.listen(3000);