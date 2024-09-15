import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import './Home.css';

const Home = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/empleados')
      .then(response => response.json())
      .then(data => setEmpleados(data));
  }, []);

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
        </div>
      </div>
    </div>
  );
};

export default Home;