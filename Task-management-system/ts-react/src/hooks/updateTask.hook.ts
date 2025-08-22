import type { IResponse } from "@/types/response.interface";
import type { ITask } from "@/types/tasks.interface";
import type { IUpdateTask } from "@/types/updateTask.interface";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query"; 
import { toast } from "sonner";


const updateTask = async (task: IUpdateTask) => {
    
    const response = await fetch(`${import.meta.env.VITE_API_UL}tasks/update`, {
        method: "PATCH",
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


export function useUpdateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTask,
        onSuccess: (response) => {
            console.log(response + " successfully updated task");
            queryClient.invalidateQueries({
                queryKey: ["fetchTasks"],
                refetchType: "all",
              });
              toast.success("Task successfully updated!");
        },
        onError: (error) =>{
            console.log(error + " failed to update task");
        }
   });
}