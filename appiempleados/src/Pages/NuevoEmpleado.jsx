import React, { useState } from 'react';
import useForm from '../Hooks/useForm';
import { useNavigate } from 'react-router-dom';
import './NuevoEmpleado.css'; 

const NuevoEmpleado = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío
  const [message, setMessage] = useState(''); // Estado para el mensaje de feedback
  
  const agregarEmpleado = async () => {
    setIsSubmitting(true);
    const empleado = {
      id: Math.floor(Math.random() * 1000).toString(),
      name: values.name,
      email: values.email,
      position: values.position
    };

    try {
      const response = await fetch('http://localhost:5000/empleados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(empleado)
      });
      if (response.ok) {
        setMessage('¡Empleado agregado con éxito!');
        navigate('/empleados');
      }
    } catch (error) {
      console.error('Error al agregar empleado:', error);
      setMessage('Error al agregar empleado. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { values, handleChange, handleSubmit } = useForm(agregarEmpleado, {
    name: '',
    email: '',
    position: ''
  });

  return (
    <div className="nuevo-empleado-form">
      <h2>Agregar Nuevo Empleado</h2>
      {message && <p>{message}</p>} {/* Mostrar mensaje de éxito o error */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Posición:</label>
          <input
            type="text"
            name="position"
            value={values.position}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" disabled={isSubmitting}> {/* Desactivar botón durante el envío */}
            {isSubmitting ? 'Agregando...' : 'Agregar'}
          </button>
          <button type="button" className="volver-button" onClick={() => navigate('/empleados')}>Volver</button> {/* Botón Volver */}
        </div>
      </form>
    </div>
  );
};

export default NuevoEmpleado;
