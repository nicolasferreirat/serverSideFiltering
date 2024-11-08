import { TareaFullType, TareaType } from "../types/tarea.js";
import { NotFoundError } from "../util/errors.js";
import db from "./db.js";

const baseQuery = `
  with tareas AS(
    SELECT T.*,U.username as creador, array_agg(UA.username)  as usuarios
    FROM public.tareas T
    JOIN public.usuarios U ON U.id_usuario=T.id_usuario 
    LEFT JOIN public.usuario_tareas ut on UT.id_tarea = T.id_tarea
    LEFT JOIN public.usuarios UA on UA.id_usuario = UT.id_usuario
    group by T.id_tarea, U.username
  )
  SELECT * FROM tareas T
`;

//Page es el número de pagina actual que se esta paginando, y limir la cantidad de tareas por pagina.
export const findAllConPaginacion = async (page = 1, limit = 5) => {
  //offset es el encargado de fijarse desde que tarea comienza a hacer la paginacion.
  const offset = (page - 1) * limit; //offset es el encargado de fijarse a partír de que número de tarea tiene que

  // Consulta igual a la de basequery pero le agregamos  LIMIT y OFFSET
  const paginatedQuery = `
    WITH tareas AS (
      SELECT T.*, U.username AS creador, array_agg(UA.username) AS usuarios
      FROM public.tareas T
      JOIN public.usuarios U ON U.id_usuario = T.id_usuario 
      LEFT JOIN public.usuario_tareas ut ON UT.id_tarea = T.id_tarea
      LEFT JOIN public.usuarios UA ON UA.id_usuario = UT.id_usuario
      GROUP BY T.id_tarea, U.username
    )
    SELECT * FROM tareas T
    ORDER BY T.id_tarea
    LIMIT $1 OFFSET $2
  `;
  const params = [limit, offset];

  const response = await db.query(paginatedQuery, params);
  //guardamos la respuesta de la query en 'response'

  // Obtenemos el número total de tareas para hacer la paginación
  const totalQuery = `
    SELECT COUNT(*) FROM (
      SELECT T.*
      FROM public.tareas T
      JOIN public.usuarios U ON U.id_usuario = T.id_usuario 
      LEFT JOIN public.usuario_tareas ut ON UT.id_tarea = T.id_tarea
      LEFT JOIN public.usuarios UA ON UA.id_usuario = UT.id_usuario
      GROUP BY T.id_tarea, U.username
    ) AS total_count
  `;

  const totalRes = await db.query(totalQuery);
  const total = parseInt(totalRes.rows[0].count, 10); //convertimos a numero entero el total de tareas

  //retornamos un objeto con: tareas(las tareas seleccionadas en la paginacion), total(total de tareas contadas), page(pagina actual de la paginacion), limit(limite de tareas por pagina).
  return {
    tareas: response.rows,
    total,
    page,
    limit,
  };
};

export const findAll = async () => {
  const res = await db.query(baseQuery);
  return res.rows;
};

export const findCreadasByUserId = async (id_usuario: number) => {
  const res = await db.query(
    `
    ${baseQuery}
    WHERE T.id_usuario=$1
    `,
    [id_usuario]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
  return res.rows;
};

export const findAsignadasByIdUsuario = async (id_usuario: number) => {
  const consulta = `
    ${baseQuery}
    JOIN public.usuario_tareas UT ON UT.id_tarea = T.id_tarea AND UT.id_usuario = $1
    WHERE UT.id_usuario=$1
    `;

  console.log(consulta);
  const res = await db.query(consulta, [id_usuario]);

  return res.rows;
};

export const findById = async (id_tarea: number): Promise<TareaFullType> => {
  const res = await db.query(
    `
    ${baseQuery}
    WHERE id_tarea=$1
    `,
    [id_tarea]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
  return res.rows[0];
};

export const findByIdAndCreator = async (
  id_tarea: number,
  id_usuario: number
): Promise<TareaFullType> => {
  const res = await db.query(
    `
    ${baseQuery}
    WHERE T.id_tarea=$1 AND T.id_usuario = $2
    `,
    [id_tarea, id_usuario]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
  return res.rows[0];
};

export const deleteByIds = async (id_usuario: number, id_tarea: number) => {
  const res = await db.query(
    "DELETE FROM public.tareas WHERE id_usuario=$1 AND id_tarea=$2",
    [id_usuario, id_tarea]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
};

export const unassign = async (id_usuario: number, id_tarea: number) => {
  const res = await db.query(
    "DELETE FROM public.usuario_tareas WHERE id_usuario=$1 AND id_tarea=$2",
    [id_usuario, id_tarea]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
};

export const assign = async (id_usuario: number, id_tarea: number) => {
  const res = await db.query(
    "INSERT INTO public.usuario_tareas(id_usuario,id_tarea) VALUES($1,$2)",
    [id_usuario, id_tarea]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
};

export const updateById = async (id_tarea: number, tarea: TareaType) => {
  const res = await db.query(
    `
    UPDATE public.tareas  
    SET nombre=$2, duracion=$3 
    WHERE id_tarea=$1;
    `,
    [id_tarea, tarea.nombre, tarea.duracion]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
  return findById(id_tarea);
};

export const create = async (id_usuario: number, nuevaTarea: TareaType) => {
  const res = await db.query(
    `
    INSERT INTO public.tareas (nombre,duracion,id_usuario) 
    VALUES($1, $2, $3) RETURNING *;
    `,
    [nuevaTarea.nombre, nuevaTarea.duracion, id_usuario]
  );
  const tarea_creada: TareaFullType = res.rows[0];
  return findById(tarea_creada.id_tarea);
};
