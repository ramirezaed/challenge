
"use client";
import { useState } from "react";

interface botonProps {
  id: number;
  completed: number;
  onToggle: (id: number, nuevoEstado: boolean) => Promise<void>;
}

export default function BIniciarFinalizar({ id, completed, onToggle }: botonProps) {
  const [cargando, setCargando] = useState(false);

  const handleClick = async () => {
    setCargando(true);
    try {
      await onToggle(id, completed === 0);
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
    } finally {
      setCargando(false);
    }
  };

  return (

    <button
  onClick={handleClick}
  disabled={cargando}
  className={`cursor-pointer ${
    cargando ? "cursor-not-allowed" : ""
  } text-green-500 hover:text-green-700`}
>
  {cargando ? "Procesando..." : completed === 1 ? "Reiniciar Tarea" : "Finalizar Tarea"}
</button>

  );
}