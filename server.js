var fs = require('fs');
const express = require("express");
const app = express();
const timeout = require("connect-timeout"); //express v4

console.log(process.env.PROJECT_DOMAIN);
const PROJECT_URL = `https://${process.env.PROJECT_DOMAIN}.glitch.me/`;
console.log(PROJECT_URL);

// run the same functions on the front & back
const f = require("./public/funs");

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.use(timeout(1200000));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const year = 2020;
const days = [
  "one", "two", "three", "four", "five",
  "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
  "twentyone", "twentytwo", "twentythree", "twentyfour", "twentyfive"
];

// bind 25 days of html files, and post functions for both parts of each
for (let d = 1; d <= 25; d++) {
  // string day, leading zero
  const dd = "" + d;
  const day = dd.padStart(2, "0");

  app.get("/day" + day, function(request, response) {
    response.sendFile(__dirname + "/views/day" + day + ".html");
  });

  for (let p = 1; p <= 2; p++) {
    // string part
    const part = "" + p;
    app.post("/day" + day + "part" + p, function(request, response) {
      // name of the timer
      const timer = "day " + dd + ", part " + part;
      console.time(timer);

      // pass in string of day number and part, and send the request body's imput param to that function
      const answer = f.funs(dd, part)(request.body.input);

      console.log(answer);
      console.timeEnd(timer);

      // respond with the json that includes the answer
      response.status(200).json({ output: answer });
    });
  }
}

// *beta* view template
let dayTemplate = "";
fs.readFile(__dirname + "/views/day.ntl", function (err, content) {
  if (err) {
    console.log(err);
  }
  dayTemplate = content.toString();
});
const keyFinder = /\{\{(\w+)\}\}/ig;
const GetFormattedString = (templateString, valueObject) => {
  return templateString.replace(keyFinder, (subString, group1 /*, offset, inputString*/) => {
    return valueObject[group1] || "";
  });
};

app.engine('ntl', (filePath, options, callback) => { // define the template engine
  // this is an extremely simple template engine
  var rendered = GetFormattedString(dayTemplate, options);
  return callback(null, rendered);
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine
//TODO: bind this in the for loop above for each day, change html bind to redirect
app.get('/day', (req, res) => {
  res.render('day', { 
    title: 'one', 
    description: "AOC " + year + ", day one",
    prev_url: "/",
    next_url: "/day/02",
    year: year,
    day: "01",
    day_num: "1"
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your cool app is listening on port " + listener.address().port);
});
