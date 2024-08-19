'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await signIn("credentials", {
        redirect:false,
      username,
      password,
    },
);

    if (result?.error) {
      setError(result.error);
    }else{
        router.push("/dashboard")
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de usuario</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
