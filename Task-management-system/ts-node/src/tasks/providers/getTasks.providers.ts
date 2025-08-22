import { injectable, inject } from "inversify";
import { TaskService } from "../tasks.service";
import { ITaskPagination } from "../interfaces/task.pagination.interface";
import { ITask } from "../task.interfaces";

@injectable() 
export class GetTasksProvider{
  constructor(@inject(TaskService) private taskService:TaskService){}

  public async findAllTasks(
    pagination: Partial<ITaskPagination>
  ): Promise<{ data: ITask[]; meta: {} }> {
    const tasks: ITask[] = await this.taskService.findActive({
      limit: pagination.limit ?? 10,
      page: pagination.page ?? 1,
      order: pagination.order ?? "asc",
    });

    console.log("alltasks:"+ tasks);

    const totalTasks = await this.taskService.countDocuments();

    const completedTasks = await this.taskService.countDocuments({
      status: "completed",
    });

    const todoTasks = await this.taskService.countDocuments({
      status: "todo",
    });

    const inProgressTasks = await this.taskService.countDocuments({
      status: "inProgress",
    });

    return {
        data: tasks,
        meta: { totalTasks, completedTasks, todoTasks, inProgressTasks },
      };
  }


  public async findAllTask1(pagination: Partial<ITaskPagination>): Promise<{data: ITask[]; meta: {}}>{
        const tasks: ITask[] =  await this.taskService.findActive({
            limit: pagination.limit ?? 10,
            page: pagination.page ?? 1,
            order: pagination.order ?? "asc"
        });
        console.log(tasks);
        const totalTasks = await this.taskService.countDocuments();
        const completedTasks = await this.taskService.countDocuments({
            status: "completed"
        });
        const totalTodo= await this.taskService.countDocuments({
            status: "todo"
        });
        const inProgressTasks = await this.taskService.countDocuments({
            status: "inProgress"
        });

        return {
            data: tasks,
            meta: {totalTasks, completedTasks, totalTodo, inProgressTasks}
        }

  }

   


}