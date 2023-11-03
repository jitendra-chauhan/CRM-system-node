import { useServer } from "graphql-ws/lib/use/ws";
import { graphqlHTTP } from "express-graphql";

import { getConfig } from "./connections/Config";
import { httpServerProvider } from "./connections/Http";
import { socketClient } from "./connections/WebSocket";
import schema from "./schema";
import models from "./models";
// import MongoConnection from "";

(async () => {
  // server port number
  const { port } = getConfig;

  await import("./connections/MongoConnection");
  // http server connection
  const httpServer = httpServerProvider.getHttpServer();

  // express server connection
  const app = httpServerProvider.getExpressServer();

  // graphQl play-ground
  app.use("/graphql", graphqlHTTP({ schema, context: models }));

  // set graphQl for web socket
  useServer({ schema }, socketClient);

  // start server
  httpServer.listen(port, () => {
    console.log(`server start on : ${port}`);
  });
})();
