import { Router } from "express";
// import {
//   login,
//   logout,
//   refreshToken,
//   getMyDetails,
//   createNewUser, // Admin විසින් අලුත් අය ඇතුලත් කරන Controller එක
// } from "../controllers/authController";

import { login } from "../controllers/authController";
// import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validateRequest } from "../middleware/validate-Request-Body";
import { authRateLimiter } from "../middleware/rateLimiter"; // Brute-force attacks වැලැක්වීමට
import { loginSchema } from "../schemas/login-user.schema";
import { authenticate } from "../middleware/auth";
import { UserRole } from "../models/user-profile";
import { registerSchema } from "../schemas/register-user.schema";
import { createUser } from "../controllers/authController";

const router = Router();

// Login එක හැමෝටම පොදුයි (Admin, Manager, User ඔක්කොම ලොග් වෙන්නේ මෙතනින්)
router
  .route("/login")
  .post(authRateLimiter, validateRequest(loginSchema), login);

// Token Refresh Mechanism (Session එක දිගටම තියාගන්න)
// router.post("/refresh-token", refreshToken);

/**
 * ==========================================
 * PROTECTED ROUTES (Logged-in Users Only)
 * ==========================================
 */

// තමන්ගේ Profile විස්තර බලාගැනීම
// router.get("/me", authenticate, getMyDetails);

// Logout වීම
// router.post("/logout", authenticate, logout);

/**
 * ==========================================
 * ADMIN ONLY ROUTES (User Management)
 * ==========================================
 */

// Admin කෙනෙකුට විතරයි අලුත් User කෙනෙක් (Admin, Manager හෝ User) System එකට එකතු කරන්න පුළුවන්
router.route("/users/create").post(
  authenticate, // 1. කලින් ලොග් වෙලා ඉන්න ඕනේ
  requireRole([UserRole.ADMIN]), // 2. අනිවාර්යයෙන්ම Admin කෙනෙක් වෙන්න ඕනේ
  validateRequest(registerSchema), // 3. Request Body එක Validate කරනවා
  createUser, // 4. Controller Logic එක
);

export default router;
