
import express, { Request, Response } from "express";
import TaskController from "./controller";


const TaskRouter = express.Router();
//endpoint para funcionalidades basicas CRUD
TaskRouter.post("/", TaskController.crearTarea);
TaskRouter.get("/", TaskController.mostrarTareas);
TaskRouter.put("/:id", TaskController.modificarTarea);
TaskRouter.delete("/:id", TaskController.eliminarTarea);

//endpoint para funcionalidades opcionales "BONUS"
TaskRouter.get("/buscarPorId/:id",TaskController.buscarTareaPorId);
TaskRouter.get("/tareasPendientes", TaskController.mostrarTareasPendientes);
TaskRouter.get("/tareasCompletadas", TaskController.mostrarTareasCompletadas);
TaskRouter.put("/finalizarTarea/:id", TaskController.finalizarTarea);
TaskRouter.put("/resetearTarea/:id", TaskController.resetearTarea);


export default TaskRouter;
