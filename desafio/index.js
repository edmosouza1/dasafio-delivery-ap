import  express  from "express";
import winston from "winston";
import pedidosRouter from "./src/routes/routePedidos.js";
import { promises as fs } from "fs";
const { readFile, writeFile } = fs;


global.fileName = "pedidos.json";
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const nameApp = "delivery-api";
global.logger = winston.createLogger({  
  level: "silly",
  transports: [new winston.transports.Console(), new winston.transports.File({ filename:  nameApp + ".log" })],
  format: combine(label({ label: nameApp }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use("/pedidos", pedidosRouter);

app.listen(3000, async () => {
  try {
    await readFile(fileName);
    logger.info("API Started!");
  } catch (err) {
    logger.error(err);
  }
});