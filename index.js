const express = require('express');
const app  = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('API is ');
});

app.get('/about', (req, res) => {
    res.send('About Us');
});

module.exports = app;