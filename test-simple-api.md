### METHODS

**GET** 

    curl https://test-simple-api.netlify.app/.netlify/functions/items

**POST** 

    curl -X POST -H "Content-Type: application/json" -d '{"name":"New Item"}' https://test-simple-api.netlify.app/.netlify/functions/items

**PUT** 
request: 

    curl -X PUT -H "Content-Type: application/json" -d '{"name":"Updated Item"}' https://test-simple-api.netlify.app/.netlify/functions/items

**DELETE** 
request: 

    curl -X DELETE https://test-simple-api.netlify.app/.netlify/functions/items/1

### MATH

**Addition**: 

    curl "https://test-simple-api.netlify.app/.netlify/functions/items/add?a=5&b=3"

**Subtraction**: 

    curl "https://test-simple-api.netlify.app/.netlify/functions/items/subtract?a=5&b=3"

**Multiplication**: 

    curl "https://test-simple-api.netlify.app/.netlify/functions/items/multiply?a=5&b=3"

**Division**: 

    curl "https://test-simple-api.netlify.app/.netlify/functions/items/divide?a=5&b=3"