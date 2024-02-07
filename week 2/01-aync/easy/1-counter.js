/*
Create a counter in JavaScript

We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
It should go up as time goes by in intervals of 1 second
*/
function counter(start, end) {
  let intervalID = setInterval(() => {
    let currentCount = start++;
    console.clear();
    console.log(currentCount);
    if (start > end) {
      clearInterval(intervalID);
    }
  }, 1000);
}

counter(1, 10);
