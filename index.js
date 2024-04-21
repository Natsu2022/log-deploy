const express = require('express');
const app  = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.get('/about', (req, res) => {
    res.send('About Us');
});

module.exports = app;