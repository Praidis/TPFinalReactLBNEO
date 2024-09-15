import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EliminarEmpleadoModal from './EliminarEmpleadoModal';

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoAEliminar, setEmpleadoAEliminar] = useState(null);
  const navigate = useNavigate();

  // Obtener la lista de empleados desde el servidor
  useEffect(() => {
    fetch('http://localhost:5000/empleados')
      .then((response) => response.json())
      .then((data) => setEmpleados(data));
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
      console.error('Error al eliminar empleado:', error);
    }
  };

  const handleEliminarEmpleado = (empleado) => {
    setEmpleadoAEliminar(empleado);
  };

  const handleCloseModal = () => {
    setEmpleadoAEliminar(null);
  };

  return (
    <div>
      <Link to="/empleados/nuevo">
        <button 
          style={{ 
            backgroundColor: 'rgb(30 126 14)', 
            color: 'White', 
            marginBottom: '20px' 
          }}
        >
          Agregar Nuevo Empleado
        </button>
      </Link>
      <button 
        style={{ 
          marginLeft: '10px', 
          backgroundColor: 'gray', 
          color: 'white', 
          marginBottom: '20px' 
        }} 
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
                style={{ marginRight: '10px', backgroundColor: 'skyblue', color: 'white' }}
                onClick={() => navigate(`/empleados/modificar/${empleado.id}`)}
              >
                Modificar
              </button>
              <button
                style={{ backgroundColor: 'Red', color: 'white' }}
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
    </div>
  );
};

export default Empleados;