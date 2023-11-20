"use client"

import loginAction from "@/actions/loginAction";
import { useEffect, useRef, useState, FC } from "react";

interface LoginFormProps {
    path: string
}

const LoginForm: FC<LoginFormProps> = (props: LoginFormProps) => {

    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const ref = useRef<HTMLFormElement>(null)
 
    useEffect(() => {
        if (alertMessage) {
            alert(alertMessage);
            setAlertMessage(null);
        }
    }, [alertMessage]);

    return(
        <form ref={ref} action={async FormData => {
            try {
                localStorage.removeItem('userId');
                const user = await loginAction(FormData, props.path);
                localStorage.setItem('userId', user.user.userid.toString());
                ref.current?.reset();
                setAlertMessage("Login bem-sucedido!");
            } catch (error) {
                setAlertMessage("Erro ao fazer login. Verifique seu email e senha.");
            }
        }}>
            <input type="email" name="email" placeholder="usuario@gmail.com" required/>
            <input type="password" name="password" placeholder="senha" required/>
            <button type="submit">logar</button>
        </form>
    )
}

export default LoginForm;