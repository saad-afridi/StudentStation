const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()
// const users = require('./controller/routes/api/users');

const app = express();
const port = process.env.PORT || 5000;

// Express middleware
app.use(cors());
app.use(express.json);

// Db Config and connect
const db = process.env.MONGO_ATLAS_URI
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => console.log('Successfully connected to MongoDB'))
	.catch((err) => console.log(err));

const userRouter = require('./controller/routes/api/users')

app.use('./users', userRouter)

app.listen(port, () => console.log(`Servers up and running on: ${port}`));
