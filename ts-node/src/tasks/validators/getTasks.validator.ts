import { checkSchema } from "express-validator";

export const getTasksValidator = checkSchema({
    limit:{
        in:["query"],
        optional: true,
        isInt: {
            options:{ min: 1 }
        },
        toInt: true
    },
    page:{
        in:["query"],
        optional: true,
        isInt: {
            options:{ min: 1 }
        },
        toInt: true
    },
    order:{
        in:["query"],
        optional: true,
        isIn:{
            options: ["asc", "dsc"]
        }
    }
});


export const deleteTaskByIdValidator = checkSchema({
    id: {
        in: ["query"],                 // validate query param ?id=...
        notEmpty: {
          errorMessage: "id is required",
        },
        isMongoId: {
          errorMessage: "id must be a valid MongoDB ObjectId",
        },
      }
});