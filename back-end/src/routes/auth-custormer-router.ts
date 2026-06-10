import { Router } from "express";

import { login } from "../controller/customerController";

import { validateRequest } from "../middlewares/validate-Request-Body";

import { registerSchema } from "../schemas/register-user.schema";
import { registerCustomer } from "../controller/customerController";
import { loginSchema } from "../schemas/login-user.schema";
import { authRateLimiter } from "../middlewares/rateLimiter";

const router = Router();
router
  .route("/login")
  .post(validateRequest(loginSchema), authRateLimiter, login);
//

router
  .route("/users/register")
  .post(validateRequest(registerSchema), registerCustomer);

export default router;
