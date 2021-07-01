const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// const users = require('./controller/routes/api/users');

const app = express();

// Express middleware
app.use(cors());
app.use(express.json);

// Db Config and connect
const db = require('./controller/config/keys').mongoUrl;
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => console.log('Successfully connected to MongoDB'))
	.catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servers up and running on ${port}`));
