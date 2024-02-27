import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { hashPassword } from "./utils/hashPassword";
import { verifyPassword } from "./utils/verifyPassword";

const signup = async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body);

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return c.json({ error: "User already exists" });
    }

    const hashedPassword = await hashPassword(body.password);
    console.log(hashedPassword);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    return c.json({ error: "An error occurred while signing up" });
  }
};

const signIn = async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const passwordMatch = await verifyPassword(body.password, user.password);
  console.log(passwordMatch);

  if (!passwordMatch) {
    c.status(403);
    return c.json({ error: "Incorrect password" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
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
