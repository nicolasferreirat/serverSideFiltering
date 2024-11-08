import { FastifyPluginAsync } from "fastify";
import * as tareaService from "../../services/tareas.js";
import { TareaFullSchema } from "../../types/tarea.js";
import { Type } from "@sinclair/typebox";

const tareasRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/total", {
    schema: {
      summary: "Listado de tareas completo.",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - response. \n - Solo admin puede ver todas las tareas.",
      tags: ["tareas"],
      /*querystring: Type.Object({
        page: Type.Optional(Type.Number({ minimum: 1, default: 1 })), // Parámetro de paginación
        limit: Type.Optional(Type.Number({ minimum: 1, default: 5 })), // Límite de tareas por página
      }),*/
      response: {
        200: {
          description: "Lista de tareas completo.",
          content: {
            "application/json": {
              schema: Type.Object({
                tareas: Type.Array(TareaFullSchema),
                /*total: Type.Number(), // Total de tareas
                page: Type.Number(), // Página actual
                limit: Type.Number(), // Límite de tareas por página*/
              }),
            },
          },
        },
      },
    },
    //onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
    handler: async function (request, reply) {
      /*const { page = 1, limit = 10 } = request.query as {
        page: number;
        limit: number;
      };

      const result = await tareaService.findAllConPaginacion(page, limit);
      
      return result;*/
      return tareaService.findAll(); //esto borramos y retornamos result
    },
  });

  fastify.get("/", {
    schema: {
      summary: "Listado de tareas filtradas.",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - response. \n - Solo admin puede ver todas las tareas.",
      tags: ["tareas"],
      /*querystring: Type.Object({
        nombre: Type.Optional(Type.String()),
        duracion: Type.Optional(Type.String()),
      }),*/
      response: {
        200: {
          description: "Lista de tareas filtradas.",
          content: {
            "application/json": {
              schema: Type.Array(TareaFullSchema),
            },
          },
        },
      },
    },
    //onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
    handler: async function (request, reply) {
      /*const { nombre, duracion } = request.query as {
        nombre?: string;
        duracion?: string;
      };*/

      let tareas = await tareaService.findAll();

      /*if (nombre) {
        tareas = tareas.filter((tarea) => tarea.nombre.includes(nombre));
      }
      if (duracion) {
        tareas = tareas.filter((tarea) => String(tarea.duracion) === duracion);
      }*/

      return tareas;
    },
  });
};

export default tareasRoutes;
