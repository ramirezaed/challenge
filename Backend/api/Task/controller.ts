// import { Request, Response } from "express";
// import {taskService} from "./service";


// const {crearTarea, buscarTareaPorId} = taskService;
// class TaskController {
//     async crearTarea(req: Request, res: Response){
//         try {
//             const tareas = req.body;
//             if (!tareas) {
//                 return res.status(400).json({ error: "El objeto faltan no puede ser nulo o indefinido." });
//             }
//             const nuevaTarea = await crearTarea(tareas);
//             res.status(201).json(nuevaTarea);
//         } catch (error) {
//             res.status(500).json({ error: (error as Error).message });
//         }
//     }
//     async buscarTareaPorId(req: Request, res: Response) {
//         try {
//             const id = parseInt(req.params.id);
//             const tareabuscada = await buscarTareaPorId(id)
//             return res.status(200).json(tareabuscada);
//         } catch (error) {
//             return res.status(500).json({ error: (error as Error).message });
//         }
// }


// }

// export default new TaskController();



import { Request, Response } from "express";
import { taskService } from "./service";

class TaskController {
    async crearTarea(req: Request, res: Response) {
        try {
            const tareas = req.body;
            if (!tareas) {
                return res.status(400).json({ error: "El objeto faltan no puede ser nulo o indefinido." });
            }
            const nuevaTarea = await taskService.crearTarea(tareas);
            res.status(201).json(nuevaTarea);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async buscarTareaPorId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const tareabuscada = await taskService.buscarTareaPorId(id);
            return res.status(200).json(tareabuscada);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }

    async mostrarTareas(req: Request, res: Response) {
        try {
            const tareas = await taskService.mostrarTareas();
            return res.status(200).json(tareas);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }

    async mostrarTareasPendientes(req: Request, res: Response) {
        try {
            const tareasPendientes = await taskService.mostrarTareasPendientes();
            return res.status(200).json(tareasPendientes);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }

    async mostrarTareasCompletadas(req: Request, res: Response) {
        try {
            const tareasCompletadas = await taskService.mostrarTareasCompletadas();
            return res.status(200).json(tareasCompletadas);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }

    async eliminarTarea(req:Request, res:Response){
        try {
            const id = parseInt(req.params.id);
            const tareaEliminada = await taskService.eliminarTarea(id);
            return res.status(200).json(tareaEliminada);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
            
        }
    }

    async modificarTarea(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const task = req.body;
            if (!task) {
                return res.status(400).json({ error: "El objeto no puede ser nulo o indefinido." });
            }
            const tareaModificada = await taskService.modificarTarea(id, task);
            return res.status(200).json(tareaModificada);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }

    async finalizarTarea(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const tareaFinalizada = await taskService.finalizarTarea(id);
            return res.status(200).json(tareaFinalizada);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }

    async resetearTarea(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const tareaFinalizada = await taskService.resetearTarea(id);
            return res.status(200).json(tareaFinalizada);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default new TaskController();