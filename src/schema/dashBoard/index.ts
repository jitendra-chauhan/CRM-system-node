import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import models from "../../models";
import { ApiError } from "../../utile/ApiError";
import httpStatus from "http-status";
import { pubsub } from "../../connections/pubSub";

const dashBoardCountData = new GraphQLObjectType({
  name: "dashBoardCount",
  fields: () => ({
    userCount: {
      type: GraphQLInt,
    },
  }),
});

const dashBoardCount = {
  type: dashBoardCountData,
  args: {
    id: { type: GraphQLString || GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const userData = await models.Users.find().count();
    // pubsub.publish("getAllUsersSub", userData);
    return { userCount: userData };
  },
};

export const dashBoardMutation = {
  dashBoardCount,
};
