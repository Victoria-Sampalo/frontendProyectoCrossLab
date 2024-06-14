// ./src/components/Login.jsx
import { useState, useEffect, useContext } from "react";
import styles from "../styles/Login.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { validEmail, validPassword } from '../lib/valid';
import { textErrors } from '../lib/textErrors';
import { getPrueba, loggear } from '../lib/data';
import { useLogin } from '../hooks/useLogin';
import { guardarToken } from '../lib/serviceToken';
import { LoggedContext } from "../context/LoggedProvider";

const Login = () => {
     // Obtener el estado de login y la función para cambiarlo del hook useLogin
     //const {logged, cambiarLogged} = useLogin();
     const { logged, cambiarLogged } = useContext(LoggedContext);
     // Definir los estados locales para email y password
     const [email, setEmail] = useState("");
     const [pass, setPass] = useState("");
     // Definir el estado local para errores
     const [errores, setError] = useState({
         email: null,
         password: null,
         user_status: null,
         mensajeError: null,
     });
    
     // Inicializar el hook de navegación
     const navigate = useNavigate();
   // useEffect para redirigir si el usuario ya está logueado
    useEffect(()=>{
        // console.log(logged)
       if(logged.estaLogueado) navigate('/');
      },[logged, navigate])
// Manejar cambios en los inputs de email y password
    const handleChange=(e)=>{
        // let auxErrores={...errores}
        // auxErrores['mensajeError']=null
        //   // Validar el email y actualizar el estado de errores
        // if(e.target.name=='email') 
        // {   
        //     if(!validEmail(e.target.value)){            
        //         auxErrores['email']=textErrors('email')
        //         setError(auxErrores)
        //     } else {
        //         auxErrores['email']=null
        //         setError(auxErrores)
        //     }

        //     setEmail(e.target.value)
        // }
        //   // Validar la contraseña y actualizar el estado de errores
        // if(e.target.name=='pass') 
        //     {
        //         if(!validPassword(e.target.value)){            
        //             auxErrores['password']=textErrors('password')
        //             setError(auxErrores)
        //         } else {
        //             auxErrores['password']=null
        //             setError(auxErrores)
        //         }
        //         setPass(e.target.value)
        //     }
        const { name, value } = e.target;
        let auxErrores = { ...errores, mensajeError: null };
    
        if (name === 'email') {
          if (!validEmail(value)) {
            auxErrores.email = textErrors('email');
          } else {
            auxErrores.email = null;
          }
          setEmail(value);
        }
    
        if (name === 'pass') {
          if (!validPassword(value)) {
            auxErrores.password = textErrors('password');
          } else {
            auxErrores.password = null;
          }
          setPass(value);
        }
    
        setError(auxErrores);

    }
   // Función para manejar el login
   const loguear = async () => {
    if (errores.email === null && errores.password === null) {
      if (!email || !pass) {
        let auxErrores = { ...errores };
        if (!email) auxErrores['email'] = textErrors('vacio');
        if (!pass) auxErrores['password'] = textErrors('vacio');
        setError(auxErrores);
      } else {
        const login = await loggear(email, pass);
        if (login.error) {
          let auxErrores = { ...errores };
          auxErrores['mensajeError'] = login.message;
          setError(auxErrores);
        } else {
          cambiarLogged(login.user);
          guardarToken(login.token);
          navigate('/');
        }
      }
    }
  }

  return (
    <div className={styles.loginContainer}>
      <h2>LOGIN</h2>
      <div className={styles.inputGroup}>
        <label htmlFor="email">EMAIL</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => handleChange(e)}
          value={email || ""}
        />
        <span className="errorSpan">{errores.email}</span>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="pass">PASSWORD</label>
        <input
          type="password"
          id="pass"
          name="pass"
          onChange={(e) => handleChange(e)}
          value={pass || ""}
        />
        <span className="errorSpan">{errores.password}</span>
      </div>
      <button onClick={loguear}>SIGN IN</button>

      <p className="fuenteCourier enlace">¿Forgot your password?</p>

      <Link to="/createaccount"><p className="enlace">Create account</p></Link>
     
    
      
      <span className="errorSpan">{errores.mensajeError}</span>
    </div>
  );
};

export default Login;
