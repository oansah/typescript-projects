import "reflect-metadata"

import express, { Express, Request, Response } from "express";
import { addRoutes } from "./src/config/routes.config";
import mongoose from "mongoose";
import * as dotenv from "dotenv"
import { responseFormatter } from "./src/middleware/responseFormatter.middleware";
import cors, {CorsOptions} from "cors";

 

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

let corsOptions: CorsOptions = {
  origin : "http://example.com"
}
//app.use(cors(corsOptions));
app.use(cors()); //deffault option.allows request from any origin        
app.use(express.json());
app.use(responseFormatter);

/*app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server.");
});
*/


addRoutes(app);

async function bootstrap(){
  if(!process.env.DATABASE_URL) {
    throw new Error("cannot read from environment variables");
    process.exit(1);
  }
  try{
    await mongoose.connect(
      process.env.DATABASE_URL,
      { dbName: process.env.DATABASE_NAME}
    );
      console.log("connected to Mongo db");

      app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
       
      });
  }catch(error){
    console.log(error);
    process.exit(1);
  }
}


bootstrap();
