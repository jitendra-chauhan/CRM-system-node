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

const getAllUsers = {
  type: new GraphQLList(usersType),
  //   args: { page: GraphQLInt, limit: GraphQLInt },
  async resolve(parent: any, args: any) {
    console.log("hello");

    const userData = await models.Users.find();
    return userData;
  },
};
const login = {
  type: usersType,
  args: {
    userName: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    console.log("args ::: ", args);

    const userData = await models.Users.findOne({ userName: args.userName });

    if (!userData) {
      console.log("no data found");

      throw new ApiError(httpStatus.NOT_EXTENDED, "user not found!");
      //   const customError = {
      //     code: "CUSTOM_ERROR_CODE",
      //     message: "This is a custom error message.",
      //   };
      //   throw customError;
    }

    if (userData.password !== args.password)
      throw new ApiError(httpStatus.BAD_REQUEST, "Password is wrong!");
    return userData;
  },
};

const addUser = {
  type: new GraphQLList(usersType),
  args: {
    userName: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    await models.Users.create(args);
    const userData = await models.Users.find();
    // pubsub.publish("getAllUsersSub", userData);
    return userData;
  },
};

const getAllUsersSub = {
  type: new GraphQLList(usersType),
  subscribe: () => {
    console.log("i'm subscribe ");
    return pubsub.asyncIterator("getAllUsersSub");
  },
  async resolve(payload: any) {
    return payload;
  },
};

export const userMutation = {
  addUser,
};
export const userQuerys = {
  getAllUsers,
  login,
  // addUser,
};

export const userSubscriptions = {
  getAllUsersSub,
};
