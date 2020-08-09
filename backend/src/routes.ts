import { Router } from "express";

import ClassesController from "./controllers/ClassesController";
import ConnectionController from "./controllers/ConnectionController";

const routes = Router();

routes.get("/classes", ClassesController.index);
routes.post("/classes", ClassesController.store);

routes.post("/connections", ConnectionController.store);
routes.get("/connections", ConnectionController.index);

export default routes;
