"use server"

import sql from "@/services/database"
import { revalidatePath } from "next/cache"

interface TaskInfo {
    taskName: string;
    description: string;
    dueDate: string;
}

type CreateTaskParams = {
    userId: number;
    taskInfo: TaskInfo;
}

const createTaskAction = async ({ userId, taskInfo }: CreateTaskParams, path: string) => {
    try {
        const existingUser = await sql`
            SELECT * FROM public.users
            WHERE userID = ${userId}
        `;

        if (existingUser.length === 0) {
            return { error: 'User does not exist' };
        }

        const newTask = await sql`
            INSERT INTO public.tasks (taskName, description, dueDate, userID)
            VALUES (${taskInfo.taskName}, ${taskInfo.description}, ${taskInfo.dueDate}, ${userId})
            RETURNING *
        `;

        revalidatePath(path);

        return { taskId: newTask[0].taskID, error: null };
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error)
        return { error: 'Erro ao autenticar usuário' }
    }
};

export default createTaskAction
