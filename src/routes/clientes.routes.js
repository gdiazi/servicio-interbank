import { Router } from "express";
import * as controllers from "../controllers/clientes.controllers.js";



export const clienteRouter = Router();

clienteRouter.post("/creacliente", controllers.crearCliente);


clienteRouter.get("/kpideclientes/promedio", controllers.listarCliente);

clienteRouter.get("/kpideclientes/desviacion", controllers.promediarCliente);

clienteRouter.get("/listaclientes", controllers.vidaCliente);