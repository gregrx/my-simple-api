// netlify/functions/items.js
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

exports.handler = async (event) => {
  const { httpMethod, path, queryStringParameters, body } = event;
  const { a, b, id } = queryStringParameters || {};

  switch (httpMethod) {
    case 'GET':
      switch (path) {
        case '/.netlify/functions/items':
          return {
            statusCode: 200,
            body: JSON.stringify(items),
          };
        case '/.netlify/functions/items/add':
          if (a && b) {
            const sum = parseFloat(a) + parseFloat(b);
            return {
              statusCode: 200,
              body: JSON.stringify({ result: sum }),
            };
          }
          break;
        case '/.netlify/functions/items/subtract':
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
      break;

    case 'POST':
      if (path === '/.netlify/functions/items') {
        const newItem = JSON.parse(body);
        newItem.id = items.length + 1;
        items.push(newItem);
        return {
          statusCode: 201,
          body: JSON.stringify({newItem}),
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
            body: JSON.stringify({itemToUpdate}),
          };
        } else {
          return {
            statusCode: 404,
            body: JSON.stringify({error:'item not found'}),
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
            body: JSON.stringify({error:'item not found'}),
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