"use client"

import createTaskAction from "@/actions/createTask";
import singupAction from "@/actions/singupAction";
import { FC, useEffect, useRef, useState } from "react";

interface SignupFormProps {
    path: string
}

const SignupForm: FC<SignupFormProps> = (props: SignupFormProps) => {

    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const ref = useRef<HTMLFormElement>(null)
 
    useEffect(() => {
        if (alertMessage) {
            alert(alertMessage);
            setAlertMessage(null);
        }
    }, [alertMessage]);

    return (
        <form ref={ref} action={async FormData => {
            try {
                const user: any = await singupAction(FormData, props.path);
                const userId = user.user.userid
                await createTaskAction({ userId, taskInfo: { taskName: "Tarefa teste", description: "Tarefa teste", dueDate: "2023-12-31" } }, props.path);
                ref.current?.reset();
                setAlertMessage("Usuário criado com sucesso!");
            } catch (error) {
                setAlertMessage("Erro ao criar usuário. Usuário já existe.");
            }
        }}>
            <input type="text" name="username" placeholder="usuario" required />
            <input type="email" name="email" placeholder="usuario@gmail.com" required />
            <input type="password" name="password" placeholder="senha" required />
            <button type="submit">criar</button>
        </form>
    )
}

export default SignupForm;