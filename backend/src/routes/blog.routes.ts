import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import {
  authorization,
  getAllBlogs,
  getSingleBlog,
  postBlog,
  updateBlog,
} from "../controllers/blog.controller";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// blogRouter.use("/*", authorization);

blogRouter.post("/post", postBlog);

blogRouter.put("/update", updateBlog);

blogRouter.get("/bulk", getAllBlogs);

blogRouter.get("/:id", getSingleBlog);
