"use client";

import { useState } from "react";
import { elimiarTask } from "@/actions/actions";
import { redirect, useRouter } from "next/navigation";

interface DeleteTaskProps {
  id: number;
  onDelete: (id: number) => void;
}

export default function DeleteTask({ id, onDelete }: DeleteTaskProps) {


  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      setIsLoading(true);
      try {
        await elimiarTask(id);
        onDelete(id); 
      } catch (error) {
        console.error("Error al eliminar:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
   className={`text-red-400 hover:text-red-700 ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      {isLoading ? "Eliminando..." : "Eliminar"}
    </button>
  );
}
