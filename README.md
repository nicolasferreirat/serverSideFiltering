# serverSideFiltering

Equipo 2 - SetPoint (Ejemplo Server side filtering)

Pasos a seguir:

# Filtering

- Creación de componentes:

  - ng g component pages/tasks/components/taskFilter
  - Agregar ruta en app.routes

- Implementación del componente

  - .ts (sin onFilter())
  - .html

- Implementación de ruta en el backend

  - querystring
  - handler

- Agregar metodo al tasksService

# Pagination

- Creacion de componentes:

  - ng g component pages/tasks/components/taskList
  - Agregar ruta en app.routes

- Implementación del componente

  - .ts
  - .html

- Implementación del método en tareaService

- Implementación de ruta en el backend

  - querystring
  - handler

- Agregar metodo al tasksService

async filterTasks(nombre?: string, duracion?: string) {
try {
const url = new URL(`${this.baseUrl}/tareas`);
if (nombre) url.searchParams.append('nombre', nombre); // http://localhost/back/tareas?nombre=...
if (duracion) url.searchParams.append('duracion', duracion); // http://localhost/back/tareas?duracion=...

      const response = await fetch(url.toString(), {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('No se pudo obtener las tareas filtradas');
      }

      const tasks = await response.json();
      return tasks;
    } catch (error) {
      console.error('Error al obtener las tareas filtradas:', error);
      throw error;
    }

}
