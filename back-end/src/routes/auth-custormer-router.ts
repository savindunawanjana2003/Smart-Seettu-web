import { Router } from "express";
// import {
//   login,
//   logout,
//   refreshToken,
//   getMyDetails,
//   createNewUser, // Admin විසින් අලුත් අය ඇතුලත් කරන Controller එක
// } from "../controllers/authController";

import { login } from "../controller/customerController";
// import { authenticate } from "../middleware/auth";
// import { requireRole } from "../middlewares/role";
import { validateRequest } from "../middlewares/validate-Request-Body";
import { authRateLimiter } from "../middlewares/rateLimiter"; // Brute-force attacks වැලැක්වීමට
import { loginSchema } from "../schemas/login-user.schema";
// import { authenticate } from "../middlewares/auth";
// import { UserRole } from "../models/user-profile";
import { registerSchema } from "../schemas/register-user.schema";
import { registerCustomer } from "../controller/customerController";

const router = Router();

router.route("/login").post(authRateLimiter, login);
//  validateRequest(loginSchema),

router
  .route("/users/register")
  .post(validateRequest(registerSchema), registerCustomer);

export default router;
