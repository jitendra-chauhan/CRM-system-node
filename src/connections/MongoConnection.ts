import mongoose from "mongoose";
import { getConfig } from "./Config";

class MongoConnection {
  constructor() {
    console.log("hi");

    const {
      mongoose: { url },
    } = getConfig;
    mongoose
      .connect(url)
      .then(() => {
        console.log("mongoDb connected");
      })
      .catch((e) => {
        console.log("got error in MongoDb connection : ", e);
      });

    mongoose.connection.once("open", () => {
      console.log("mongoDb connected from once");
    });
  }
}

export default new MongoConnection();
