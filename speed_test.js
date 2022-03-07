const fs = require('fs');
const file = 'speed_records.txt';
const JSONfile = 'speed_records.json';
// const run = require('./serverAPI/index.js');

// Speed tesing function
function readData(cb) {
  fs.readFile(file, (err, txtFileData) => {
    if (err) {
      cb(err);
    } else {
      fs.readFile(JSONfile, (err, JSONFileData) => {
        if (err) {
          cb(err);
        } else {
          cb(null, txtFileData, JSONFileData);
        }
      });
    }
  });
};

const logData = (oldData, oldJSONdata, newData, newPsqlRecords) => {
  let d = (new Date().toString().slice(0, -34)).replace(/\s/g, '-');
  oldData = oldData.toString();
  oldJSONdata = oldJSONdata.toString();
  let body = `"${d}": ${JSON.stringify(newPsqlRecords)}`;
  if (!oldJSONdata) {
    body = JSON.parse('{' + body + '}');
  } else {
    body = JSON.parse(oldJSONdata);
    body[d] = newPsqlRecords;
  }

  let mergedData = `
  {
    "Date": "${d}",${newData}
  }
  ${oldData.slice(4, oldData.length)}
  `;

  fs.writeFile(file, mergedData.toString(), (err, finalData) => {
    if (err) {
      console.log('fs.writeFile ERR: ', err);
    }
    console.log('Recorded new txt data!');
    fs.writeFile(JSONfile, JSON.stringify(body, null, 2), (err, finalData) => {
      if (err) {
        console.log('fs.writeFile ERR: ', err);
      } else {
        console.log('Recorded new JSON data!');
      }
    })
  })
};

module.exports = runRecordKepper = (newRecords, newPsqlRecords) => {
  readData((err, txtFileData, JSONFileData) => {
    if (err) {
      console.log('[function] "readData" ERROR: ', err);
    } else {
      // console.log(JSON.stringify(psqlRecords));
      logData(txtFileData, JSONFileData, newRecords, newPsqlRecords);
    }
  });
};
