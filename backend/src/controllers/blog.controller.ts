import {Context} from "hono";
import {getCookie} from "hono/cookie";
import {verify} from "hono/jwt";
import {PrismaClient} from "@prisma/client/edge";
import {withAccelerate} from "@prisma/extension-accelerate";


interface authenticatedUser extends Context {
    userId?: string;
}

const authorization = async (c: authenticatedUser, next: () => Promise<unknown>) => {
    const jwt = getCookie(c, 'jwt');

    if (!jwt) {
        c.status(401);
        return c.text('You are not logged in');
    }

    try {
        const user = await verify(jwt, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id);
            await next();
        } else {
            c.status(401);
            return c.text('You are not logged in');
        }
    } catch (e: any) {
        console.log(e.message);
        c.status(401);
        return c.text('Unauthorized');
    }
}

const postBlog = async (c: authenticatedUser) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const userId = c.get('userId');
        const body = await c.req.json();
        const post = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });
        return c.json({
            message: "Post created",
            id: post.id
        });
    } catch (e: any) {
        console.log(e.message);
        c.status(500);
        return c.text('Internal server error');
    }

}

const updateBlog = async (c: authenticatedUser) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const userId = c.get('userId');
        const body = await c.req.json();
        const post = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        });
        return c.json({
            message: "Post updated",
            id: post.id
        });
    } catch (e: any) {
        console.log(e.message);
        c.status(500);
        return c.text('Internal server error');
    }
}

const getAllBlogs = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.blog.findMany();
        return c.json(posts);
    } catch (e: any) {
        console.log(e.message);
        c.status(500);
        return c.text('Internal server error');
    }

}

const getSingleBlog = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const id = c.req.param("id");
        const blog = await prisma.blog.findUnique({
            where: {
                id: id
            },
            select :{
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json(blog);
    } catch (e: any) {
        console.log(e.message);
        c.status(500);
        return c.text('Internal server error');
    }

}

export {postBlog, authorization, updateBlog,getAllBlogs,getSingleBlog}