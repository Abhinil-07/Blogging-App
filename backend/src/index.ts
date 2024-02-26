import { Hono } from "hono";
import { getBlog, postBlog, putBlog, signIn, signup } from "./blog.controller";

// const app = new Hono<{
//   Bindings: {
//     DATABASE_URL: string;
//   };
// }>();

const app = new Hono();

app.post("/", (c) => {
  const dbURL = c.env;
  return c.text("Hello, World!");
});
app.post("/api/v1/signup", signup);

app.get("/api/v1/signin", signIn);

app.get("/api/v1/blog/:id", getBlog);

app.post("/api/v1/blog", postBlog);

app.put("/api/v1/blog/", putBlog);

export default app;
