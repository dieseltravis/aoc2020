//import funs from "/funs.js";

const process = function(funs, day, part) {
  const timer = "day " + day + ", part " + part;
  const input = document.getElementById("input" + part);
  const answer = document.getElementById("part" + part);
  const button = document.getElementById("button" + part);

  const onevent = function(ev) {
    // put function in a timeout so that it doesn't block UI thread
    setTimeout(function() {
      console.info("starting...", new Date());
      console.time(timer);

      // fun time
      answer.innerText = funs(day, part)(input.value);

      console.timeEnd(timer);
    }, 20);
  };

  button.addEventListener("click", onevent);
};

const day = function(funs, day) {
  process(funs, day, 1);
  process(funs, day, 2);
};

export default day;
