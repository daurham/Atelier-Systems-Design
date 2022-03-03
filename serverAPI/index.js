const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const directory = 'FILL_ME_IN';

app.listen('/', () => console.log(`listening to port ${port}`));
app.use(express.static(`${directory}`))