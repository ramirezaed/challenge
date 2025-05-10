
"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { fetchTaskId } from "@/actions/actions"
import { ITaskFormUpdate } from "@/types"

export default function TaskEdit() {
  const params = useParams()
  const id = params.id;
  const router = useRouter()
  const [task, setTask] = useState<ITaskFormUpdate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cargarDatos = async () => {
      if (!id) {
        setError("ID no válido");
        setLoading(false);
        return;
      }

      const idParam = Array.isArray(id) ? id[0] : id;
      const numericId = parseInt(idParam, 10);

      if (isNaN(numericId)) {
        setError("ID no es un número válido");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const datosTask = await fetchTaskId(numericId);
        setTask(datosTask);
      } catch (err) {
        setError("Error al cargar la tarea");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || ""
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!task) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
        }),
      });

      if (response.ok) {
        alert("tarea editada con exito")
        router.push("/");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al editar la tarea");
      }
    } catch (error) {
      console.error("Error al editar tarea", error);
      setError("Error al editar la tarea");
    }
  };

  if (loading) return <div className="p-6 text-center">Cargando tarea...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!task) return <div className="p-6">No se encontró la tarea</div>;

return (
  <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
    <div className="max-w-2xl w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-100 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Editar Tarea</h1>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="title" className="block text-sm font-bold text-gray-700">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="description" className="block text-sm font-bold text-gray-700">Descripción</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 hover:cursor-pointer transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:cursor-pointer transition-colors font-medium"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
}