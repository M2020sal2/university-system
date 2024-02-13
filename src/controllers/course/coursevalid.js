import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addcourse = {
  body: joi
    .object({
      course_name: joi.string().min(3).max(30).required(),
      credit_hour: joi.number().valid(2, 3).required(),
      desc: joi.string().min(20).max(200).optional(),
      OpenForRegistration: joi.boolean().optional(),
      Prerequisites: joi.array().items(generalFields._id.optional()).optional(),
      instructorId: generalFields._id.optional(),
    })
    .required(),
};
