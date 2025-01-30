// netlify/functions/items.js
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

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

exports.handler = async (event) => {
  const { httpMethod, path, queryStringParameters, body } = event;
  const { operation, a, b, id } = queryStringParameters || {};

  switch (httpMethod) {
    case 'GET':
      if (path === '/.netlify/functions/items') {
        const numA = parseNumberOrItemId(a);
        const numB = parseNumberOrItemId(b);

        if (numA === null || numB === null) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid input or item not found' }),
          };
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
              return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Division by zero is not allowed' }),
              };
            }
            result = numA / numB;
            break;
          default:
            return {
              statusCode: 400,
              body: JSON.stringify({ error: 'Invalid operation' }),
            };
        }

        return {
          statusCode: 200,
          body: JSON.stringify({ result }),
        };
      }
      break;

    case 'POST':
      if (path === '/.netlify/functions/items') {
        const newItem = JSON.parse(body);
        newItem.id = items.length + 1;
        items.push(newItem);
        return {
          statusCode: 201,
          body: JSON.stringify({ newItem }),
        };
      }
      break;

    case 'PUT':
      if (path === '/.netlify/functions/items' && id) {
        const idToUpdate = parseInt(id, 10);
        const itemToUpdate = items.find(item => item.id === idToUpdate);
        if (itemToUpdate) {
          const updatedItem = JSON.parse(body);
          itemToUpdate.name = updatedItem.name;
          return {
            statusCode: 200,
            body: JSON.stringify({ itemToUpdate }),
          };
        } else {
          return {
            statusCode: 404,
            body: JSON.stringify({ error: 'item not found' }),
          };
        }
      }
      break;

    case 'DELETE':
      if (path === '/.netlify/functions/items' && id) {
        const idToDelete = parseInt(id, 10);
        const indexToDelete = items.findIndex(item => item.id === idToDelete);
        if (indexToDelete !== -1) {
          items.splice(indexToDelete, 1);
          return {
            statusCode: 204,
            body: '',
          };
        } else {
          return {
            statusCode: 404,
            body: JSON.stringify({ error: 'item not found' }),
          };
        }
      }
      break;

    default:
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
  }
};