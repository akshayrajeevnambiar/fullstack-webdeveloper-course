/*
File cleaner
Read a file, remove all the extra spaces and write it back to the same file.
For example, if the file input was
```
hello     world    my    name   is       raman
```
After the program runs, the output should be
```
hello world my name is raman
```
*/

const fs = require("fs").promises;
/*
// With Async
function clearSpaces(fileName) {
  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    fs.writeFile(fileName, data.replace(/\s+/g, " "), (err) => {
      if (err) throw err;
    });
  });
}
*/

/*
// With asyc-await.
async function clearSpaces(fileName) {
  try {
    const data = await fs.readFile(fileName, "utf-8");
    await fs.writeFile(fileName, data.replace(/\s+/g, " "));
  } catch (err) {
    console.log(err);
  }
}
*/

//With Promises.
function clearSpaces(fileName) {
  fs.readFile(fileName, "utf-8")
    .then((data) => {
      return fs.writeFile(fileName, data.replace(/\s+/g, " "));
    })
    .catch((err) => {
      console.log(err);
    });
}

clearSpaces("sample.txt");
