import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Empleados from './Pages/Empleados';
import NuevoEmpleado from './Pages/NuevoEmpleado';
import ModificarEmpleado from './Pages/ModificarEmpleado';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/empleados/nuevo" element={<NuevoEmpleado />} />
            <Route path="/empleados/modificar/:id" element={<ModificarEmpleado />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
