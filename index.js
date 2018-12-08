//default libraries
const express     = require('express');
const redirect    = require('express-redirect');
const mongoose    = require('mongoose');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const helmet      = require('helmet');
const path        = require('path');
const morgan      = require('morgan');
const fs          = require('fs');
//custome libraries
const apiRoute    = require('./routes/api');
const keys        = require('./config/keys');
//initialize express server
var app = express();
redirect(app);


mongoose.set('useFindAndModify', false);
// creating connections with mongoDB server
mongoose.connection.openUri(keys.MongoURL, { useNewUrlParser: true }, (err,db) => {
  if(err){
    console.log('Unable to connect to MongoDB server : ' , err);
  }
  else{
    console.log('Successfully connected to MongoDB Server');
  }
});


//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(express.static(__dirname));

//display log to console
app.use(morgan('dev'))
//generate logs
// app.use(morgan('common' , {
//   stream : fs.createWriteStream(path.join(__dirname,'logs/access.log'), {flags : 'a'})
// }))


app.get('/', (req,res) => {
    console.log('open landing page');
    res.sendFile(path.join(__dirname+'/views/index.html'));
});

//fetch public resources
app.get('/:id', (req,res) => {
  var fileName = req.params.id;
  res.sendFile(path.join(__dirname, "public/images/" + fileName));
});


//redirect route
app.use('/api', apiRoute);



const port = process.env.PORT || 8080;

//initalize server
app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
