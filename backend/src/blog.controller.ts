import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const signup = async (c: any) => {
  return c.text("Signup!");
};

const signIn = async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  return c.text("Sign In!");
};

const getBlog = async (c: any) => {
  const id = c.req.param("id");
  return c.text(`Get Blog with id: ${id}`);
};

const postBlog = async (c: any) => {
  return c.text("Post Blog!");
};

const putBlog = async (c: any) => {
  return c.text("Put Blog!");
};
export { signup, signIn, getBlog, postBlog, putBlog };
