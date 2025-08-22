import { Container } from "inversify";
import { TasksController } from "../tasks/tasks.controller";
import { TaskRouter } from "../tasks/tasks.router";
import { UserController } from "../users/user.controller";
import { TaskService } from "../tasks/tasks.service";
import { UpdateTaskProvider } from "../tasks/providers/updateTasks.provider";
import { GetTasksProvider } from "../tasks/providers/getTasks.providers";



export const container: Container = new Container();
container.bind(TasksController).toSelf().inTransientScope();
container.bind(TaskRouter).toSelf().inTransientScope();
container.bind(UserController).toSelf().inTransientScope();
container.bind(TaskService).toSelf().inTransientScope();
container.bind(UpdateTaskProvider).toSelf().inTransientScope();
container.bind(GetTasksProvider).toSelf().inTransientScope();