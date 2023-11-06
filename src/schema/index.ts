import { GraphQLSchema } from "graphql";
import { RootQuery, MutationQuery, SubScriptionQuery } from "./query";

export default new GraphQLSchema({
  query: RootQuery,
  mutation: MutationQuery,
  subscription: SubScriptionQuery,
});
