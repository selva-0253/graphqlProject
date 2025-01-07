const express = require('express');

const graphqlHTTP = require('express-graphql').graphqlHTTP;

const schema = require ('./server/schema/schema');
const  mongoose = require('mongoose');

const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))

mongoose.connect(`mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@cluster0.ppnzj.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority&appName=Cluster0

`).then(() => {
    app.listen(4000, () => {
        console.log('Listening for requests on my awesome port 4000');
    
    })
}).catch((e) => console.log("Error::: " +e))

