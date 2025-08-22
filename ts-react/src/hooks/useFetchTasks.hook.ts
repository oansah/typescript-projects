import type { IResponse } from "@/types/response.interface";
import type { ITask } from "@/types/tasks.interface";
import { useQuery } from "@tanstack/react-query";


const fetchTasks = async (): Promise<IResponse<ITask[]>> => {
    
    const response = await fetch(`${import.meta.env.VITE_API_UL}tasks/`, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    });

    if(!response.ok){
        throw new Error("Network response not ok");
    }
    return await response.json();
}


export function useFetchTasks(params: {}) {
        return useQuery({
            queryKey: ["fetchTasks", params],
            queryFn: fetchTasks    
        });
}