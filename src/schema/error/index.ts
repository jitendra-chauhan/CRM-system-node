import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from "graphql";

const usersType = new GraphQLObjectType({
  name: "CustomeError",
  fields: () => ({
    code: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});
