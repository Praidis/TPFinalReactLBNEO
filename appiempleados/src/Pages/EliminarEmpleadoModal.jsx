import React from 'react';
import './EliminarEmpleadoModal.css';

const EliminarEmpleadoModal = ({ empleado, onClose, eliminarEmpleado, navigate }) => {
  return (
    <div className="eliminar-empleado-modal-container">
      <div className="eliminar-empleado-modal">
        <h2 style={{ textAlign: 'center' }}>Eliminar Empleado</h2>
        <p>¿Estás seguro de que deseas eliminar a {empleado.name}?</p>
        <div className="botones-container">
          <button 
            className="confirm"
            onClick={() => {
              eliminarEmpleado(empleado.id);
              onClose(); // Cierra el modal
              navigate('/empleados'); // Navega a la página de empleados
            }}
          >
            Sí
          </button>
          <button 
            className="cancel"
            onClick={() => {
              onClose(); // Cierra el modal
              navigate('/empleados'); // Navega a la página de empleados
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default EliminarEmpleadoModal;