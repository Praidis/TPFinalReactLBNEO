import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useForm from '../Hooks/useForm';
import './ModificarEmpleado.css';

function ModificarEmpleado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState(null);
  const [error, setError] = useState(null);

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
        });
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const { values, handleChange, handleSubmit } = useForm(actualizarEmpleado, empleado || {});

  useEffect(() => {
    fetch(`http://localhost:5000/empleados/${id}`)
      .then((response) => response.json())
      .then((data) => setEmpleado(data))
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  }, [id]);

  if (!empleado) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

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
    </div>
  );
}

export default ModificarEmpleado;