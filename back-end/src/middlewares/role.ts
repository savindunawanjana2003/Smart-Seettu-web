// import { NextFunction, Response, Request } from "express";
// import { UserRole } from "../models/user-profile";
// import { AutheReqest } from "./auth";
// import { AppError } from "../errors/AppError";
// import { includes } from "zod";

// export const requireRole = (roles: UserRole[]) => {
//   return (req: AutheReqest, res: Response, next: NextFunction) => {
//     if (!req.user) {
//       throw new AppError("Unauthorized", 401);
//     }

//     // now  compare two array
//     // Check if user possesses at least one of the required roles

//     const hasRole = roles.some((role) => req.user.roles?.includes(role));
//     if (!hasRole) {
//       // 403 - Forbidden
//       throw new AppError(`Require ${roles} role to accsess this prossces`, 403);
//     }
//     next();
//   };
// };
