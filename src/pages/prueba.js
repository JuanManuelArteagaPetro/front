import React from 'react';
import { useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import './Home.css';
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

        <div style={{ marginTop: "150px" }}>
            <Link to="/addEmpleado">
             <button className=" btn btn-edit">Agregar Empleados</button>
             </Link>
             <br/>
             <br/>
           
           
            <table className="styled-table">

                <thead>

                    <tr>
                        <th style={{textAlign: "center"}}>ID</th>
                        <th style={{textAlign: "center"}}>FIRST_NAME</th>
                        <th style={{textAlign: "center"}}>LAST_NAME </th>
                        <th style={{textAlign: "center"}}>COMPANY_ID</th>
                        <th style={{textAlign: "center"}}> EMAIL</th>
                        <th style={{textAlign: "center"}}> PHONE</th>
                        <th style={{textAlign: "center"}}> ACCIONES</th>
                    </tr>
                </thead>
                   
                <tbody>
                
                    {data.map((item) => {
                        return(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.company_id}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>

                                    <Link to={`/update/${item.id}`}>
                                        <button className=" btn btn-success">Editar</button>
                                    </Link>
                               
                                   
                                     <button className=" btn btn-danger" onClick={()=>deleteEmpleado(item.id)}>Eliminar</button>
                                    
                                     <Link to={`/view/${item.id}`}>
                                        <button className=" btn btn-view">View</button>
                                    </Link>
                                </td>
                            
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>   
    );
};

export default Home;