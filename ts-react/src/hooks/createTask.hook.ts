import type { IResponse } from "@/types/response.interface";
import type { ITask } from "@/types/tasks.interface";
import { useMutation } from "@tanstack/react-query";
//use to invalidate the form for auto-refresh
import { useQueryClient } from "@tanstack/react-query"; 
import { toast } from "sonner";


const createTask = async (task: ITask) => {
    
    const response = await fetch(`${import.meta.env.VITE_API_UL}tasks/create`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(task)
    });

    if(!response.ok){
        throw new Error("Network response not ok");
    }
    return await response.json();
}


export function useCreateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTask,
        onSuccess: (response: IResponse<ITask>) => {
            console.log(response + " successfully created task");
            queryClient.invalidateQueries({
                queryKey: ["fetchTasks"], //fetchTasks
                refetchType: "all",
              });
              toast.success("Task marked as created!");
        },
        onError: (error) =>{
            console.log(error + " Failed to create task");
        }
   });
}