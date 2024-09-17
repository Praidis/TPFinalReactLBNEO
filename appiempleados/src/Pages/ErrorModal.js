import React from 'react';
import './EliminarEmpleadoModal.css'; // Reutilizamos los estilos del modal

const ErrorModal = ({ mensajeError, onLogout }) => {
  return (
    <div className="eliminar-empleado-modal-container">
      <div className="eliminar-empleado-modal">
        <h2 style={{ textAlign: 'center' }}>Error de Conexión</h2>
        <p>{mensajeError}</p>
        <div className="botones-container">
          <button 
            className="confirm" 
            onClick={onLogout} // Ejecuta la función de logout
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;