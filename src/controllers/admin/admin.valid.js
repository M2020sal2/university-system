import joi from "joi";
import { generalFields } from "../../middleware/validation.js";
export const CreateAdminInstructor = {
  body: joi
    .object({
      FullName: joi.string().min(9).max(66).required(),
      email: generalFields.email,
      password: generalFields.password,
      Date_of_Birth: joi.date().iso().required(),
      phone: joi.string().min(11).max(11).required(),
      gender: joi.string().valid("male", "female").required(),
      role: joi.string().valid("admin", "instructor").required(),
    })
    .required(),
};
export const login = {
  body: joi
    .object({
      email: generalFields.email,
      password: generalFields.password,
    })
    .required(),
};
