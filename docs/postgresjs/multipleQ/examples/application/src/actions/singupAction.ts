"use server";

import sql from "@/services/database";
import { revalidatePath } from "next/cache";

const singupAction = async (FormData: FormData, path: string) => {
    const userName: FormDataEntryValue | null = FormData.get('username');
    const email: FormDataEntryValue | null = FormData.get('email');
    const password: FormDataEntryValue | null = FormData.get('password');

    try {
        const existingUser = await sql`
            SELECT * FROM public.users
            WHERE email = ${String(email)}
        `;

        if (existingUser.length > 0) {
            return { error: 'Email already in use' };
        }

        const newUser: any = await sql`
            INSERT INTO public.users (userName, email, password)
            VALUES (${String(userName)}, ${String(email)}, ${String(password)})
            RETURNING *
        `;

        revalidatePath(path);

        return { user: newUser[0] };
    } catch (error) {
        console.error('Error creating user:', error);
        return { error: 'Failed to create user' };
    }
};

export default singupAction;