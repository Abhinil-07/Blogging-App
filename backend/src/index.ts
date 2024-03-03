import {Hono} from 'hono'

import {cors} from 'hono/cors'
import {userRouter} from "./routes/user.routes";
import {blogRouter} from "./routes/blog.routes";

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

app.use('/*', cors({
    origin :"http://localhost:5173",
    credentials : true
}))
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);
export default app