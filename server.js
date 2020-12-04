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

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your cool app is listening on port " + listener.address().port);
});
