import { Router } from "express";
import * as cc from "../controllers/course/course.js";
import { valid } from "../middleware/validation.js";
import * as vSchema from "../controllers/course/coursevalid.js";
import { isAuth, roles } from "../middleware/auth.js";
const router = Router();

//user routes

// router.post("/login", valid(vSchema.login), uc.login);

router.post(
  "/addcourse",
  valid(vSchema.addcourse),
  isAuth([roles.admin]),
  cc.addCourse
);
// missed login with Gmail   <<<<=====
export default router;
