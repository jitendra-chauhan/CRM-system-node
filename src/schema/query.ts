import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";

import { userQuerys, userMutation, userSubscriptions } from "./users";

console.log("userQuerys :: ", userQuerys);

export const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...userQuerys,
  },
});

export const SubScriptionQuery = new GraphQLObjectType({
  name: "Subscription",
  fields: {
    ...userSubscriptions,
  },
});

export const MutationQuery = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...userMutation,
  }),
});
