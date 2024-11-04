CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    contraseña TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO public.usuarios (username,email,contraseña,is_admin) VALUES('admin', 'admin@parcial.com', crypt('@Admin1', gen_salt('bf')), true);
INSERT INTO public.usuarios (username,email,contraseña) VALUES('pepe', 'pepe@parcial.com', crypt('@Pepe1', gen_salt('bf')));
INSERT INTO public.usuarios (username,email,contraseña) VALUES('carla', 'carla@parcial.com', crypt('@Carla1', gen_salt('bf')));
INSERT INTO public.usuarios (username,email,contraseña) VALUES('flor', 'flor@parcial.com', crypt('@Flor1', gen_salt('bf')));

CREATE TABLE tareas (
    id_tarea SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE,
    duracion INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario)
);

CREATE TABLE comentarios (
    id_comentario SERIAL PRIMARY KEY,
    id_tarea INTEGER NOT NULL REFERENCES tareas(id_tarea),
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario),
    fecha_ingresado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    titulo VARCHAR(30) NOT NULL CHECK (LENGTH(titulo) >= 10),
    descripcion TEXT NOT NULL
);

CREATE TABLE usuario_tareas (
    id_tarea INTEGER NOT NULL REFERENCES tareas(id_tarea),
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario),
    PRIMARY KEY (id_usuario, id_tarea)
);

INSERT INTO public.tareas (nombre, duracion, id_usuario) VALUES 
    ('Tarea 1', 5,2),
    ('Tarea 2', 3,4),
    ('Tarea 3', 6,1),
    ('Tarea 4', 2,3),
    ('Tarea 5', 4,1),
    ('Tarea 6', 7, 2),
    ('Tarea 7', 4, 3),
    ('Tarea 8', 5, 1),
    ('Tarea 9', 6, 4),
    ('Tarea 10', 3, 2),
    ('TareaExtra1', 9, 3),
    ('TareaExtra2', 2, 1),
    ('TareaExtra3', 8, 4),
    ('TareaExtra4', 7, 2),
    ('TareaExtra5', 4, 3),
    ('TareaRapida1', 3, 1),
    ('TareaRapida2', 5, 4),
    ('TareaRapida3', 6, 2),
    ('TareaRapida4', 7, 3),
    ('TareaRapida5', 8, 1),
    ('TareaNueva1', 2, 4),
    ('TareaNueva2', 9, 2),
    ('TareaNueva3', 4, 3),
    ('TareaNueva4', 6, 1),
    ('TareaNueva5', 5, 4),
    ('TareaNico1', 8,2),
    ('TareaNico2', 6,4),
    ('TareaNico3', 9,1),
    ('TareaNico4', 8,3),
    ('TareaNico5', 3,1);

INSERT INTO public.usuario_tareas (id_tarea, id_usuario ) VALUES 
    (1, 2),
    (2, 2),
    (2, 3),
    (4, 4),
    (5, 4),
    (5, 2);

INSERT INTO public.comentarios (id_tarea, id_usuario,titulo, descripcion) VALUES 
    (1, 2,'El titulo 1', 'Comentario de usuario 2 en tarea 1'),
    (2, 2,'El titulo 2', 'Comentario de usuario 2 en tarea 2'),
    (2, 3,'El titulo 3', 'Comentario de usuario 3 en tarea 2'),
    (4, 4,'El titulo 4', 'Comentario de usuario 4 en tarea 4');