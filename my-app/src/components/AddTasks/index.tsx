
'use client';
import { useState } from 'react';
import { crearTask } from "@/actions/actions";
import { useRouter } from 'next/navigation';

export const TaskForm = ({ onSuccess }: { onSuccess: (data: any) => void }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const resultado = await crearTask(taskData);
      onSuccess({ ...resultado, ...taskData });
      alert('Tarea creada con éxito');
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

return (
  <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
    <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-100 px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Agregar Tarea</h2>
      </div>
      
      <div className="p-6">
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="title" className="block text-sm font-bold text-gray-700">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              placeholder="Ingrese el título de la tarea"
              required
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="description" className="block text-sm font-bold text-gray-700">Descripción</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={taskData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              placeholder="Ingrese la descripción de la tarea"
              required
            ></textarea>
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover: cursor-pointer hover:bg-blue-700 transition-colors font-medium"
            >
              {loading ? 'Creando tarea...' : 'Agregar Tarea'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover: cursor-pointer hover:bg-gray-400 transition-colors font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}
