import { injectable, inject} from "inversify";
import { UserController } from "../users/user.controller";
import { Task } from "./task.schema";
import { Request, Response } from "express";
import { ITask, IPartialTaskWithTaskId } from "./task.interfaces";
import { Document } from "mongoose";
import { StatusCodes } from "http-status-codes";
import { TaskService } from "./tasks.service";
import { UpdateTaskProvider } from "./providers/updateTasks.provider";
import { matchedData } from "express-validator";
import { ITaskPagination } from "./interfaces/task.pagination.interface";
import { ItalyAdditionalInfo } from "aws-sdk/clients/taxsettings";
import { GetTasksProvider } from "./providers/getTasks.providers";



@injectable()
export class TasksController {
    constructor(@inject(UserController) private userController: UserController,
               @inject(TaskService) private taskService:TaskService,
               @inject(UpdateTaskProvider) private updateTaskProvider:UpdateTaskProvider,
               @inject(GetTasksProvider) private getTasksProvider:GetTasksProvider){}

    public async handlePostTasks(req: Request<{},{}, ITask>, res: Response){
      //  const task: Document<unknown, any, ITask> = new Task(req.body);
      const validatedData:ITask = matchedData(req);
      try{
        //const task: Document<unknown, any, ITask> = await this.taskService.createTask(validatedData); await task.save();return task;
        return await this.taskService.createTask(validatedData);
      }catch(error: any){throw new Error(error);}
    }


    public async handleGetTasks(req: Request, res: Response){
        const validatedData: Partial<ITaskPagination> = matchedData(req);
        try{
                const tasks: {data: ITask[]; meta: {}} = await this.getTasksProvider.findAllTasks(validatedData);
                return tasks;
        }catch(error: any){ throw new Error(error);}
       
        
    }

    public async handleGetTasks3(req: Request,res: Response): Promise<{ data: ITask[]; meta: {} }> {
      const validatedData = matchedData(req);
  
      try {
        const tasks: { data: ITask[]; meta: {} } =
          await this.getTasksProvider.findAllTasks(validatedData);
        return tasks;
      } catch (error: any) {
        throw new Error(error);
      }
    }

    public async handlePatchTasks(req: Request<{},{}, IPartialTaskWithTaskId>, res: Response): Promise<Document>{
        const validatedData: IPartialTaskWithTaskId = matchedData(req);
        try{
                return await this.updateTaskProvider.updateTask(validatedData);
        }catch(error: any){
                throw new Error(error);
        }
         
      }

   /* public async handlePatchTasks(req: Request<{},{}, IPartialTaskWithTaskId>, res: Response){
      //  const task = await Task.findById(req.body._id);
      const task = await this.taskService.findById(req.body._id);
        if(task){
            task.title = req.body.title ? req.body.title : task.title;
            task.description = req.body.description ? req.body.description : task.description;
            task.dueDate = req.body.dueDate ? req.body.dueDate : task.dueDate;
            task.status = req.body.status ? req.body.status : task.status;
            task.priority = req.body.priority ? req.body.priority : task.priority;
            await task.save();
            return task;
        }else{
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "No document found with the given _id "+ req.body._id
            });
        }
       
    }*/


    public async handleDeleteTaskById(req: Request, res: Response){
     const result = await Task.findByIdAndDelete(req.query.id);
    //const result = await this.taskService.deleteById(req.query.id);
      if (result) {
        console.log("Deleted document:", result);
      } else {
        console.log("No document found with that _id "+ req.query.id);
       /* res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "No document found with the given _id",
          });*/
      }
      return result;
        /*try {
            if (result) {
              console.log("Deleted document:", result);
            } else {
              console.log("No document found with that _id");
            }
            return result;
          } catch (err) {
            console.error("Error deleting document:", err +" "+ req.query.id);
          } finally {
           // mongoose.connection.close();
          }
          return result;*/
    }


}