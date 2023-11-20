"use server"

import sql from "@/services/database";
import { revalidatePath } from "next/cache";

const loginAction = async (FormData: FormData, path: string) => {
  const email: FormDataEntryValue | null = FormData.get('email');
  const password: FormDataEntryValue | null = FormData.get('password');

  try {
    const user = await sql`
      SELECT * FROM public.users
      WHERE email = ${String(email)}
    `;

    if (user.length === 0) {
      return { error: 'Usuário não encontrado' };
    }

    if (user[0].password !== password) {
      return { error: 'Senha incorreta' };
    }

    revalidatePath(path);
    return { user: user[0] };
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return { error: 'Erro ao autenticar usuário' };
  }
};

export default loginAction;
