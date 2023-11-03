import { getConfig } from "./connections/Config";
import { httpServer } from "./connections/Http";

(async () => {
  const { port } = getConfig;
  //   httpServer;

  httpServer.listen(port, () => {
    console.log(`server start on : port`);
  });
})();
