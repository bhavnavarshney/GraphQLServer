const graphql=require('graphql');
const _ = require('lodash');
const Book = require('../models/Books');
const Author = require('../models/Authors');


const { GraphQLList, GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID, GraphQLInt } = graphql;


//Dummy Data
// var books=[
//     {name:'Life of PI',genre:'Action',id:'1',authorid:'1'},
//     {name: 'Romeo and Julliet',genre:'Classic',id:'2',authorid:'2'},
//     {name: 'Hamlet', genre:'Drama',id:'3',authorid:'2'},
//     {name: 'Sherlock Holmes', genre:'Crime and Detective',id:'4',authorid:'3'},
// ];

// var Authors=[
//     {name:'Yann Martel',age:56,id:'1'},
//     {name:'William Shakespeare',age:55,id:'2'},
//     {name:'Arthur Conan Doyle',age:60,id:'3'},
// ];

const BookType = new GraphQLObjectType({
        name : 'Book',
        fields:()=>({
            id: { type: GraphQLString },
            name : { type: GraphQLString },
            genre: { type: GraphQLString },
            author: {
                type:AuthorType,
                resolve(parent,args){
                   // return _.find(Authors,{id:parent.authorid});
                }
            }
        })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books: {
            type:new GraphQLList(BookType),
            resolve(parent,args){
              //  return _.filter(books,{authorid:parent.id});
            }
        }
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
                //return _.find(books,{id:args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args){
                //return _.find(Authors,{id:args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                //return books
            }
        },
        authors: {
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                //return Authors
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor: {
            type: AuthorType,
            args: {
                name:{type:GraphQLString},
                age : {type:GraphQLInt}
            },
            resolve(parent,args){
                let author = new Author({
                    name: args.name,
                    age: args.age,
                });
                return author.save();
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});

