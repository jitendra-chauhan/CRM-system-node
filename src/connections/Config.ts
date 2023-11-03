import dotenv from "dotenv";
import Joi from "joi";
import path from "path";
import { ApiError } from "../utile/ApiError";
import httpStatus from "http-status";

class Config {
  private envInfoDetails;
  constructor() {
    dotenv.config({
      path: path.join(__dirname, "../.env"),
    });

    const envVarsSchema = Joi.object()
      .keys({
        NODE_ENV: Joi.string()
          .valid("production", "development", "test", "sandbox")
          .required(),
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required().description("Mongo DB url"),
        MASTER_DB: Joi.string().required().description("Mongo Master DB Name"),
      })
      .unknown();

    const { value: envVars, error } = envVarsSchema
      .prefs({
        errors: {
          label: "key",
        },
      })
      .validate(process.env);

    if (error) {
      throw new ApiError(
        httpStatus.NO_CONTENT,
        `Config validation error: ${error.message}`
      );
    }
    this.envInfoDetails = envVars;
  }

  getConfig() {
    return {
      ENVIRONMENT: this.envInfoDetails.ENVIRONMENT,
      port: this.envInfoDetails.PORT,

      mongoose: {
        url: this.envInfoDetails.MONGODB_URL,
        master_db: this.envInfoDetails.MASTER_DB,
        options: {
          // useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      },
    };
  }
}

export const getConfig = new Config().getConfig();
