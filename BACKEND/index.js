const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const products = require('./products');
const register = require('./routes/register');

const app = express();

require('dotenv').config()

app.use(cors());

app.use(express.json());

app.use("/api/register", register);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/products', (req, res) => {
    res.send(products);
})

const PORT = process.env.PORT || 5000;
const dburl = process.env.DB_URL
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("connected to mongoDb"))
.catch((error) => console.log(`error ${error}`))