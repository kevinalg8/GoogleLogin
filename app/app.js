import express from "express";
import dotenv from "dotenv";
import { loginRouter } from "./routes/login.routes.js";
import passport from "passport";
import "./middlewares/google.js";
import ejs from "ejs";
import path from "path";
import * as url from "url";
import routeHome from "./routes/backoffice.routes.js";
import route from "./routes/home.routes.js";


dotenv.config();
const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.set("port", process.env.PORT || 9999);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(passport.initialize());
app.use(express.static(__dirname + '../public'));

app.use("/auth", passport.authenticate("auth-google",{

    scope:[
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ],
    session:false
}), loginRouter);
app.use("/", routeHome);

app.use("/", route);

// app.get("/", (req, res)=>{
//     res.send("Hola");
// })

export default app;
