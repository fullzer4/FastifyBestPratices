import sql from "@/services/database";

interface Task {
  taskId: number;
  taskName: string;
  description: string;
  dueDate: string;
  userId: number;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId nao foi passado' });
    }

    const tasks: Task[] = await sql`
      SELECT * FROM public.tasks
      WHERE userId = ${userId}
    `;

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
