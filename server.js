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

app.get("/favicon.ico", function(request, response) {
  response.redirect("https://cdn.glitch.com/9f083ec1-8740-44e9-95e3-d1fbae530220%2Fadventofcode-pink.ico?v=1576131694059");
  //response.sendFile(__dirname + "/assets/adventofcode-pink.ico");
});

app.use(timeout(1200000));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// bind 25 days of html files, and post functions for both parts of each
for (let d = 1; d <= 25; d++) {
  let day = ("" + d).padStart(2, "0");

  app.get("/day" + day, function(request, response) {
    response.sendFile(__dirname + "/views/day" + day + ".html");
  });

  for (let p = 1; p <= 2; p++) {
    app.post("/day" + day + "part" + p, function(request, response) {
      const timer = "day " + d + ", part " + p;
      console.time(timer);

      const answer = f.funs(d, p)(request.body.input);

      console.log(answer);
      console.timeEnd(timer);

      response.status(200).json({ output: answer });
    });
  }
}

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your cool app is listening on port " + listener.address().port);
});
