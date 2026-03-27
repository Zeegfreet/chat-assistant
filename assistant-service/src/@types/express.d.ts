import { LoggedUser } from "@domain/models/LoggedUser";
import "express";

declare module "express-serve-static-core" {
  interface Request {
    context?: {
        user?: LoggedUser
        [key: string]: unknown
    }
  }
}
