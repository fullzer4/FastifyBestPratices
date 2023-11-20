"use client"

import { FC, useEffect, useState } from "react";

interface Task {
  taskid: number;
  taskname: string;
  description: string;
  duedate: string;
  userid: number;
}

const ListTasks: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const userId = localStorage.getItem("userId");

  const fetchTasks = async () => {
    try {
      const response = await fetch(`/api/getTasks?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Erro ao obter tarefas");
      }

      const tasksData = await response.json();
      setTasks(tasksData);
    } catch (error) {
      console.error("Erro ao obter tarefas:", error);
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      const response = await fetch(`/api/manageTasks?taskId=${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir tarefa");
      }

      fetchTasks();
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const handleEdit = (taskId: number) => {
    setEditingTask(taskId);
  };

  const handleSave = async (taskId: number, updatedTask: Task) => {
    try {
      const { taskname, description, duedate, userid } = updatedTask;
  
      const response = await fetch(`/api/manageTasks?taskId=${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskname, description, duedate, userid }), 
      });
  
      if (!response.ok) {
        throw new Error("Erro ao editar tarefa");
      }
  
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    const intervalId = setInterval(fetchTasks, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.taskid}>
            {editingTask === task.taskid ? (
              <>
                <input
                  type="text"
                  value={task.taskname}
                  onChange={(e) =>
                    setTasks((prevTasks) =>
                      prevTasks.map((prevTask) =>
                        prevTask.taskid === task.taskid
                          ? { ...prevTask, taskname: e.target.value }
                          : prevTask
                      )
                    )
                  }
                />
                <input
                  type="text"
                  value={task.description}
                  onChange={(e) =>
                    setTasks((prevTasks) =>
                      prevTasks.map((prevTask) =>
                        prevTask.taskid === task.taskid
                          ? { ...prevTask, description: e.target.value }
                          : prevTask
                      )
                    )
                  }
                />
                <input
                  type="text"
                  value={task.duedate}
                  onChange={(e) =>
                    setTasks((prevTasks) =>
                      prevTasks.map((prevTask) =>
                        prevTask.taskid === task.taskid
                          ? { ...prevTask, duedate: e.target.value }
                          : prevTask
                      )
                    )
                  }
                />
                <button onClick={() => handleSave(task.taskid, task)}>
                  Salvar
                </button>
              </>
            ) : (
              <>
                <strong>{task.taskname}</strong>
                <p>{task.description}</p>
                <p>Data de Vencimento: {task.duedate}</p>
                <p>Usuário ID: {task.userid}</p>
                <button onClick={() => handleEdit(task.taskid)}>Editar</button>
                <button onClick={() => handleDelete(task.taskid)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTasks;