var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

const Place = require('./models/Place');

const db = require('./config/database');
db.connect();


var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// CRUD
app.post('/places',(req, res)=>{
    Place.create({
    title:             req.body.title,
    description:       req.body.description,
    acceptsCreditCard: req.body.acceptsCreditCard,
    openHour:          req.body.openHour,
    closeHour:         req.body.closeHour
    // title: "Menteware Office",
    // description: "Best software company",
    // acceptsCreditCard: true,
    // openHour: 0,
    // closeHour: 24
  }).then(doc=>{
      res.json(doc)
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
})

app.get('/places',(req, res)=>{
  // Show all places
  Place.find({})
    .then(docs=>{
      res.json(docs);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    })
});

// Show only one place. Wildcards :id
app.get('/places/:id',(req,res)=>{
  // res.json(req.params.id);
  // Place.findOne({})
  Place.findById(req.params.id)
    .then(doc=>{
      res.json(doc);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    })
})

// Update
app.put('/places/:id',(req, res)=>{
    // Place.findById(req.params.id)
    //   .then(doc=>{
    //     doc.title =              req.body.title;
    //     doc.description =        req.body.description;
    //     doc.acceptsCreditCard =  req.body.acceptsCreditCard;
    //     doc.openHour =           req.body.openHour;
    //     doc.closeHour =          req.body.closeHour;
    //     doc.save();
    //   })
    let attributes = ['title','description', 'acceptsCreditCard',
                    'openHour', 'closeHour'];
    let placeParams = {}
    attributes.forEach(attr=>{
      if(Object.prototype.hasOwnProperty.call(req.body, attr))
        placeParams[attr] = req.body[attr];
    });             
    // Place.update({'_id': req.params.id},placeParams).then(doc=>{
    // Place.findOneAndUpdate({'_id': req.params.id},placeParams,{new: true})
    Place.findByIdAndUpdate(req.params.id, placeParams,{new: true})
      .then(doc=>{
        res.json(doc);
      }).catch(err=>{
        console.log(err);
        res.json(err);
      })
})




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);

});

module.exports = app;
