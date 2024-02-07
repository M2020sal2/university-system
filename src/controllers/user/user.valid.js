import joi from "joi";
import { generalFields } from "../../middleware/validation.js";
export const registeruser = {
  body: joi
    .object({
      Full_Name: joi.string().min(9).max(66).required(),
      National_Id: joi.string().length(14).required(),
      Student_Code: joi.string().length(14).required(),
      Semester: joi.string().valid("one", "two").required(),
      Level: joi.string().valid("one", "two", "three", "four").required(),
      Academic_Year: joi.string().min(4).max(12).required(),
      Date_of_Birth: joi.date().iso().required(),
      PhoneNumber: joi.string().min(11).max(11).required(),
      department: joi.string().valid("cs", "is", "ai", "sc").optional(),
      gender: joi.string().valid("male", "female"),
    })
    .required(),
  // paramas: joi.object().required(),
  // query: joi.object().required(),
  // file: joi.object().required(),
};

export const login = {
  body: joi
    .object({
      Student_Code: joi.string().length(14).required(),
      password: joi.string().min(8).max(24).required(),
    })
    .required(),
};

export const updateStudent = {
  body: joi
    .object({
      Full_Name: joi.string().min(9).max(66).optional(),
      National_Id: joi.string().length(14).optional(),
      Student_Code: joi.string().length(14).optional(),
      Semester: joi.string().valid("one", "two").optional(),
      Level: joi.string().valid("one", "two", "three", "four").optional(),
      Academic_Year: joi.string().min(4).max(12).optional(),
      Date_of_Birth: joi.date().iso().optional(),
      PhoneNumber: joi.string().min(11).max(11).optional(),
      department: joi.string().valid("cs", "is", "ai", "sc").optional(),
      gender: joi.string().valid("male", "female"),
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

export const deleteStudent = {
  query: joi
    .object({
      userId: generalFields._id.required(),
    })
    .required(),
};
