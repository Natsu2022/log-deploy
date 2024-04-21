const express = require('express');
const app  = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const port = 3000;
const corsOptions = process.env.CORS_OPTIONS;

const db_url = process.env.DB_URL;
const cliecnt = new MongoClient(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors());
app.use(bodyParser.json());
app.use(cors(corsOptions));

async function connect() {
    try {
        await cliecnt.connect();
        console.log('Connected to MongoDB');

        app.get('/reginter', async (req, res) => {
            const logs = await cliecnt.db('logs').collection('log').find({}).toArray();
            res.json(logs);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.get('/about', (req, res) => {
    res.send('About Us');
});


connect().catch(console.error);