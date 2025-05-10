

import { taskDao } from "./dao";
import { Itask } from "../../types";


class TaskService {
    async crearTarea(task: Itask) {
        try {
            if (!task.title || !task.description ) {
                throw new Error("El objeto faltan no puede ser nulo o indefinido.");
            }
            const nuevaTarea = await taskDao.crearTarea(task);
            return nuevaTarea;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async buscarTareaPorId(id: number) {
        try {
            if (!id) {
                throw new Error("El id no puede ser nulo o indefinido.");
            }
            const tareaBuscada = await taskDao.buscarTareaPorId(id);
            if (!tareaBuscada) {
                throw new Error("No se encontró la tarea con ese ID.");
            }
            return tareaBuscada;
    
        } catch (error) {
            throw new Error((error as Error).message);
        }
      
    }

    async mostrarTareas() {
     try {
        const tareas = await taskDao.mostrarTareas();
        if (!tareas) {
            throw new Error("No se encontraron tareas.");
        }
        return tareas;
     } catch (error) {
        throw new Error((error as Error).message);    
     }
    }

    async mostrarTareasPendientes() {
     
        try {
            const tareasPendientes = await taskDao.mostrarTareasPendientes();
            if (!tareasPendientes) {
                throw new Error("No se encontraron tareas pendientes.");
            }
            return tareasPendientes;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async mostrarTareasCompletadas() {
        try {   
            const tareasCompletadas = await taskDao.mostrarTareasCompletadas();
            if (!tareasCompletadas) {
               throw new Error("No se encontraron tareas completadas.");
            }
        return tareasCompletadas;
         }catch (error) { 
            throw new Error((error as Error).message);
        }
    }

    async eliminarTarea(id: number) {     
    try {
      if (!id) {
            throw new Error("El id no puede ser nulo o indefinido.");        
       }
    const tareaEliminada = await taskDao.eliminarTarea(id);
        if (!tareaEliminada) {
          throw new Error("No se encontró la tarea para eliminar.");
        }
    return tareaEliminada;
    } catch (error) {
        throw new Error((error as Error).message);
            }
    }

    async modificarTarea(id: number, task: Itask) {
        try {
            if (!id || !task) {
                throw new Error("El id o el objeto no pueden ser nulos o indefinidos.");
            }
            const tareaModificada = await taskDao.modificarTarea(id, task);
            return tareaModificada;
        } catch (error) {
            throw new Error((error as Error).message);
        }   
    }

    async finalizarTarea(id: number) {
        try {
            if (!id) {
                throw new Error("El id no puede ser nulo o indefinido.");
            }
            const tareaFinalizada = await taskDao.finalizarTarea(id);
            
            return tareaFinalizada;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

 async resetearTarea(id: number) {
        try {
            if (!id) {
                throw new Error("El id no puede ser nulo o indefinido.");
            }
            const tareaReseteada = await taskDao.resetearTarea(id);
            return tareaReseteada;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}



export const taskService = new TaskService();