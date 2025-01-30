// netlify/functions/items.js
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

exports.handler = async (event) => {
  const { httpMethod, queryStringParameters } = event;
  const { a, b } = queryStringParameters || {};

  switch (event.path) {
    case '/.netlify/functions/items':
      switch (httpMethod) {
        case 'GET':
          return {
            statusCode: 200,
            body: JSON.stringify(items),
          };
        case 'POST':
          const newItem = JSON.parse(event.body);
          newItem.id = items.length + 1;
          items.push(newItem);
          return {
            statusCode: 201,
            body: JSON.stringify(newItem),
          };
        case 'PUT':
          const idToUpdate = parseInt(queryStringParameters.id, 10);
          const itemToUpdate = items.find(item => item.id === idToUpdate);
          if (itemToUpdate) {
            const updatedItem = JSON.parse(event.body);
            itemToUpdate.name = updatedItem.name;
            return {
              statusCode: 200,
              body: JSON.stringify(itemToUpdate),
            };
          } else {
            return {
              statusCode: 404,
              body: 'Item not found',
            };
          }
        case 'DELETE':
          const idToDelete = parseInt(queryStringParameters.id, 10);
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
              body: 'Item not found',
            };
          }
        default:
          return {
            statusCode: 405,
            body: 'Method Not Allowed',
          };
      }
    case '/.netlify/functions/items/add':
      if (a && b) {
        const sum = parseFloat(a) + parseFloat(b);
        return {
          statusCode: 200,
          body: JSON.stringify({ result: sum }),
        };
      }
      break;
    case '/.netlify/functions/items/substract':
      if (a && b) {
        const difference = parseFloat(a) - parseFloat(b);
        return {
          statusCode: 200,
          body: JSON.stringify({ result: difference }),
        };
      }
      break;
    case '/.netlify/functions/items/multiply':
      if (a && b) {
        const product = parseFloat(a) * parseFloat(b);
        return {
          statusCode: 200,
          body: JSON.stringify({ result: product }),
        };
      }
      break;
    case '/.netlify/functions/items/divide':
      if (a && b) {
        if (parseFloat(b) === 0) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Division by zero is not allowed' }),
          };
        }
        const quotient = parseFloat(a) / parseFloat(b);
        return {
          statusCode: 200,
          body: JSON.stringify({ result: quotient }),
        };
      }
      break;
    default:
      return {
        statusCode: 404,
        body: 'Not Found',
      };
  }
};