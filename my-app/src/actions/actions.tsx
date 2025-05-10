import { ITask, ITaskForm } from "@/types";


    //crear una nueva tarea
    export async function crearTask(tarea : ITaskForm) {
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_HOST}/api/task/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...tarea
            })
        })
        if (!response.ok) {
            throw new Error('error creando la tarea');
        }
        return response.json();
        } catch (error) {
            console.error('Error creando la tarea:', error);
            return null;
        }
    }

    //muestra todas las tareas
    export async function fetchTask(){
        try {
            const reponse = await fetch (`${process.env.API_HOST}/api/task/`)
            if (!reponse.ok) {
                throw new Error('error fetching');
            }
            return reponse.json();
        } catch (error) {
            console.error('Error fetching:', error);
            return null;
        }
    }
    //muestraa las tareas pendientes
    export async function fetchTaskPendientes() {
        try {
            const response =await fetch(`${process.env.API_HOST}/api/task/tareasPendientes/`);
            if (!response.ok) {
                throw new Error('error fetching task pendientes');
            }   
            return response.json();
        } catch (error) {
            console.error('error fetching:', error);
            return null;
        }  
    }

        //muestra las tareas completadas
    export async function fetchTaskCompletadas() {
        try {
        const response = await fetch(`${process.env.API_HOST}/api/task/tareasCompletadas/`); 
        if (!response.ok) {
                throw new Error('error fetching task completadas');
            }
            return response.json();  
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;        
        }
    }
    //muestra una tarea por id
    export async function fetchTaskId(id: number) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/task/buscarPorId/${id}`);
            if (!response.ok) {
                throw new Error('error fetching task por id');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }
    //eliminar una tarea
    export async function elimiarTask(id: number) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/task/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('error elimina task');
            }
            return response.json();
        } catch (error) {
            console.error('Error deleting data:', error);
            return null;
        }
    }

    export async function finalizartask(id: number) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/task/finalizarTarea/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('error finalizando la tarea');
                
            }
            return response.json();
        } catch (error) {
            console.error('Error finalizando la tarea:', error);
            return null;
        }
    }

    export async function resetTask(id: number) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/task/resetearTarea/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
                })
                console.log('URL completa:', response); // ← Esto debe mostrarte la URL exacta

            if (!response.ok) {
                throw new Error('error reseteando la tarea');
            }
            return response.json();
        } catch (error) {
            console.error('Error reseteando la tarea:', error);
            return null;
        }
    }