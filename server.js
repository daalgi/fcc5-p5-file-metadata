'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var multer = require('multer')

// Basic Configuration 
const port = process.env.PORT || 3000
const hostname = '127.0.0.1'

// Multer setup
const upload = multer({ 
  destination: './uploads/'
})

// INITIALIZE THE APP
const app = express()

// Serve static assets mounting the express.static() middleware
app.use('/public', express.static(__dirname + '/public'))

// Use Cross-origin resource sharing to allow AJAX requests to skip 
// the same-origin policy and access resources from remote hosts
app.use(cors())

// Mount the body parser middleware to extract the entire body portion 
// of an incoming request stream and expose it on req.body
// Support parsing of application/json type post data
app.use(bodyParser.json())

// Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }))

// Main page
app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html')
})

// API end points
app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"})
})

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next){
  if(req.file){
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    })
  }else{
    res.json({
      error: "No file to upload"
    })
  }
})

app.listen(port, function () {
  console.log(`Server running at port ${port}`)
});
