import { Application } from "express";
import {container} from "./container";
import { TaskRouter } from "../tasks/tasks.router";

export function addRoutes(app: Application): Application {
    const tasksRouter = container.get<TaskRouter>(TaskRouter) ;
    app.use("/tasks", tasksRouter.router);
    return app;
}


