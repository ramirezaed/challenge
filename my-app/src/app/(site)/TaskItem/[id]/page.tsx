
import { fetchTaskId } from "@/actions/actions";
import Link from "next/link";

export default async function TaskItem({ params }: { params: Promise<{ id: number }> }) {
   const { id } = await params;
  const task = await fetchTaskId(id);

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Tarea no encontrada
          </h2>
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {task.title || "Tarea sin nombre"}
          </h1>
        </div>


        <div className="p-6 space-y-6">
          {task.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Descripción
              </h3>
              <p className="mt-2 text-gray-700">
                {task.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Estado
              </h3>
              <p className={`mt-2 text-lg font-medium ${
                task.completed === 1 ? 'text-green-600' : 'text-amber-600'
              }`}>
                {task.completed === 1 ? (
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Completada
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                    Pendiente
                  </span>
                )}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Fecha de creación
              </h3>
              <p className="mt-2 text-gray-700">
                {new Date(task.createdAt).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
            <Link
              href={`/`}
              className="px-5 py-2.5 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-center font-medium"
            >
              Atras
            </Link>
             <Link
              href={`/TaskEdit/${task.id}`}
              className="px-5 py-2.5 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-center font-medium"
            >
              Editar Tarea
            </Link>

          </div>
        </div>
      </div>
    </div>
  );

}

