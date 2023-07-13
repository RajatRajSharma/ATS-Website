const express = require("express");  
const { default: mongoose } = require("mongoose");
const path = require("path");
const ATSweb = express();   
const bodyparser = require("body-parser");      // require body-parser for further use
mongoose.connect('mongodb://127.0.0.1:27017/contactATS',{
    useNewUrlParser: true,	
    useUnifiedTopology: true
    });
const port = 8003;  

//  DEFINE MONGOOSE SCHEMA
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
var ContactS = mongoose.model('ContactS',ContactSchema);

//  EXPRESS SPECIFIC STUFF
ATSweb.use('/static', express.static('static'))    //for saving static files
ATSweb.use(express.urlencoded({extended: true}))

//  PUG SPECIFIC STUFF
ATSweb.set('view engine', 'pug')   //set the template engine as pug
ATSweb.set('views', path.join(__dirname, 'views'))   //Set the views directory

//  END_POINTS
ATSweb.get('/', (req,res)=>{
    const params = { }
    res.status(200).render('home.pug',params)		//This is for Home Page
})

ATSweb.get('/contact', (req,res)=>{
    const params = { }
    res.status(200).render('contact.pug',params)		//This is for contact page
})

ATSweb.post('/contact', (req,res)=>{     //Method for post request
    var myData = new ContactS(req.body);     // takes the data
    myData.save().then(()=>{             // saves the data
        res.send("This data has been saved to the Database")
    }).catch(()=>{
        res.status(400).send("item is unable to save in database");
    });         

    // res.status(200).render('contact.pug')       //there is no params for post request		
})
// if we want to save post request then we will use command : npm install body-parser
//   START THE SERVER
ATSweb.listen(port, ()=>{
    console.log(`The application started sucessful on port ${port}`)
});
