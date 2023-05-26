import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetch from 'node-fetch';
//import SweetAlert  from "sweetalert2";
import Swal from "sweetalert2";

dotenv.config();

const dash = Router();
//Ruta de inicio
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
//Insertar usuarios
dash.post("/guardar", (req, res)=>{
    if (req.body.name) {
        let data ={  
            name:req.body.name
        }
        let metodo = "POST";
        //Dede aqui podemos modificar los datos de cada
        if(req.body.id){
            data={  
                id:req.body.id,
                name:req.body.name
            }
            metodo = "PUT"
        }
        //res.send("Guardado exitosamente")
        let ruta = 'http://localhost:3000/apiUser/users';
        //let method = "POST";

        let option = {
            method: metodo,
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        try {
            const result = fetch(ruta, option)
            .then(res=>res.json())
            .then(data=>{
                console.log("Datos Guardados");
            })
            .catch (err =>console.log("erro al consumir la API"+ err))
            res.redirect("/v1/usuarios")
            
        } catch (error) {
            
        }
    }else{
        res.send("error")
    }
});
//Editar usuarios
dash.get("/edit-user",(req, res)=>{
    const id = req.query.id;
    const name = req.query.name;

    let datos = {
        id:id,
        name:name
    }

    if (req.cookies.ckswf) {
        try {
            const token = jwt.verify(req.cookies.ckswf, process.env.SECRET_KEY);
            res.render("dash", {
                "nombre":token.nombre,
                "foto":token.foto,
                "menu": 4,
                "datos": datos
            });
        } catch (error) {
            console.log("Error Inicie Sesion ");
        }
    }
})
//Borrar Usuarios
dash.get("/borrar",  async(req, res)=>{
    const id = req.query.id
    if (req.cookies.ckswf) {
        try {
            const token = jwt.verify(req.cookies.ckswf, process.env.SECRET_KEY);

            const url =`http://localhost:3000/apiUser/users/${id}`

            const option ={
                method: "DELETE"
            }
            const result = await fetch (url, option)
            .then(response => response.json())
            .then(data =>{
                //console.log(data);
                if (data[0].affectedRows==1) {
                    //Swal.fire('Usuario Borrado Correctamente')
                    //console.log("Usuario Borrado Correctamente");
                }else{
                    console.log("No se logro borrar el usuario indicado");
                }
            })
            res.redirect("/v1/usuarios")
        } catch (error) {
            console.log(`Error Inicie Sesion ${error}`);
        }
    }
    //res.send({"datos":id})
})
//Cerrar o salir la cookie
dash.get("/salir", (req, res) => {
    res.clearCookie("ckswf");
    res.redirect("/");
})

export default dash;