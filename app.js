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
// Helper function to get item by ID
function getItemById(id) {
    return items.find(item => item.id === id);
}

// Function to parse numbers or item IDs
function parseNumberOrItemId(value) {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
        return parsedValue;
    }
    const item = getItemById(parseInt(value, 10));
    return item ? parseFloat(item.name) : null;
}

// Main endpoint for math operations
app.get('/items', (req, res) => {
    const { operation, a, b } = req.query;
    const numA = parseNumberOrItemId(a);
    const numB = parseNumberOrItemId(b);

    if (numA === null || numB === null) {
        return res.status(400).json({ error: 'Invalid input or item not found' });
    }

    let result;
    switch (operation) {
        case 'add':
            result = numA + numB;
            break;
        case 'substract':
            result = numA - numB;
            break;
        case 'multiply':
            result = numA * numB;
            break;
        case 'divide':
            if (numB === 0) {
                return res.status(400).json({ error: 'Division by zero is not allowed' });
            }
            result = numA / numB;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }

    res.json({ result });
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