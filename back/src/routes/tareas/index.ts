import { FastifyPluginAsync } from "fastify";
import * as tareaService from "../../services/tareas.js";
import { TareaFullSchema } from "../../types/tarea.js";
import { Type } from "@sinclair/typebox";

const tareasRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", {
    schema: {
      summary: "Listado de tareas filtradas.",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - response. \n - Solo admin puede ver todas las tareas.",
      tags: ["tareas"],
      querystring: Type.Object({
        nombre: Type.Optional(Type.String()),
        duracion: Type.Optional(Type.String()),
        page: Type.Optional(Type.Number({ default: 1, minimum: 1 })),
        page_size: Type.Optional(Type.Number({ default: 5, minimum: 1 })),
      }),
      response: {
        200: {
          description: "Lista de tareas filtradas.",
          content: {
            "application/json": {
              schema: Type.Object({
                tasks: Type.Array(TareaFullSchema),
                totalTasks: Type.Number(), //total de tareas filtradas
              }),
            },
          },
        },
      },
    },

    handler: async function (request, reply) {
      const {
        nombre,
        duracion,
        page = 1,
        page_size = 5,
      } = request.query as {
        nombre?: string;
        duracion?: string;
        page?: number;
        page_size?: number;
      };

      // Obtiene todas las tareas y aplica los filtros
      let tareas = await tareaService.findAll();
      if (nombre) {
        tareas = tareas.filter((tarea) => tarea.nombre.includes(nombre));
      }
      if (duracion) {
        tareas = tareas.filter((tarea) => String(tarea.duracion) === duracion);
      }

      // Calcula el número total de tareas filtradas
      const totalTasks = tareas.length;

      //paginación
      const startIndex = (page - 1) * page_size;
      const paginatedTareas = tareas.slice(startIndex, startIndex + page_size);

      reply.send({
        tasks: paginatedTareas,
        totalTasks, // Devuelve el total de tareas filtradas para el front
      });
    },
  });
};

export default tareasRoutes;
