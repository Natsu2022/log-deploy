const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator")

// Load environment variables
require("dotenv").config();

// Initialize Express app
const app = express();
const port = process.env.PORT; // Port number

const uri = process.env.DB_URL; // Connection URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
const corsOptions = process.env.CORSOPTION;
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Server is working!');
});

app.get('/about', (req, res) => {
    res.send('About Us');
});

module.exports = app;