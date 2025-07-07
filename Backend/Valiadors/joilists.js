
//  joii schema
import Joi from "joi"

export const listSchema = Joi.object({
  task: Joi.string().min(2).required().messages({
    "string.empty": "Task is required",
    "string.min": "Task must be at least 2 characters long",
  }),

});
