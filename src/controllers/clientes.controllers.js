import { Prisma } from "../prisma.js";



export const crearCliente = async (req, res) => {
    const data = req.body;

    try {
        const nuevoCliente = await Prisma.clientes.create({
            data: {
                ...data,
                fecha_nacimiento: new Date(data.fecha_nacimiento),
            },
        });



        return res.status(201).json({
            content: nuevoCliente,
            message: "Cliente creado exitosamente",
        });

    } catch (error) {
        return res.status(400).json({
            message: "Error al crear el cliente",
            content: error.message,
        });
    }
    console.log(data);
};



export const listarCliente = async (req, res) => {


    try {
        const promedio = await Prisma.clientes.aggregate({
            _avg: {
                edad: true,
            },
        });

        res.json({ promedio });
    } catch (error) {
        return res.status(400).json({
            message: "Error al obtener edad",
            content: error.message,
        });
    }
};



export const promediarCliente = async (req, res) => {
    try {
        const edades = await Prisma.clientes.findMany({
            select: {
                edad: true,
            },
        });

        const arrayEdades = edades.map((cliente) => cliente.edad);

        const promedio = arrayEdades.reduce((sum, edad) => sum + edad, 0) / arrayEdades.length;
        const varianza = arrayEdades.reduce((sum, edad) => sum + Math.pow(edad - promedio, 2), 0) / arrayEdades.length;
        const desviacion = Math.sqrt(varianza);

        res.json({ desviacion });
    } catch (error) {
        console.error('Error al obtener la desviación estándar:', error);
        res.status(500).json({ error: 'Error al obtener la desviación estándar' });
    }
};


export const vidaCliente = async (req, res) => {
    try {
        const personas = await Prisma.clientes.findMany({
            where: {
                edad: {
                    gt: 70, // Filtrar personas con esperanza de vida mayor a 70 años
                },
            },
        });

        res.json({ personas });
    } catch (error) {
        console.error('Error al obtener las personas con esperanza de vida:', error);
        res.status(500).json({ error: 'Error al obtener las personas con esperanza de vida' });
    }
};
