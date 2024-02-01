/*
Counter without setInterval

Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

(Hint: setTimeout)
*/

function counter(currentCount, limit) {
  console.log(currentCount);
  if (currentCount < limit) {
    setTimeout(() => {
      console.clear();
      return counter(currentCount + 1, limit);
    }, 1000);
  }
}

console.log();
counter(1, 100);
