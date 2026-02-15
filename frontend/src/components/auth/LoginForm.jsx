import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={submitHandler} className="max-w-sm mx-auto mt-10 card">
      <h2 className="text-xl mb-4">Login</h2>
      <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="btn-primary w-full" disabled={loading}>Login</button>
      <p className="mt-2 text-sm">No account? <Link className="text-blue-600" to="/register">Register</Link></p>
    </form>
  );
};

export default LoginForm;
