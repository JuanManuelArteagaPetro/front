import React from 'react';
import { useState, useEffect} from 'react';
import {useHistory, useParams, Link} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


const initialState ={

    name: "",
    email:"",
    logo:"",
    website:"",
  
}



const AddEmpresas =()=>{

    const[state, setState]= useState(initialState);

        const{name,email,logo,website}=state;

        const history= useHistory();

        const{id} = useParams();

        useEffect(()=>{

            axios.get(`http://localhost:5000/gete/${id}`).then((resp)=> setState({...resp.data[0] }))

        },[id])


        const handleSubmit =(e)=>{

            e.preventDefault();

            if(!name|| !email || !logo  || !website){
                toast.error("Hay un dato vacio")
            } else{
                if(!id){

                    axios.post("http://localhost:5000/poste",{
                        name,
                        email,
                        logo,
                        website,
                        
    
                    }).then(()=>{
                        setState({name:"", email:"", logo:"", website:""});
                    }).catch((err)=> toast.error(err.response.data));
                    toast.success("Empresa Añadida")

                } else{

                    axios.put(`http://localhost:5000/updatee/${id}`,{
                        name,
                        email,
                        logo,
                        website
    
                    }).then(()=>{
                        setState({name:"", email:"", logo:"", website:""});
                    }).catch((err)=> toast.error(err.response.data));
                    toast.success("Empleado Actualizado")


                }
               
                
                setTimeout(() => history.push("/Empresas"),500);
            }
        }


        const handleInputChange =(e)=>{

            const{name, value} = e.target;
            setState({...state,[name]:value});
        }

        
        return(

            <div className="container">
            <div className="card">
                <h5 className="card-header">Agregar Empresa</h5>
                <div className="card-body">

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" value={name || ""} onChange={handleInputChange}name="name" id="name" className="form-control"></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                      
                            <input type="text" value={email || ""} onChange={handleInputChange} name="email" id="email" className="form-control"></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="logo">Logo</label>
            
                            <input type="text" value={logo || ""} onChange={handleInputChange} name="logo" id="logo" className="form-control"></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="website">Website</label>
                            <input type="text" value={website || ""} onChange={handleInputChange}name="website" id="website" className="form-control" ></input>
          
                        </div>

                        <div className="btn-group" role="group" arial-label="">

                            <button type="submit" value={id ? "Update": "Save"} className="btn btn-primary"> Agregar Nueva Empresa</button>
                            <Link to={"/Empresas"} className="btn btn-warning"> Cancelar</Link>
                        </div>
                    </form>
                </div>
            </div>
          </div>  
        )




}


export default AddEmpresas;