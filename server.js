let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

//Moteur de template
app.set('view engine', 'ejs')

//Middleware
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())// parse application/json
app . use ( session ( {
    secret : ' awsdllfl ' , 
    resave : false , 
    saveUninitialized : true , 
    cookie : {  secure : false }   
  } ) )
app.use(require('./middlewares/flash'))
 //Routes
app.get('/',(request,response)=>{
    let Message = require('./models/message')
    Message.all(function(messages){
    response.render('pages/index',{messages: messages})
    })
    
})

app.post('/',(request,response)=>{
    console.log(request.body)
    //pour voir si le champ est vide
    if(request.body.message == undefined || request.body.message == ''){
        request.flash('error',"vous n'avez pas posté de Message ")
        response.redirect('/')
        
    }else{
        //bd
        let Message = require('./models/message')
        Message.create(request.body.message,function(){
            request.flash('success', " Enregistrement effectuez !")
            response.redirect('/')
        })
    }
})
app.listen(8080)