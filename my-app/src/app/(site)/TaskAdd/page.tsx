
'use client';

import { useState } from 'react';
import{ TaskForm } from "@/components/AddTasks";

export default function AddtaskPage(){
    const [resultado, setResultado] = useState<any>(null);

    return(
        <TaskForm onSuccess={setResultado} />
    )
}


