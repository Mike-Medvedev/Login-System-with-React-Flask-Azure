const { app, output } = require('@azure/functions');

// The input binding executes the `select * from Products where Cost = @Cost` query, returning the result as json object in the body.
// The *parameters* argument passes the `{cost}` specified in the URL that triggers the function,
// `getproducts/{cost}`, as the value of the `@Cost` parameter in the query.
// *commandType* is set to `Text`, since the constructor argument of the binding is a raw query.
const sqlOutput = output.generic({
    type: 'sql',
    commandText: 'INSERT INTO test VALUES ("dave")',
    connectionStringSetting: 'SqlConnectionString'
})

app.http('Login', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    extraOutputs: [sqlOutput],
    handler: async (request, context) => {
        console.log(request.method)
        if (request.method === 'OPTIONS') {
            // Handle preflight request
            return {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*', // or specific origin as needed
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Include OPTIONS method
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            };
        }
    
        const headers = {
            'Access-Control-Allow-Origin': '*', // or specific origin as needed
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Headers': 'Content-Type'
        };
    
        try {
            if (request.method === 'GET') {
                // Handle GET request
                return {
                    status: 200,
                    body: 'Hello World', // Example response for GET request
                    headers: headers
                };
            }
    
            // For POST requests
            const product = await request.json();
            context.extraOutputs.set(sqlOutput, product);
    
            return {
                status: 201,
                body: JSON.stringify(product),
                headers: headers
            };
        } catch (error) {
            // Handle parsing error or other errors
            return {
                status: 400,
                body: JSON.stringify({ error: 'Invalid request' }),
                headers: headers
            };
        }
    }
    
    
    
});