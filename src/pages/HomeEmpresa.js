import React from 'react';
import { useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const HomeEmpresas = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/gete");
        setData(response.data);

    };

    useEffect(() => {
        loadData();
    }, []); 


    const deleteEmpresa=(id)=>{

        if(window.confirm("Quieres Eliminar La Empresa?")){

            axios.delete(`http://localhost:5000/removee/${id}`);

            toast.success("Empresa Eliminada");
            setTimeout(() => loadData(), 500);
        }
    }
    

    return (

        <div className="card">
        <h5 className="card-header">
        <Link to="/addEmpresas">
             <button className=" btn btn-success">Agregar Empresas</button>
             </Link>
        </h5>
        <div className="card-body">
            <h4> Lista de Empresas</h4>
            <table class="table table-hover">

            <thead className=" table-dark">

                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>LOGO </th>
                    <th>WEBSITE</th>
                    <th> ACCIONES</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item) => (


                    <tr key={item.id}>
                        <td >{item.id}</td>
                        <td >{item.name}</td>
                        <td >{item.email} </td>
                        <td >{item.logo}</td>
                        <td > {item.website}</td>
                        <td>
                        <div>
                        <Link to={`/updatee/${item.id}`}>
                         <button className=" btn btn-success">Editar</button>
                         </Link>
                         <button className=" btn btn-danger" onClick={()=>deleteEmpresa(item.id)}>Eliminar</button>
                                    
    
                            </div>

                        </td>


                    </tr>



                ))}

            </tbody>

        </table>
        </div>
    </div>
  
    );
};

export default HomeEmpresas;