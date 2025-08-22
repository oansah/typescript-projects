import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { format } from "date-fns"
  import { Calendar as CalendarIcon } from "lucide-react"
   
  import { cn } from "@/lib/utils"
  import { Button } from "@/components/ui/button"
  import { Calendar } from "@/components/ui/calendar"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { Textarea } from "@/components/ui/textarea"
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateTaskSchema } from "@/schemas/createTasks.schema";
import {z} from "zod"
import { SelectGroup } from "@radix-ui/react-select";
import { useCreateTask } from "@/hooks/createTask.hook";
//import { Toaster } from "@/components/ui/sonner"
import { Toaster, toast } from "sonner"
//import type { ToasterProps } from "sonner";
import { useQueryClient } from "@tanstack/react-query"; 


export const CreateTaskForm = () => {
    const [date, setDate] = useState<Date>();
    const {mutate, isSuccess, isError, isPending} = useCreateTask();
    const queryClient = useQueryClient();


    const form = useForm<z.infer<typeof CreateTaskSchema> > ({
        resolver: zodResolver(CreateTaskSchema),
        defaultValues: {
            status: "todo",
            priority: "normal"
        }
    });

    

    function onSubmit(values: z.infer<typeof CreateTaskSchema>) {
        let dueDate = values.dueDate.toISOString();
        mutate({ ...values, dueDate });
        /*queryClient.invalidateQueries({
          queryKey: ["fetchTasks"],
          refetchType: "all", // refetch both active and inactive queries
        });*/
      }

   useEffect(()=>{
        if(isSuccess){
            toast("New task is created")
        }
        form.reset();
   },[isSuccess]);

    return <div>
            <h2  className="text-xl mb-4 npx shadcn@latest add input">Create a new task</h2>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div  className="py-2"> 
                        <FormField 
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="text" placeholder="Task title"  {...field} value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage />

                            </FormItem>
                          )}
                        />
                        
                    </div>

                    <div className="flex flex-row justify-between py-2"> 
                          <div className="m-full mr-2 ">

                          <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                        <Select onValueChange={field.onChange}  value={field.value ?? ""} >
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="todo">Todo</SelectItem>
                                                    <SelectItem value="inProgress"> In Progress </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                            />
                                   
                             
                          </div>



                          <div className="m-full ml-2 ">
                          <FormField
                                    control={form.control}
                                    name="priority"
                                    render={({ field }) => (
                                        <FormItem>
                                        <Select onValueChange={field.onChange} value={field.value ?? ""}  >
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Priority" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="low">Low</SelectItem>
                                                    <SelectItem value="normal">Normal</SelectItem>
                                                    <SelectItem value="high">High</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                            />
                          </div>
                    </div>

                    <div id='datePicker' className="py-2">
                    <FormField 
                          control={form.control}
                          name="dueDate"
                          render={({ field }) => (
                            <FormItem>
                                     <Popover>
                                        <PopoverTrigger asChild>

                                            <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        data-empty={!field.value}
                                                        className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                                                        >
                                                        <CalendarIcon />
                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={field.value} onSelect={field.onChange}
                                            disabled={(date)=> date < new Date() }
                                            autoFocus  />
                                        </PopoverContent>
                                    </Popover>
                                <FormMessage />

                            </FormItem>
                          )}
                        />
                        


                          
                                   
                             
                             
                        
                    </div>

                    <div className="py-2">
                    <FormField 
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Task Description" {...field } value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage />

                            </FormItem>
                          )}
                        />
                        
                    </div>

                    <div className="py-2 flex justify-end">
                            <Button type="submit">Create Task</Button>
                    </div>

            </form>
        </Form>
        <Toaster />
    </div>
}