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
  "/create",
  valid(vSchema.CreateAdminInstructor),
  isAuth([roles.admin]),
  ac.CreateAdminInstructor
);

router.put(
  "/update",
  valid(vSchema.updateAdminInstructor),
  isAuth([roles.super]),
  ac.updateAdminInstructor
);

router.delete(
  "/delete",
  valid(vSchema.deleteAdminInstructor),
  isAuth([roles.super]),
  ac.deleteAdminInstructor
);

router.patch(
  "/updateRole",
  valid(vSchema.updaterole),
  isAuth([roles.super]),
  ac.updaterole
);
export default router;
