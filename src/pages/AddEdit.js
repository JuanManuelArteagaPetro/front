import React from 'react';
import { useState, useEffect} from 'react';
import {useHistory, useParams, Link} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const initialState ={

    first_name: "",
    last_name:"",
    company_id:"",
    email:"",
    phone:"",
}



const AddEdit =()=>{

    const[state, setState]= useState(initialState);

        const{first_name,last_name,company_id,email,phone}=state;

        const history= useHistory();

        const{id} = useParams();

        useEffect(()=>{

            axios.get(`http://localhost:5000/get/${id}`).then((resp)=> setState({...resp.data[0] }))

        },[id])


        const handleSubmit =(e)=>{

            e.preventDefault();

            if(!first_name|| !last_name || !company_id || !email || !phone){
                toast.error("Hay un dato vacio")
            } else{
                if(!id){

                    axios.post("http://localhost:5000/post",{
                        first_name,
                        last_name,
                        company_id,
                        email,
                        phone
    
                    }).then(()=>{
                        setState({first_name:"", last_name:"", company_id:"", email:"", phone:""});
                    }).catch((err)=> toast.error(err.response.data));
                    toast.success("Empleado Añadido")

                } else{

                    axios.put(`http://localhost:5000/update/${id}`,{
                        first_name,
                        last_name,
                        company_id,
                        email,
                        phone
    
                    }).then(()=>{
                        setState({first_name:"", last_name:"", company_id:"", email:"", phone:""});
                    }).catch((err)=> toast.error(err.response.data));
                    toast.success("Empleado Actualizado")


                }
               
                
                setTimeout(() => history.push("/home"),500);
            }
        }


        const handleInputChange =(e)=>{

            const{name, value} = e.target;
            setState({...state,[name]:value});
        }

        return(

 
           
            <div style={{ left: 10}} class="container">
                <h5 className="card-header">Agregar Empleado</h5>
                <div className="card-body">

                    <form className="container" onSubmit={handleSubmit} >
                        
                         <div  className="col-form-label col-md-7">
                            <label  className="col-form-label col-md-7"htmlFor="first_name">FIRST_NAME</label>
                             
                            <input type="text" value={first_name || ""} onChange={handleInputChange}name="first_name" id="first_name" className="form-control" width="50%"></input>
                        </div>

                        <div  className="col-form-label col-md-7">
                            <label htmlFor="last_name">LAST_NAME</label>
                            <input type="text" value={last_name || ""} onChange={handleInputChange} name="last_name" id="last_name" className="form-control"></input>
                        </div>

                        <div  className="col-form-label col-md-7">
                            <label htmlFor="company_id">COMPANY_ID</label><br/>
                            <input type="text" value={company_id || ""} onChange={handleInputChange} name="company_id" id="company_id" className="form-control"></input>
                        </div>

                        <div className="col-form-label col-md-7">
                            <label htmlFor="email">EMAIL</label><br/>
                            <input type="text" value={email || ""} onChange={handleInputChange}name="email" id="email" className="form-control" ></input>
                        </div>

                        <div className="col-form-label col-md-7">
                            <label htmlFor="phone">PHONE</label><br/>
                            <input type="number" value={phone || ""} onChange={handleInputChange}name="phone" id="phone" className="form-control" ></input>
          
                        </div>

                            <button type="submit" value={id ? "Update": "Save"} className="btn btn-primary"> Agregar Nuevo Empleado</button>
                            <Link to={"/home"} className="btn btn-warning"> Cancelar</Link>
                        
                    </form>
                </div>
           </div>
          
           
        )




}


export default AddEdit;