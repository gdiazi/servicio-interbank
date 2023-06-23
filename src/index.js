import express from "express";
import cors from "cors";
//import path from "path";



import { clienteRouter } from "./routes/clientes.routes.js";

import dotenv from "dotenv";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


//const swaggerSpec = swaggerJSDoc(options)


dotenv.config();
// //Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Registro API", version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3000"
            },

        ]
    },
    apis: ["./src/documentacion/*.yml"],

};

const swaggerSpec = swaggerJSDoc(options)


//-------------------------------------------------

const servidor = express();
const PORT = process.env.PORT ?? 3000;

servidor.use(cors());
servidor.use(express.json());

servidor.use(clienteRouter);

servidor.use('/api', clienteRouter);
servidor.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




//servidor.use('/api', clienteRouter);

servidor.listen(PORT, () => {
    console.log("Servidor corriendo exitosamente en el puerto 3000");
});


