import { Hono } from "hono";
import {
  logoutController,
  signInController,
  signUpController,
} from "../controllers/user.controller";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", signUpController);

userRouter.post("/signin", signInController);

userRouter.post("/logout", logoutController);
