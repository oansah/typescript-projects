import { Schema, Model, model } from "mongoose";
import { ITask } from "./task.interfaces";

const taskSchema: Schema<ITask> = new Schema({
    title: {
        type: String,
        required: [true, "Task title is required"],
        maxlength: [100, "Title length cannot be more than 100"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Task description title is required"],
        maxlength: [500, "Description length cannot be more than 100"],
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ["todo", "inProgress", "completed"],
        default: "todo"        
    },
    priority: {
        type: String,
        required: true,
        enum: ["low", "normal", "high"],
        default: "normal"        
    },
    dueDate: {
        type: Date,
        required: true
    }
},{
    timestamps: true
});

export const Task: Model<ITask> =  model("Task", taskSchema);