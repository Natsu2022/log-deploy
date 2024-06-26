const express = require('express');
const app  = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const port = process.env.PORT || 3000;
const corsOptions = process.env.CORS_OPTIONS;

const db_url = process.env.DB_URL;

if (!db_url) {
    console.error('MongoDB connection string is not provided.');
    process.exit(1);
}

const client = new MongoClient(db_url);

app.use(cors());
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.post('/login', async (req, res) => {
    try {
        await client.connect();
        
        const { username, password } = req.body;
        const db = client.db('UsersDB');
        const collection = db.collection('Log');
        const user = await collection.findOne({ username });

        // If the user doesn't exist, return an error
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure that the user's hashed password is not undefined
        if (!user.Password) {
            return res.status(500).json({ message: "Invalid user data" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.Password);

        // If passwords match, return success message
        if (isPasswordValid) {
            return res.status(200).json({ message: "User logged in successfully" });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    } finally {
        await client.close();
    }
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.get('/about', (req, res) => {
    res.send('About Us');
});
