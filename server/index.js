
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const cors = require('cors');
const router = require('./router');
const app = express();


//db setup

mongoose.connect('mongodb://localhost:auth/serverauth');
// app setup

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}))
router(app);
//server setup

const port = process.env.PORT || 3090;

app.listen(port);
console.log('The app is listening on port ',port);