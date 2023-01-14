const express = require('express');
const cors = require('cors');
const products = require('./products');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/products', (req, res) => {
    res.send(products);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})