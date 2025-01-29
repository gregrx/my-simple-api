// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
];

// GET request to fetch all items
app.get('/items', (req, res) => {
    res.json(items);
});

// GET request for addition
app.get('/add', (req, res) => {
    const { a, b } = req.query;
    const sum = parseFloat(a) + parseFloat(b);
    res.json({ result: sum });
});

// GET request for subtraction
app.get('/subtract', (req, res) => {
    const { a, b } = req.query;
    const difference = parseFloat(a) - parseFloat(b);
    res.json({ result: difference });
});

// GET request for multiplication
app.get('/multiply', (req, res) => {
    const { a, b } = req.query;
    const product = parseFloat(a) * parseFloat(b);
    res.json({ result: product });
});

// GET request for division
app.get('/divide', (req, res) => {
    const { a, b } = req.query;
    if (parseFloat(b) === 0) {
        res.status(400).json({ error: 'Division by zero is not allowed' });
    } else {
        const quotient = parseFloat(a) / parseFloat(b);
        res.json({ result: quotient });
    }
});

// POST request to add a new item
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT request to update an item
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = items.find(item => item.id === id);
    if (item) {
        item.name = req.body.name;
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

// DELETE request to remove an item
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Item not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});