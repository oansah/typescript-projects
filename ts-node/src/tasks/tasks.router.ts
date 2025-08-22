import { Router, Request, Response } from "express";
import { TasksController } from "./tasks.controller";
import { injectable, inject } from "inversify";
import { IPartialTaskWithTaskId, ITask } from "./task.interfaces";
import { createTaskValidator } from "./validators/createTask.validator";
import { validationResult } from "express-validator";
import { getTasksValidator, deleteTaskByIdValidator } from "./validators/getTasks.validator";
import { StatusCodes } from "http-status-codes";
import { updateTaskValidator } from "./validators/updateTask.validator";

/*export const taskRouter: Router =  Router(); //creates a default router


const tasksController: TasksController = container.get<TasksController>(TasksController);
taskRouter.post("/create", (req: Request, res: Response) => {
    const newTask = tasksController.createTask(); 
    res.json(newTask);
  });
  */

  @injectable()
  export class TaskRouter {
    public router: Router;

    constructor(@inject(TasksController) private taskController: TasksController){ 
        this.router = Router();
        this.initializeRoutes();
    
    }
 
    private initializeRoutes(){

        //post
        this.router.post("/create", createTaskValidator, async (req: Request<{},{}, ITask>, res: Response) => {
            const resultValidation = validationResult(req);
            if(resultValidation.isEmpty()){
              const newTask = await  this.taskController.handlePostTasks(req, res); 
              res.status(StatusCodes.ACCEPTED).json(newTask);
            }else{
              res.status(StatusCodes.BAD_REQUEST).json(resultValidation.array());
            }
            
          }); 
          
        //get 
        this.router.get("/", getTasksValidator, async (req: Request, res: Response) => {
          const result = validationResult(req);
          //console.log(resultValidation);
       //   console.log(req.query);
            if(result.isEmpty()){
              const allTasks = await this.taskController.handleGetTasks(req, res);
              //res.status(StatusCodes.OK).json(allTasks);
              res.json(allTasks);
            }else{
              res.status(StatusCodes.BAD_REQUEST).json(result.array());
            }
          });  


        //update
        this.router.patch("/update", updateTaskValidator, async (req: Request<{},{}, IPartialTaskWithTaskId>, res: Response) => {
          const resultValidation = validationResult(req);
            if(resultValidation.isEmpty())  {
                const updatedTask = await this.taskController.handlePatchTasks(req, res); 
                res.status(StatusCodes.OK).json(updatedTask);
            }else  res.status(StatusCodes.BAD_REQUEST).json(resultValidation.array());
          }); 


          //delete 
        this.router.get("/deletebyid", deleteTaskByIdValidator, async (req: Request, res: Response) => {
          const resultValidation = validationResult(req);
          console.log(resultValidation);
          console.log(req.query);
            if(resultValidation.isEmpty()){
              const results = await this.taskController.handleDeleteTaskById(req, res);
              if(null == results)
                  res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "No document found with the given _id "+ req.query.id,
                  })
              else
                res.status(StatusCodes.ACCEPTED).json(results);
            }else{
              res.status(StatusCodes.BAD_REQUEST).json(resultValidation.array());
            }
          });  


    }
  } 