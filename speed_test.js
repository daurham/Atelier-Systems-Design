const fs = require('fs');
const file = 'speed_records.txt';
const file2 = 'speed_records.json';
// const run = require('./serverAPI/index.js');

// Speed tesing function
function readData(cb) {
  fs.readFile(file, (err, fileData) => {
    if (err) {
      cb(err);
    } else {
      cb(null, fileData);
    }
  });
};

const logData = (oldData, newData) => {
  let d = new Date().toString().slice(0, -34);
  oldData = oldData.toString();
  // let count = oldData.slice(3, 4) || 0;
  // console.log(count) // "Test#": "${count}",\n // congifure a count.
  console.log(oldData.slice(-5));
  let mergedData = `
  {
    "Date": "${d}",${newData}${!oldData?',':null}
  ${oldData.slice(4, oldData.length) || '}' }`;
  fs.writeFile(file, JSON.parse(JSON.stringify(mergedData)), (err, finalData) => {
  // let mergedData = `
  // {
  //   "Date": "${d}",${newData}
  // ${oldData.slice(4, oldData.length) || '}' }`;
  // fs.writeFile(file, JSON.parse(JSON.stringify(mergedData)), (err, finalData) => {
  if (err) {
      console.log('ERR');
    }
    console.log('Recorded new data!');
  })
};

module.exports = runRecordKepper = (newRecords) => {
  readData((err, fileData) => {
  if (err) {
    console.log('Record Err: ', err);
  } else {
    logData(fileData, newRecords);
  }
});
};
