import React, { useState } from 'react';
import useForm from '../Hooks/useForm';
import { useNavigate } from 'react-router-dom';
import './NuevoEmpleado.css';
import ErrorModal from './ErrorModal';

const NuevoEmpleado = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío
  const [message, setMessage] = useState(''); // Estado para el mensaje de feedback
  const [errors, setErrors] = useState({}); // Estado para los mensajes de error
  const [errorModal, setErrorModal] = useState(false); // Estado para el modal de error
  const [errorModalMessage, setErrorModalMessage] = useState(''); // Estado para el mensaje de error del modal

  const agregarEmpleado = async () => {
    const errores = {};
    if (!values.name) errores.name = 'Nombre Requerido';
    if (!values.email) errores.email = 'Email Valido requerido';
    if (!values.position) errores.position = 'Campo requerido';

    if (Object.keys(errores).length > 0) {
      setErrors(errores);
      return;
    }

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
      setErrorModal(true); // Set errorModal to true
      setErrorModalMessage('Error de Conexión: No se pudo conectar a la base de datos');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { values, handleChange, handleSubmit } = useForm(agregarEmpleado, {
    name: '',
    email: '',
    position: ''
  });

  const ErrorModalComponent = () => {
    if (!errorModal) return null;
    return (
      <ErrorModal
        mensajeError={errorModalMessage}
        onLogout={() => {
          navigate('/login')
          console.log('Logout button clicked');
        }}
      >
        <p>{errorModalMessage}</p> {/* Render the error message */}
      </ErrorModal>
    );
  };

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
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Posición:</label>
          <input
            type="text"
            name="position"
            value={values.position}
            onChange={handleChange}
          />
          {errors.position && <p className="error-message">{errors.position}</p>}
        </div>
        <div className="form-group">
          <button type="submit" disabled={isSubmitting}> {/* Desactivar botón durante el envío */}
            {isSubmitting ? 'Agregando...' : 'Agregar'}
          </button>
          <button type="button" className="volver-button" onClick={() => navigate('/empleados')}>Volver</button> {/* Botón Volver */}
        </div>
      </form>
      {ErrorModalComponent()}
    </div>
  );
};

export default NuevoEmpleado;