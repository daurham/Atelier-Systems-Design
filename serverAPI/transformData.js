const fs = require('fs');
const csv = require('csv');

fs.createReadStream('../csvFiles/reviews.csv')
  .pipe(csv.parse({columns: true}))
  .pipe(csv.transform((input) => {
    return Object.assign({}, input, {
      date: (new Date(parseInt(input['date_']))).toUTCString()
    });
  }))
  .pipe(csv.stringify({header: true}))
  .pipe(fs.createWriteStream('../csvFiles/reviews-processed.csv'))
  .on('finish', () => {
    console.log('done!');
  });
// nearly working, gotta iron out bugs
