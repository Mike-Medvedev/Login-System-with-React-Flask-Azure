const { app, input } = require('@azure/functions');

// The input binding executes the `select * from Products where Cost = @Cost` query, returning the result as json object in the body.
// The *parameters* argument passes the `{cost}` specified in the URL that triggers the function,
// `getproducts/{cost}`, as the value of the `@Cost` parameter in the query.
// *commandType* is set to `Text`, since the constructor argument of the binding is a raw query.
const sqlInput = input.generic({
    type: 'sql',
    commandText: 'select [brand], [model] from guitars',
    commandType: 'Text',
    connectionStringSetting: 'SqlConnectionString'
})

app.http('Login', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    extraInputs: [sqlInput],
    handler: async (request, context) => {
        const products = JSON.stringify(context.extraInputs.get(sqlInput));

        const headers = {
            'Access-Control-Allow-Origin': '*', // or specific origin as needed
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Headers': 'Content-Type'
        };

        return {
            status: 200,
            body: products,
            headers: headers
        };
    }
});