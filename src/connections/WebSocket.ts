import { Server } from "ws";
import { httpServerProvider } from "./Http";

class WebSocket {
  private wss: Server;
  constructor() {
    this.wss = new Server({
      server: httpServerProvider.getHttpServer(),
      path: "/graphql",
    });
    this.wss.on("connection", (socket) => {
      console.log("socket is connected");
      socket.on("message", (message) => {
        console.log(`Received: ${message}`);
      });
      socket.on("close", () => {
        console.log("Client disconnected");
      });
    });
  }

  getClient() {
    return this.wss;
  }
}

export const socketClient = new WebSocket().getClient();
