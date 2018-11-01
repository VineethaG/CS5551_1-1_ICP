var createError = require('http-errors');
var cors = require('cors')

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');


const Schema = mongoose.Schema;
const User_Details = new Schema({
    First_Name:String,
    Last_Name: String,
    Email_Id: String,
    Password: String,
    Phone: Number
});
const UserRegistration_Model  = mongoose.model('User_Details', User_Details);
let db_promise = mongoose.connect('mongodb://Vineetha:vineetha9@ds145043.mlab.com:45043/lab3');
db_promise.then((data)=>{
    console.log('DB connection established !');
}).catch((err)=>{
    console.log(err.message);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(express.static(__dirname));


app.post('/register',(req,res)=>{
    let body = req.body;
    let userregistrationDetails = new UserRegistration_Model({
        First_Name:body.firstName,
        Last_Name: body.lastName,
        Email_Id: body.emailId,
        Password: body.password,
    });
     UserRegistration_Model.find({Email_Id:body.emailId},function (err, data) {
         if(data.length < 1)
         {
             userregistrationDetails.save((err, prod_res) => {
                 if (!err) {
                     let transporter = nodemailer.createTransport({
                         service: 'gmail',
                         auth: {
                             user: 'vineetha.gummadi@gmail.com', // generated ethereal user
                             pass: 'chinnu95##@@' // generated ethereal password
                         }
                     });


                     // setup email data with unicode symbols
                     let mailOptions = {
                         from: 'vineetha.gummadi@gmail.com', // sender address
                         to: body.emailId, // list of receivers
                         subject: 'Hi '+ body.firstName+ ', Thanks for Registering', // Subject line
                         html: '<b>Registered Successfully. You can login into the application using below link</b> <br>' +
                             '<a href="https://grisly-castle-45369.herokuapp.com/">https://grisly-castle-45369.herokuapp.com/</a>' // html body
                     };

                     // send mail with defined transport object
                     transporter.sendMail(mailOptions, (error, info) => {
                         if (error) {
                             return console.log(error);
                         }
                         console.log('Message sent: %s', info.messageId);
                         // Preview only available when sending through an Ethereal account
                         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                     });
                     res.send({
                         result: "Success",
                         message: "Details saved successfully"
                     });
                 } else {
                     res.status(400).send({
                         result: "Failure",
                         message: "Error in creating product",
                         error: err.message
                     });
                 }
             })
         }
         else {
             res.status(400).send({
                 result: "Email Already Exists"
             });
         }
    });

});


app.post('/login',(req,res)=>{
    let query = req.body;

     UserRegistration_Model.find({Email_Id:query.email},function(err, data) {
        if(data.length < 1)
        {
            res.status(400).send(
                {
                    result: "No User Found"
                }
            )
        }
       else if (!err ) {
            console.log(data[0].Password);
            if( data[0].Password == query.password) {
                res.send({
                    result: "Success",
                    data: data[0]
                });
            }else {
                console.log("Wrong Password");
                res.status(400).send(
                    {
                        result:"Wrong Password"

                    }
                )
            }
        }

        else {
            res.status(400).send({
                result: "Failure",
                message: "Error in fetching Email ID",
                error: err.message
            });
        }

    });

});

//updating the details
app.post('/update',(req,res)=>{
    let body = req.body;
    UserRegistration_Model.findOne({_id:body._id},function (err, data) {
        console.log(data);
        if (data != null && !err){
             data.First_Name = body.First_Name;
             data.Last_Name = body.Last_Name;
             data.Email_Id = body.Email_Id;
            data.Phone = body.Phone;
            data.save();
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vineetha.gummadi@gmail.com', // generated ethereal user
                    pass: 'password' // generated ethereal password
                }
            });


            // setup email data with unicode symbols
            let mailOptions = {
                from: 'vineetha.gummadi@gmail.com', // sender address
                to: body.Email_Id, // list of receivers
                subject: 'Hi '+ body.First_Name+ ', You have updated your profile successfully', // Subject line
                html: '<b>You can login into the application using below link</b> <br>' +
                '<a href="https://grisly-castle-45369.herokuapp.com/">https://grisly-castle-45369.herokuapp.com/</a>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
            res.send({
                result: "Success",
                data: data
            });
        }
        else{
            res.status(400).send({
                result: "Failure",

            });
        }

        });


});

app.get('/getUsers',(req,res)=>{
    UserRegistration_Model.find({},(err,data)=>{
        if(!err){
            console.log(data)
            res.send({
                result: "Success",
                data: data
            });
        }
        else{
            res.status({
                result:"Failure"
            })
        }
    });
});

// delete
app.post('/delete',(req,res) =>{
    var body = req.body;
    console.log(body._id);
    UserRegistration_Model.find({_id:body._id}).remove().exec();
        res.send({
                result:'User Deleted'
            });


});



// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;