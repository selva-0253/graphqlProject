const graphql = require('graphql');
var output = require('lodash');
const User = require('../model/user');
const Post = require('../model/post');
const Hobby = require('../model/hobby');







/*
var usersData = [
    {id: "1", name: "JamesBond", age: 4},
    {id: "2", name: "CasinoRoyale", age: 4},
    {id: "5", name: "NoTimeoDie", age: 4},
    {id: "8", name: "DieAnotherDay", age: 4}
    
]

var userhobby = [
    {id: "1", title: "reading", description: "reading books", userID:"1"},
    {id: "2", title: "fighting", description: "fighting ants", userID: "5"},
    {id: "3", title: "hiking", description: "climbing steps", userID: "8"},
    {id: "4", title: "watching", description: "watching girls fight", userID: "1"},
    
]

var posts = [
    {id: "1", comment: "this is really great", description: "its not really true", userID: "1"},
    {id: "2", comment: "this is really awsm", description: "its not really true", userID: "2"},
    {id: "1", comment: "this is really bad", description: "its not really true", userID: "1"},
    {id: "1", comment: "this is really exlnt", description: "its not really true", userID: "1"},
    {id: "1", comment: "this is really fab", description: "its not really true", userID: "1"},
    {id: "1", comment: "this is really mrvlss", description: "its not really true", userID: "1"},



]
*/
 const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList

 } = graphql
//Create types

const UserType = new GraphQLObjectType({

    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        post: {
            type: new GraphQLList(PostType),
            resolve(parent, args){
               return Post.find({userID: parent.id})
               // return output.filter(posts, {userID: parent.id})
            }
        },
        hobby: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args){
                return Hobby.find({userID: parent.id})

             // return output.filter(userhobby, {userID: parent.id})
            }
        }

    })
})

const HobbyType = new GraphQLObjectType({
    name: 'HobbyType',
    description: 'Documentation for Hobby...',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return User.find({userID: parent.id})
                // return output.find(usersData, {id: parent.userID})
            }
    }
        
    })
})

const PostType = new GraphQLObjectType({
    name: 'PostType',
    description: 'Documentation for PostType...',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return User.find({userID: parent.id})
            }
        }
    })
})

//Root Query


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'description',
    fields:{
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return User.findById(args.id)
            }
        },

        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({})
            }

        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args){
                return Hobby.find({})
            }

        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args){
                return Post.find({})
            }

        },
        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return Hobby.findById(args.id)
            }
        },
        post: {
            type: PostType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return Post.findById(args.id)
            }
        }


}});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        createUser: {
            type: UserType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent,args){
                let user = User({
                    name: args.name,
                    age: args.age
                
                }   )   
                return user.save();
            }
        },
        UpdateUser: {
            type: UserType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                age: {type: GraphQLInt}            
            },
            resolve(parent,args){
                return updateUser = User.findByIdAndUpdate(
                    args.id,
                    {
                        $set:{
                            name: args.name,
                            age: args.age
                        }
                        
                    },

                    {new: true}
                )

            }
        },
        createPost: {
            type: PostType,
            args: {
                comment: {type: GraphQLString},
                userID: {type: GraphQLID},
                description: {type: GraphQLString}
            },
            resolve(parent,args){
                let post = Post({
                    comment: args.comment,
                    userID: args.userID,
                    description: args.description
                
                })      
                return post.save();
            }
        },

       /* resolve(parent,args){
            return updateUser = User.findByIdAndUpdate(
                args.id,
                {
                    $set:{
                        name: args.name,
                        age: args.age
                    }
                    
                },

                {new: true}
            )

        }
    }, */
        UpdatePost: {
            type: PostType,
            args: {
                id: {type: GraphQLID},
                comment: {type: GraphQLString},
                description: {type: GraphQLString}
            },
            resolve(parent,args){
                return updatePost = Post.findByIdAndUpdate(
                    agrs.id,
                    {
                        $set:{
                            comment: args.comment,
                            description: args.description
                        }
                    },
                    {new: true}
                    
                )
            }

        },
        createHobby: {
            type: HobbyType,
            args: {
                title: {type: GraphQLString},
                userID: {type: GraphQLID},
                description: {type: GraphQLString}
            },
            resolve(parent,args){
                let hobby = Hobby({
                    title: args.title,
                    userID: args.userID,
                    description: args.description
                
                })     
                return hobby.save();
            }
        },
        
        UpdateHobby: {
            type: HobbyType,
            args: {
                id: {type: GraphQLID},
                title: {type: GraphQLString},
                description: {type: GraphQLString}
            },
            resolve(parent,args){
                return updateHobby = Hobby.findByIdAndUpdate(
                        agrs.id,
                        {
                         $set: {
                             title: args.title,
                             description: args.description
                         }
                         },
                         {new: true}
                    )
                    
                
            }

        },


    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
