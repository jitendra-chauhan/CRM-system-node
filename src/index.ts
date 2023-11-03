import { useServer } from "graphql-ws/lib/use/ws";
import { graphqlHTTP } from "express-graphql";

import { getConfig } from "./connections/Config";
import { httpServerProvider } from "./connections/Http";
import { socketClient } from "./connections/WebSocket";

(async () => {
  const { port } = getConfig;
  const httpServer = httpServerProvider.getHttpServer();
  const app = httpServerProvider.getExpressServer();

  //   app.use("/graphql", graphqlHTTP({ schema }));

  useServer({}, socketClient);
  httpServer.listen(port, () => {
    console.log(`server start on : port`);
  });
})();
