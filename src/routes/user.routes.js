import { Router } from "express";
import * as uc from "../controllers/user/user.js";
import { valid } from "../middleware/validation.js";
import * as vSchema from "../controllers/user/user.valid.js";
import { isAuth, roles } from "../middleware/auth.js";
const router = Router();

//user routes

router.post("/login", valid(vSchema.login), uc.login);

router.post(
  "/add_stu",
  valid(vSchema.registeruser),
  isAuth([roles.admin]),
  uc.add_stu
);

router.get(
  "/getuser",
  // valid(vSchema.Getstudent),
  isAuth([roles.stu, roles.instructor, roles.admin]),
  uc.Getuser
);

router.put(
  "/updateStudent",
  valid(vSchema.updateStudent),
  isAuth([roles.admin]),
  uc.updateStudent
);

router.delete(
  "/deleteStudent",
  valid(vSchema.deleteStudent),
  isAuth([roles.admin]),
  uc.deleteStudent
);

router.post("/auth", isAuth(["admin"]));
// missed login with Gmail   <<<<=====
export default router;
