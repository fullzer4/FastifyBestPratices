/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

const App = () => {
  const [registeredUsers, setRegisteredUsers] = useState<any>([]);

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    console.log('Register data:', registerData);

    // Simulate registering the user locally
    const newUser = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
    };

    setRegisteredUsers([...registeredUsers, newUser]);
    console.log('User registered locally:', newUser);
    alert("registrado com sucesso")
  };

  const handleLogin = async () => {
    const user = registeredUsers.find(
      (u: any) => u.email === loginData.email && u.password === loginData.password
    );

    if (user) {
      console.log('Login successful:', user);
      alert("Logado com sucesso")
    } else {
      console.error('Invalid credentials. Login failed.');
      alert("Usario nao existe")
    }
  };

  return (
    <>
      <div>
        <p>Cadastro</p>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        />
        <button onClick={handleRegister}>Cadastrar</button>
      </div>
      <div>
        <p>Login</p>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <button onClick={handleLogin}>Entrar</button>
      </div>
    </>
  );
};

export default App;
