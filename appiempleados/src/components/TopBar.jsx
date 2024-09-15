import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const TopBar = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);

  return (
    <div className="top-bar">
      {isAuthenticated && (
        <>
          <h1>Base de Datos de Empleados</h1>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default TopBar;