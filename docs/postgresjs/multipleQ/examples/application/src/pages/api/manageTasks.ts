import sql from "@/services/database";

export default async function handler(req: any, res: any) {
  const { method, query, body } = req;

  if (method === 'DELETE') {
    try {
      const { taskId } = query;
      if (!taskId) {
        return res.status(400).json({ error: 'Parametro taskId obrigatório' });
      }

      await sql`
        DELETE FROM public.tasks
        WHERE taskId = ${taskId}
      `;

      return res.status(204).end();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } else if (method === 'PUT') {
    try {
      const { taskId } = query;
      const { taskname, description, duedate, userid } = body;

      if (!taskId) {
        return res.status(400).json({ error: 'Parametro taskId obrigatório' });
      }

      await sql`
        UPDATE public.tasks
        SET taskName = ${taskname}, description = ${description}, dueDate = ${duedate}, userId = ${userid}
        WHERE taskId = ${taskId}
      `;

      return res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } else {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }
}