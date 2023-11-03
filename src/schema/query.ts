import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import { getAllUsers, login } from "./users";
import * as userQuerys from "./users";

export const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...userQuerys,
    // getAllUsers,
    // login,
  },
});
