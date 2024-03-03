import {Context} from "hono";
import {PrismaClient} from "@prisma/client/edge";
import {withAccelerate} from "@prisma/extension-accelerate";
import {setCookie} from "hono/cookie";
import {sign} from "hono/jwt";
import {signinInput, signupInput} from "@100xdevs/medium-common";

const signUpController = async (c: Context) => {

    interface requestBody {
        username: string;
        password: string;
        name?: string
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();

        if (!body.username || !body.password) {
            return c.text('Missing username or password')
        }
        const {success} = signupInput.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({
                message: "Inputs not correct"
            })
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                username: body.username,
            },
        });

        if (existingUser) {
            return c.json({error: "User already exists"});
        }

        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name
            }
        })
        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET);

        setCookie(c, 'jwt', jwt, {secure: true, httpOnly: true,})

        return c.text("Sign up successful")
    } catch (e: any) {
        console.log(e.message);
        c.status(411);
        return c.text('Invalid')
    }
}

const signInController = async (c: Context) => {
    interface requestBody {
        username: string;
        password: string;
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();

        if (!body.username || !body.password) {
            return c.text('Missing username or password')
        }

        const {success} = signinInput.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({
                message: "Inputs not correct"
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                username: body.username,
            },
        });

        if (!user) {
            return c.json({error: "User does not exist"});
        }

        if (user.password !== body.password) {
            return c.json({error: "Invalid password"});
        }

        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET);

        setCookie(c, 'jwt', jwt, {secure: true, httpOnly: true,})

        return c.text("Sign in successful")
    } catch (e: any) {
        console.log(e.message);
        c.status(411);
        return c.text('Invalid')
    }
}
export {signUpController, signInController}
