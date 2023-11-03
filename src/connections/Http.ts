import http from "http";
import https from "https";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

class Http {
  private server: http.Server | https.Server;
  constructor() {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    this.server = http.createServer(app);

    app.get("/test", (req: object, res: { status: Function }) =>
      res.status(200).send({ status: "OK" })
    );
  }

  getHttpServer() {
    return this.server;
  }
}

export const httpServer = new Http().getHttpServer();
