import http from "http";
import https from "https";
import express, { Request, Response, Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";

class Http {
  private server: http.Server | https.Server;
  private app: Express;
  constructor() {
    this.app = express();

    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors());

    this.server = http.createServer(this.app);

    this.app.get("/test", (req: Request, res: Response) =>
      res.status(200).send({ status: "OK" })
    );
  }

  getHttpServer() {
    return this.server;
  }
  getExpressServer() {
    return this.app;
  }
}

export const httpServerProvider = new Http();
