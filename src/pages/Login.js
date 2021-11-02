import React, { useState } from 'react';
import axios from 'axios';
import '../pages/css/login.css';
import logo3 from '../pages/css/logo3.png'
import swal from 'sweetalert';



function Login() {

    //arreglar que se van datos en mayuscula y minuscula y funciona la clave
    // se ve la barra de navegacion antes que el loguin. 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const Login = (props) => {

        axios.post("http://localhost:5000/lol", {

            username: username,
            password: password,

        }).then((response) => {

            if (response.data.length) {
                swal({

                    title: "Bienvenido",
                    text: "Usuario Encontrado",
                    icon:"success",
                    button: "Aceptar",
                    timer:"999999999999999999999999999999999999999999"

                });
                window.location.href = "./home";
            } else if (!username || !password) {
                swal({

                    title: "Ops !",
                    text: "Favor llenar Todos Los Campos",
                    icon:"warning",
                    button: "Aceptar",
                    timer:"999999999999999999999999999999999999999999"

                });
            } else {

                swal({

                    title: "Algo está mal ",
                    text: "Verifique Usuario y/o Password",
                    icon:"warning",
                    timer:"999999999999999999999999999999999999999999",
                    button: "Aceptar"
                    
                });
                window.location.href = "./"
            }
            console.log(response);
        });


    };


    return (

        <div className="wrapper fadeInDown">
            <div id="formContent">

                <div className="fadeIn first">
                    <img src={logo3} width="0,5px" id="icon" alt="User Icon" />
                </div>

                <form>
                    <input type="text" id="login" className="fadeIn second" name="login" onChange={(e) => { setUsername(e.target.value) }} placeholder="login" required />
                    <br />

                    <input type="password" id="password" className="fadeIn third" name="login" onChange={(e) => { setPassword(e.target.value) }} placeholder="password" required />
                    <br />
                    <br />
                    <input type="submit" onClick={Login} className="fadeIn fourth" value="Log In" />

                    <br />
                </form>


                <div id="formFooter">
                    <br></br>
                </div>

            </div>
        </div>





    );



};

export default Login;