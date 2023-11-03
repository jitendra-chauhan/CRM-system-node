import { Server } from "ws";
import { httpServerProvider } from "./Http";

class WebSocket {
  private wss: Server;
  constructor() {
    // init web socket connection
    this.wss = new Server({
      server: httpServerProvider.getHttpServer(),
      path: "/graphql",
    });

    // client connect with server
    this.wss.on("connection", (socket) => {
      console.log("socket is connected");

      // client pass the event
      socket.on("message", (message) => {
        console.log(`Received: ${message}`);
      });
      // client is disconnect
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
