import "../connections/MongoConnection";
import models from "../models";

async function test() {
  const userData = await models.Users.create({
    firstName: "Sadmin",
    lastName: "main",
    userName: "SuperAdmin",
    password: "admin",
  });
}

test();
