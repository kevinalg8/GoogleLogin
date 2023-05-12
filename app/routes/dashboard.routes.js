import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetch from 'node-fetch'
import { response } from "express";

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
//Fetch donde se consume la Base de datos 
dash.get("/Usuarios", async(req, res) => {
    if (req.cookies.ckswf){
    try {
        const token = jwt.verify(req.cookies.ckswf, process.env.SECRET_KEY);
        let ruta = 'http://localhost:3000/apiUser/users';
        let option = {
            method:"GET"
        }
        let datos = {};
        const respuesta = await fetch(ruta, option)
        .then(response => response.json())
        .then(data =>{
            datos = data[0];
            //console.log(data[0])
        })
        .catch(err => console.error("Error en la peticion" +err));




        res.render("dash", {
            "nombre":token.nombre,
            "foto":token.foto,
            "menu": 1,
            "datos": datos
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