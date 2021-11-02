import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import HomeEmpresas from './pages/HomeEmpresa';
import AddEmpresas from './pages/AddEmpresas';
import Login from './pages/Login';
import Empresa from './pages/Empresa';
import VistaEmpresa from './pages/VistaEmpresa';



function App2() {
  return (

    <BrowserRouter>

      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>

    
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">

            <Link className="navbar-brand" to={"/home"}>Lista Empleados</Link>
            <Link className="navbar-brand" to={"/empres"}>Lista Empresa Imagen</Link>
            <Link className="navbar-brand" to={"/Empresas"}>Lista Empresas</Link>
            <Link className="navbar-brand" to={"/"}>Cerrar Seccion</Link>


          </div>
        </nav>
        <ToastContainer position="top-center" />
        <Switch>

          <Route path="/home" component={Home} />
          <Route path="/empres" component={Empresa} />
          <Route path="/Empresas" component={HomeEmpresas} />
          <Route path="/addEmpresas" component={AddEmpresas} />
          <Route path="/updatee/:id" component={AddEmpresas} />
          <Route path="/addEmpleado" component={AddEdit} />
          <Route path="/update/:id" component={AddEdit} />

        </Switch>
      </div>


    </BrowserRouter>

  );
}

export default App2;
