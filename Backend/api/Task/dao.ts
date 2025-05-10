import connectDB from "../../db/dbConnect";
import { Itask } from "../../types";

class TaskDao {
    private db;
    constructor() {
        this.db = connectDB();
    }

    async crearTarea(task: Itask): Promise<Itask> {
        const insertQuery = `INSERT INTO TableTask (title, description) VALUES (?, ?)`;
        const selectQuery = `SELECT * FROM TableTask WHERE id = ?`;
        try {
        return new Promise((resolve, reject) => {
            this.db.run(insertQuery, [task.title, task.description], function (err) {
                if (err) {
                    return reject(new Error(err.message));
                }   
                const lastId = this.lastID;
                taskDao.db.get(selectQuery, [lastId], (err, nuevaTarea: Itask) => {
                    if (err) {
                        return reject(new Error(err.message));
                    }
                 resolve(nuevaTarea);
                });
            });
        });
    }catch (error) {
            throw new Error((error as Error).message);
        }
    }
    

    async buscarTareaPorId(id: number) {
    const query = `SELECT * FROM TableTask WHERE id = ?`;
    try {
        return new Promise((resolve, reject) => {
            this.db.get(query, [id], (err, row) => {
                if (err) {
                    return reject(new Error(err.message));
                }
                resolve(row ? { id: id, ...row } : null);
            });
        });
        } catch (error) {
            throw new Error((error as Error).message);
        }     
    }

    async mostrarTareasPendientes() {
        const query = `SELECT * FROM TableTask WHERE completed = 0`;
    try {
        return new Promise((resolve, reject) => {
            this.db.all(query, (err, tareas) => {
                if (err) {
                    return reject(new Error(err.message));
                }
                if (tareas.length === 0) {
                    return resolve({ message: "No hay tareas pendientes" });
                }
                resolve(tareas);
            }
        )});
        }catch (error) {   
        throw new Error((error as Error).message);
    }
    }

    async mostrarTareasCompletadas() {
        const query = `SELECT * FROM TableTask WHERE completed = 1`;
        try {
            return new Promise((resolve, reject) => {
                this.db.all(query, (err, tareas) => {
                    if (err) {
                        return reject(new Error(err.message));
                    }
                    if (tareas.length === 0) {
                        return resolve({ message: "No hay tareas Completadas" });
                    }    
                    resolve(tareas);
                });
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async mostrarTareas() {
        const query = `SELECT * FROM TableTask`;
        try {
            return new Promise((resolve, reject) => {
                this.db.all(query, [], (err, tareas) => {
                    if (err) {
                        return reject(new Error(err.message));
                    }
                    resolve(tareas);
                });
            });        
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async eliminarTarea(id: number) {
        const deleteQuery = `DELETE FROM TableTask WHERE id = ?`;
        return new Promise((resolve, reject) => {
            this.db.run(deleteQuery, [id], function (err) {
                if (err) {
                    return reject(new Error(err.message));
                }
                if (this.changes === 0) {
                    return resolve({ message: "No se encontro la tarea para eliminar." });
                }
                resolve({ message: "Tarea eliminada correctamente." });
            });
        });
    }

    async modificarTarea(id: number, task: Itask) {
        const actualizarQuery = `
            UPDATE TableTask SET 
                title = COALESCE(?, title),
                description = COALESCE(?, description),
                completed = COALESCE(?, completed) 
            WHERE id = ?`;   
        const selectQuery = `SELECT * FROM TableTask WHERE id = ?`;   
        const db = this.db;
    try {
        return new Promise((resolve, reject) => {
            db.run(actualizarQuery, [task.title, task.description, task.completed, id], function (err) {
                if (err) {
                    return reject(new Error(err.message));
                }
                if (this.changes === 0) {
                    return resolve({ message: "No se encontro la tarea para modificar" });
                }
                db.get(selectQuery, [id], (err, row) => {
                    if (err) {
                        return reject(new Error(err.message));
                    }
                    resolve(row);
                });
            });
        });
    } catch (error) {
        throw new Error((error as Error).message);
    }}    


    async finalizarTarea(id: number) {
        const query = `UPDATE TableTask SET completed = 1 WHERE id = ?`;
       try{
        return new Promise((resolve, reject) => {
            this.db.run(query, [id], function (err) {
                if (err) {
                    return reject(new Error(err.message));
                }
                if (this.changes === 0) {
                    return resolve({ message: "No se encontro la tarea para finalizar" });
                }
                resolve({ message: "Tarea finalizada correctamente" });
            });
        });
        }catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async resetearTarea(id:number) {
        const query = `UPDATE TableTask SET completed = 0 WHERE id = ?`;
        try {
            return new Promise((resolve, reject) => {
                this.db.run(query, [id], function (err) {
                    if (err) {
                        return reject(new Error(err.message));
                    }
                    if (this.changes === 0) {
                        return resolve({ message: "No se encontro la tarea para resetear" });
                    }
                    resolve({ message: "Tarea reseteada correctamente" });
                });
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }   
    }



    }

export const taskDao = new TaskDao();