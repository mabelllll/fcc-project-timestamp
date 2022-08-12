// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  //console.log("date: " + req.params.date)
  let input = req.params.date
  let myRegex = /^[0-9]+$/
  let d = new Date(input)
  
  if (input) {
    if (myRegex.test(input)) {
      // console.log("regex")
      // console.log({
      //   unix: input,
      //   utc: new Date(input).toUTCString()
      // } + "   " + (typeof input))
      input = parseInt(input)
      res.json({
        unix: input,
        utc: new Date(parseInt(input)).toUTCString()
      })
    } else {
      if (d.toString() !== "Invalid Date") {
        //console.log("correct date str")
        res.json({
          unix: d.getTime(),
          utc: d.toUTCString()
        })
      } else {
        // console.log("err")
        res.json({
          error: "Invalid Date"
        })
      }
    }
  } else {
    let currentDate = Date.now()
    // console.log("empty date")
    res.json({
      unix: new Date(currentDate).getTime(),
      utc: new Date(currentDate).toUTCString()
    })
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


