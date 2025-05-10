
import TaskList from "@/components/homePage";
import { fetchTask} from "@/actions/actions";
import { ITask } from "@/types";
export default async function Home() {
  const tasks: ITask[] = await fetchTask();
    return (
    <main>
      <TaskList tasks={tasks}/>
    </main>
  );
}
