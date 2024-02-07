import joi from "joi";
import { generalFields } from "../../middleware/validation.js";
export const CreateAdminInstructor = {
  body: joi
    .object({
      FullName: joi.string().min(9).max(66).required(),
      email: generalFields.email.required(),
      password: generalFields.password.required(),
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

export const updateAdminInstructor = {
  body: joi
    .object({
      FullName: joi.string().min(9).max(66).optional(),
      email: generalFields.email.optional(),
      password: generalFields.password.optional(),
      Date_of_Birth: joi.date().iso().optional(),
      phone: joi.string().min(11).max(11).optional(),
      gender: joi.string().valid("male", "female").optional(),
      role: joi.string().valid("admin", "instructor").optional(),
    })
    .required(),
  // paramas: joi.object().required(),
  query: joi
    .object({
      userId: generalFields._id.required(),
    })
    .required(),
  // file: joi.object().required(),
};
export const deleteAdminInstructor = {
  query: joi
    .object({
      userId: generalFields._id.required(),
    })
    .required(),
};
