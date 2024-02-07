import { Router } from "express";
import * as ac from "../controllers/admin/admin.js";
import { valid } from "../middleware/validation.js";
import * as vSchema from "../controllers/admin/admin.valid.js";
import { isAuth, roles } from "../middleware/auth.js";
const router = Router();

//user routes
//login admin instructor
router.post("/login", valid(vSchema.login), ac.login);

//create admin or instructor
router.post(
  "/CreateAdminInstructor",
  valid(vSchema.CreateAdminInstructor),
  isAuth([roles.admin]),
  ac.CreateAdminInstructor
);

router.put(
  "/updateAdminInstructor",
  valid(vSchema.updateAdminInstructor),
  isAuth([roles.super]),
  ac.updateAdminInstructor
);

router.post(
  "/deleteAdminInstructor",
  valid(vSchema.deleteAdminInstructor),
  isAuth([roles.super]),
  ac.deleteAdminInstructor
);

export default router;
