const express = require("express");
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/user');
const authRoutes = require('./api/routes/auth');

mongoose.connect("mongodb+srv://Divij:Divij2002@cluster0.aj0dc.mongodb.net/todoListDatabase", {
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
//Cors error handling
app.use((req,res,next)=>{
   res.header('Access-Control-Allow-Origin','*');
   res.header('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept, Authorization");

   if(req.method==='OPTIONS'){
      res.header('Access-Control-Allow-Methods','PUT,PATCH,GET,POST,DELETE');
      return res.status(200).json({});
   }
   next();
})


app.use('/user', userRoutes);
app.use('/auth', authRoutes);
//Error Handling
app.use((req,res,next) => {
   const error = new Error('Not found');
   error.status=404;
   next(error);
});

app.use((error, req, res, next) => {
   res.status(error.starus||500);
   res.json({
      error: {
         message: error.message
      }
   });
});

module.exports = app;
