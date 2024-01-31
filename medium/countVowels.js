/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  // Your code here
  const textArray = str.toLowerCase().split("");
  let numberOfVowels = 0;
  const vowels = ["a", "e", "i", "o", "u"];
  textArray.forEach((element) => {
    if (vowels.includes(element)) {
      numberOfVowels++;
    }
  });
  return numberOfVowels;
}

module.exports = countVowels;
