"use client";
import { ITask } from '@/types';
import Link from 'next/link';
import BIniciarFinalizar from '@/components/estados/IniciarFinalizarTarea';
import { finalizartask, resetTask } from '@/actions/actions';
import { useState } from 'react';
import DeleteTask from '@/components/DeleteTask';

interface TaskBoardProps {
  tasks: ITask[];
}

export default function TaskList({ tasks: initialTasks }: TaskBoardProps) {
  const [tasks, setTasks] = useState<ITask[]>(initialTasks);

  const handleToggle = async (id: number, nuevoEstado: boolean) => {
    try {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id ? { ...task, completed: nuevoEstado ? 1 : 0 } : task
        )
      );

      const updatedTask = nuevoEstado 
        ? await finalizartask(id) 
        : await resetTask(id);

      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      setTasks(initialTasks);
    }
  };

  const handleDelete = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const todoTasks = tasks.filter(task => task.completed === 0);
  const completedTasks = tasks.filter(task => task.completed === 1);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tablero de Tareas</h1>   
        <div className="flex justify-between mb-6">
          <Link 
            href="/TaskAdd" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            Añadir Tarea
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {/* Columna Pendientes */}
          <div className="flex-1 min-w-[300px] bg-gray-200 rounded-lg shadow">
            <div className="p-3 border-b border-gray-300 bg-gray-300 rounded-t-lg">
              <h2 className="font-bold text-gray-700">Pendientes ({todoTasks.length})</h2>
            </div>
            <div className="p-3 space-y-3">
              {todoTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggle={handleToggle} 
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>

          {/* Columna Completadas */}
          <div className="flex-1 min-w-[300px] bg-gray-200 rounded-lg shadow">
            <div className="p-3 border-b border-gray-300 bg-gray-300 rounded-t-lg">
              <h2 className="font-bold text-gray-700">Completadas ({completedTasks.length})</h2>
            </div>
            <div className="p-3 space-y-3">
              {completedTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggle={handleToggle} 
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ 
  task, 
  onToggle, 
  onDelete 
}: { 
  task: ITask; 
  onToggle: (id: number, nuevoEstado: boolean) => Promise<void>; 
  onDelete: (id: number) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-gray-800">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${
          task.completed 
            ? 'bg-green-100 text-green-800'  
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {task.completed ? 'Completada' : 'Pendiente'}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Creada: {new Date(task.createdAt).toLocaleDateString()}</span>
        <div className="space-x-2">
          <Link 
            href={`/TaskItem/${task.id}`} 
            className="text-blue-500 hover:text-blue-700"
          >
            Ver mas
          </Link>
          <Link 
            href={`/TaskEdit/${task.id}`} 
            className="text-blue-500 hover:text-blue-700"
          >
            Editar
          </Link>
          <BIniciarFinalizar 
            id={task.id} 
            completed={task.completed} 
            onToggle={onToggle} 
          />
          <DeleteTask id={task.id} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
}
