import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useForm from '../Hooks/useForm';
import './ModificarEmpleado.css';
import ErrorModal from './ErrorModal';

function ModificarEmpleado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState(null);
  const [errorModal, setErrorModal] = useState(false); // Estado para el modal de error
  const [errorModalMessage, setErrorModalMessage] = useState(''); // Estado para el mensaje de error del modal

  const actualizarEmpleado = async (values) => {
    try {
      const empleadoActualizado = { ...empleado, ...values };

      Object.keys(empleadoActualizado).forEach((key) => {
        if (empleadoActualizado[key] === '') {
          empleadoActualizado[key] = empleado[key]; // Restaurar valor original si está vacío
        }
      });

      fetch(`http://localhost:5000/empleados/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empleadoActualizado),
      })
        .then((response) => response.json())
        .then(() => {
          navigate('/empleados');
        })
        .catch((error) => {
          setErrorModal(true);
          setErrorModalMessage('Error de Conexión: No se pudo conectar a la base de datos');
        });
    } catch (error) {
      setErrorModal(true);
      setErrorModalMessage('Error de Conexión: No se pudo conectar a la base de datos');
    }
  };

  const { values, handleChange, handleSubmit } = useForm(actualizarEmpleado, empleado || {});

  useEffect(() => {
    fetch(`http://localhost:5000/empleados/${id}`)
      .then((response) => response.json())
      .then((data) => setEmpleado(data))
      .catch((error) => {
        setErrorModal(true);
        setErrorModalMessage('Error de Conexión: No se pudo conectar a la base de datos');
      });
  }, [id]);

  if (!empleado) return <div>Cargando...</div>;

  const ErrorModalComponent = () => {
    if (!errorModal) return null;
    return (
      <ErrorModal
        mensajeError={errorModalMessage}
        onLogout={() => {
          navigate('/Login');
          console.log('Logout button clicked');
        }}
      />
    );
  };

  return (
    <div className="modificar-empleado-form">
      <h2>Modificar Empleado</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={values.name !== undefined ? values.name : empleado.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Posición:</label>
          <input
            type="text"
            name="position"
            placeholder="Posición"
            value={values.position !== undefined ? values.position : empleado.position}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email !== undefined ? values.email : empleado.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn-add-empleados">Guardar Cambios</button>
          <div style={{ marginTop: '10px' }} />
          <button
            type="button"
            className="btn-add-empleados"
            onClick={() => navigate('/empleados')}
          >
            Volver
          </button>
        </div>
      </form>
      {ErrorModalComponent()}
    </div>
  );
}

export default ModificarEmpleado;