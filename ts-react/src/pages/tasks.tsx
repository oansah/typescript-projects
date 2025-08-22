import type { FC, ReactElement } from "react";
import { TaskCounter } from "@/components/taskCounter/taskCounter";
import { Task } from "@/components/tasks/tasks"
import { TaskSidebar } from "@/components/taskSidebar/taskSidebar";
import { useFetchTasks } from "@/hooks/useFetchTasks.hook";
import type { ITask } from "@/types/tasks.interface";



export const Tasks: FC = (): ReactElement => {

const {data, isSuccess, isError, isPending} = useFetchTasks({

});



    const formattedDate = new Date().toLocaleDateString("en-GB",{
        weekday: 'long',
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
       });


    return  <section className="flex flex-row w-full p-4 gap-8">
        <section className="flex basis-2/3 justify-center">
            <div className="flex flex-col w-4/5 p-4">
                <h1 className="text-white font-bold text-2xl mb-8">{`Task as on: ${formattedDate}`}</h1>
            
                <div className="flex justify-around mb-12">
                     <TaskCounter
                        status="todo"
                        count={
                            data && data.meta && "todoTasks" in data.meta
                            ? (data.meta.todoTasks as number)
                            : 0
                        }
                        />

                        <TaskCounter
                        status="inProgress"
                        count={
                            data && data.meta && "inProgressTasks" in data.meta
                            ? (data.meta.inProgressTasks as number)
                            : 0
                        }
                        />
                        
                        <TaskCounter
                        status="completed"
                        count={
                            data && data.meta && "completedTasks" in data.meta
                            ? (data.meta.completedTasks as number)
                            : 0
                        }
                        />
                </div>
               

                {
                    data &&
                        Array.isArray(data.data) &&
                        data.data.every(
                        (item): item is ITask =>
                            "_id" in item &&
                            "title" in item &&
                            "description" in item &&
                            "status" in item &&
                            "priority" in item &&
                            "dueDate" in item
                        ) &&
                        data.data.map((task: ITask) => (
                        <Task
                            key={task["_id"]}
                            dueDate={task.dueDate}
                            description={task.description}
                            status={task.status}
                            priority={task.priority}
                            title={task.title}
                            _id={task._id}
                        />
                        ))
                }
                
            </div>
            
        </section>

        <section className="flex basis-1/3">
            <TaskSidebar />
        </section>
    </section>
}