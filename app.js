const express=require('express');
const graphqlHTTP=require('express-graphql');
const schema=require('./schema/schema');
const mongoose=require('mongoose');
const app=express()

//Mlab Connection String here 


mongoose.connection.once('open',()=>{
    console.log('Connection to Database')
});

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log("Now listening at port 4000")
});