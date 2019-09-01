const graphql=require('graphql');
const _ = require('lodash');

const { GraphQLObjectType,GraphQLString,GraphQLSchema } = graphql;


//Dummy Data
var books=[
    {name:'Life of PI',genre:'Action',id:'1'},
    {name: 'Romeo and Julliet',genre:'Classic',id:'2'},
    {name: 'Hamlet', genre:'Drama',id:'3'},
    {name: 'Sherlock Holmes', genre:'Crime and Detective',id:'4'},
];

const BookType = new GraphQLObjectType({
        name : 'Book',
        fields:()=>({
            id: { type: GraphQLString },
            name : { type: GraphQLString },
            genre: { type: GraphQLString },
        })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields:{
        book: {
            type: BookType,
            args: { id:{type:GraphQLString}},
            resolve(parent,args){
                //Code to get data from DB
                return _.find(books,{id:args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

