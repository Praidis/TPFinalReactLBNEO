import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EliminarEmpleadoModal from './EliminarEmpleadoModal';
import ErrorModal from './ErrorModal';
import './Empleados.css'; // Importa el archivo CSS

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoAEliminar, setEmpleadoAEliminar] = useState(null);
  const [errorModal, setErrorModal] = useState(false); // Estado para el modal de error
  const [errorModalMessage, setErrorModalMessage] = useState(''); // Estado para el mensaje de error del modal
  const navigate = useNavigate();

  // Obtener la lista de empleados desde el servidor
  useEffect(() => {
    fetch('http://localhost:5000/empleados')
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => {
        setErrorModal(true);
        setErrorModalMessage('Error de Conexión: No se pudo conectar a la base de datos');
        console.error(error);
      });
  }, []);

  // Función para eliminar un empleado
  const eliminarEmpleado = async (id) => {
    try {
      await fetch(`http://localhost:5000/empleados/${id}`, {
        method: 'DELETE',
      });
      setEmpleados(empleados.filter((empleado) => empleado.id !== id)); // Actualiza la lista
      navigate('/empleados'); // Devuelve a la página de empleados
    } catch (error) {
      setErrorModal(true);
      setErrorModalMessage('Error al eliminar empleado');
      console.error('Error al eliminar empleado:', error);
    }
  };

  const handleEliminarEmpleado = (empleado) => {
    setEmpleadoAEliminar(empleado);
  };

  const handleCloseModal = () => {
    setEmpleadoAEliminar(null);
  };

  const ErrorModalComponent = () => {
    if (!errorModal) return null;
    return (
      <ErrorModal
        mensajeError={errorModalMessage}
        onLogout={() => {
          navigate('/login')// Implement logout functionality here
          console.log('Logout button clicked');
        }}
      />
    );
  };

  return (
    <div>
      <Link to="/empleados/nuevo">
        <button className="btn-agregar">
          Agregar Nuevo Empleado
        </button>
      </Link>
      <button 
        className="btn-volver"
        onClick={() => navigate('/')}
      >
        Volver
      </button>

      <div className="table-container">
        <div className="table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Puesto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((empleado) => (
                <tr key={empleado.id}>
                  <td>{empleado.id}</td>
                  <td>{empleado.name}</td>
                  <td>{empleado.email}</td>
                  <td>{empleado.position}</td>
                  <td>
                    <button
                      className="btn-modificar"
                      onClick={() => navigate(`/empleados/modificar/${empleado.id}`)}
                    >
                      Modificar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleEliminarEmpleado(empleado)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {empleadoAEliminar && (
        <EliminarEmpleadoModal
          empleado={empleadoAEliminar}
          onClose={handleCloseModal}
          eliminarEmpleado={eliminarEmpleado}
          navigate={navigate}
        />
      )}
      {ErrorModalComponent()}
    </div>
  );
};

export default Empleados;
