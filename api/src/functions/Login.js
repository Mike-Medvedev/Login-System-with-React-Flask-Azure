const { app } = require('@azure/functions');

app.http('Login', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);


        return { body: JSON.stringify({message: "Hello World"}) };
    }
});
