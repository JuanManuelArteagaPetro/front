import React from 'react';
import { useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";




const Home = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/get");
        setData(response.data);

    };

    useEffect(() => {
        loadData();
    }, []); 


    const deleteEmpleado=(id)=>{

        if(window.confirm("Quieres Eliminar ?")){

            axios.delete(`http://localhost:5000/remove/${id}`);

            toast.success("Empleado Eliminado");
            setTimeout(() => loadData(), 500);
        }
    }


    
    return (
        
    

        <div className="card">
        <h5 className="card-header">
        <Link to="/addEmpleado">
        
             <button className="btn btn-success" >Agregar Empleados</button>
             </Link>
        </h5>
        <div className="card-body">
            <h4> Lista de Empleados</h4>
            <table class="table table-hover" id="tabla">

            <thead className=" table-dark">

                <tr>
                    <th>ID</th>
                    <th>FIRST_NAME</th>
                    <th>LAST_NAME </th>
                    <th>COMPANY_ID</th>
                    <th> EMAIL</th>
                    <th> PHONE</th>
                    <th> Acciones</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item) => (


                    <tr key={item.id}>
                        <td >{item.id}</td>
                        <td >{item.first_name}</td>
                        <td >{item.last_name} </td>
                        <td >{item.company_id}</td>
                        <td > {item.email}</td>
                        <td > {item.phone}</td>
                        <td>
                        <div>
                        <Link to={`/update/${item.id}`}>
                         <button className="btn btn-success">Editar</button>
                         </Link>
                         <button className="btn btn-danger" onClick={()=>deleteEmpleado(item.id)}>Eliminar</button>
                                    
                                  
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



export default Home;