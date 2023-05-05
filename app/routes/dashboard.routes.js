import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const dash = Router();

dash.get("/inicio", (req, res) => {
    if (req.cookies.ckswf){
    try {
        const token = jwt.verify(req.cookies.ckswf, process.env.SECRET_KEY);
        res.render("dash", {
            "nombre":token.nombre,
            "foto":token.foto,
            "menu": 0
        });

    } catch (error) {
        res.redirect("/");
    }

    } else {
        res.redirect("/");
    }
});

dash.get("/Usuarios", (req, res) => {
    if (req.cookies.ckswf){
    try {
        const token = jwt.verify(req.cookies.ckswf, process.env.SECRET_KEY);
        res.render("dash", {
            "nombre":token.nombre,
            "foto":token.foto,
            "menu": 1
        });

    } catch (error) {
        res.redirect("/");
    }

    } else {
        res.redirect("/");
    }
});


dash.get("/salir", (req, res) => {
    res.clearCookie("ckswf");
    res.redirect("/");
})

export default dash;