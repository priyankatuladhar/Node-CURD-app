const express = require('express');
const bodyParser = require('body-parser');
const internRouter = require('./intern');

const app = express();
app.use(bodyParser.json());

app.use('/api', internRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
