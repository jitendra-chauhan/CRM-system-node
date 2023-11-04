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

const usersType = new GraphQLObjectType({
  name: "Users",
  fields: () => ({
    id: {
      type: GraphQLID || GraphQLString,
    },
    userName: {
      type: GraphQLString,
    },
    // password: {
    //   type: GraphQLString,
    // },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    role: {
      type: GraphQLString,
    },
    whoCreated: {
      type: GraphQLString,
    },
  }),
});

export const getAllUsers = {
  type: new GraphQLList(usersType),
  //   args: { page: GraphQLInt, limit: GraphQLInt },
  async resolve(parent: any, args: any) {
    const userData = await models.Users.find();
    return userData;
  },
};
export const login = {
  type: usersType,
  args: {
    userName: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const userData = await models.Users.findOne({});

    if (!userData) {
      console.log("no data found");

      throw new ApiError(httpStatus.NOT_EXTENDED, "user not found");
      //   const customError = {
      //     code: "CUSTOM_ERROR_CODE",
      //     message: "This is a custom error message.",
      //   };
      //   throw customError;
    }
    return userData;
  },
};
