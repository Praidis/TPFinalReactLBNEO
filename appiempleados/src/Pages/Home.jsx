import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Agregar useNavigate para el logout
import TopBar from '../components/TopBar';
import ErrorModal from './ErrorModal'; // Importamos el nuevo modal
import './Home.css';

const Home = () => {
  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarErrorModal, setMostrarErrorModal] = useState(false); // Controla la visualización del modal
  const navigate = useNavigate(); // Para manejar el logout

  useEffect(() => {
    fetch('http://localhost:5000/empleados')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al conectar con la base de datos'); // Mensaje personalizado
        }
        return response.json();
      })
      .then((data) => setEmpleados(data))
      .catch((error) => {
        setError('Error al conectar con la base de datos'); // Mensaje personalizado
        setMostrarErrorModal(true); // Muestra el modal si ocurre un error
      });
  }, []);

  const handleLogout = () => {
    // Aquí puedes limpiar los datos del usuario y redirigir a la página de login
    // Ejemplo: localStorage.clear();
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <div>
      <TopBar />
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>Lista de Empleados</h2>
        <p style={{ marginLeft: "75px" }}>
          <Link to="/empleados" className="btn-add-empleados">
            Gestionar Empleados
          </Link>
        </p>
      </div>
      <div className="table-container">
        <div className="table-wrapper">
          {error ? (
            <ErrorModal
              mensajeError={error}
              onLogout={handleLogout} // Pasamos la función de logout
            />
          ) : (
            <table className="employee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Puesto</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((empleado) => (
                  <tr key={empleado.id}>
                    <td>{empleado.id}</td>
                    <td>{empleado.name}</td>
                    <td>{empleado.email}</td>
                    <td>{empleado.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {mostrarErrorModal && (
        <ErrorModal
          mensajeError={error}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Home;