import {z} from "zod"

export const CreateTaskSchema = z.object({
    title: z.string({required_error:"Title is required"}).max(100, {message: "Title must be maximum of 100 characters"}),
    dueDate: z.date({required_error: "Due date is mandatory"}),
    description: z.string({required_error: "Description is required"}).max(500, {message:"The description cannot be more than 500 characters"}),
    status: z.enum(["todo", "inProgress","completed"], {message:"Status is required"}),
    priority: z.enum(["low", "normal","high"], {message:"Priority is required"}),
});