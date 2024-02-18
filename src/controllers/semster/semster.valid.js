import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addsemster = {
  body: joi
    .object({
      name: joi.string().min(4).max(33).required(),
      level: joi
        .string()
        .valid("one", "two", "three", "four", "graduated")
        .required(),
      term: joi.string().valid("one", "two", "Summer").required(),
      Academic_Year: joi.string().min(5).max(14).required(),
      MinAvailableHours: joi.number().min(3).max(144).required(),
    })
    .required(),
};
