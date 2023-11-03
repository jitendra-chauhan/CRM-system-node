import mongoose from "mongoose";
import { ROLES } from "../constants/roles";

const permissionSchema = new mongoose.Schema(
  {
    view: {
      type: Boolean,
      default: true,
    },
    edit: {
      type: Boolean,
      default: true,
    },
    create: {
      type: Boolean,
      default: true,
    },
    delete: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  }
);

const permissionNameSchema = new mongoose.Schema(
  {
    dashBoardTab: permissionSchema,
    userTab: permissionSchema,
  },
  {
    _id: false,
  }
);

const rolesSchema = new mongoose.Schema(
  {
    roleNmae: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    roleType: {
      type: String,
      enum: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
    },
    permission: permissionNameSchema,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Roles", rolesSchema);
