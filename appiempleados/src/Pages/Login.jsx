import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import useForm from '../Hooks/useForm';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await login(values.username, values.password);
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
      setError('Usuario o contraseña inválido. Inténtelo de nuevo.');
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(handleLogin, {
    username: '',
    password: '',
  });

  return (
    <div className="login-form">
      <h2>Acceso Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">ID:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={values.username} 
            onChange={handleChange} 
            placeholder="Enter your email" 
          />
          {errors.username && <p className="error">{errors.username}</p>} 
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={values.password} 
            onChange={handleChange} 
            placeholder="Enter your password" 
          />
          {errors.password && <p className="error">{errors.password}</p>} 
        </div>
        {error && (
          <p className="error">{error}</p>
        )}
        <div className="form-group">
          <button type="submit">LOGIN</button>
        </div>
      </form>
    </div>
  );
};

export default Login;