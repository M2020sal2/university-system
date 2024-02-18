import { Router } from "express";
import * as sc from "../controllers/semster/semster.js";
import { valid } from "../middleware/validation.js";
import * as vSchema from "../controllers/semster/semster.valid.js";
import { isAuth, roles } from "../middleware/auth.js";
const router = Router();

//user routes

// router.post("/login", valid(vSchema.login), uc.login);

router.post(
  "/addsemster",
  valid(vSchema.addsemster),
  isAuth([roles.admin]),
  sc.addsemster
);
// missed login with Gmail   <<<<=====
export default router;
