// ./src/components/CreateAccount.jsx
import { useState, useEffect,useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { validEmail, validPassword, validText, validPasswordRepeat, validEmpresa } from '../lib/valid';
import { textErrors } from '../lib/textErrors';
import { crearUsuarioNormal } from '../lib/data';
import styles from "../styles/Login.module.css";
import { obtenerToken } from "../lib/serviceToken";
import { useLogin } from '../hooks/useLogin';
import { LoggedContext } from "../context/LoggedProvider";
import { guardarToken } from '../lib/serviceToken';

const CreateAccount = () => {
    const navigate = useNavigate();
    const [mensaje,setMensaje]=useState(null)
    const { logged, cambiarLogged } = useContext(LoggedContext);
    const [datos, setDatos] = useState({
        user_name: '',
        email: '',
        password: '',
        full_name: '',
        billing_address: '',
        country: '',
        phone: '',
        date_of_birth: '',
      });
      const [errores, setErrores] = useState({
        user_name: null,
        email: null,
        password: null,
        full_name: null,
        billing_address: null,
        country: null,
        phone: null,
        date_of_birth: null,
        errorMessage: null,
      });

      useEffect(()=>{
        //console.log(logged)
       if(logged.estaLogueado) navigate('/');
      },[logged, navigate])

    const handleChange = (e) => {
        let auxErrores = { ...errores };
        let auxDatos = { ...datos };
        auxErrores["errorMessage"] = null;
        let valido = false;

        // if (e.target.name == 'email') valido = validEmail(e.target.value)
        //     if (e.target.name == 'nombre') valido = validText(e.target.value, 1, 50, false)
        //     if (e.target.name == 'telefono')valido = validPhone(e.target.value)
        //     if (e.target.name == 'cif') valido = validCIF(e.target.value)
        //     if (e.target.name == 'empresa') valido = validEmpresa(e.target.value, 1, 50)  
        //     if (e.target.name == 'password')valido = validPassword(e.target.value)
        //     if (e.target.name == 'passwordR') valido = validPasswordRepeat(e.target.value, datos.password)
    
    
        auxDatos[e.target.name] = e.target.value;
        setDatos(auxDatos);
    
        if (!valido) {
          auxErrores[e.target.name] = textErrors(e.target.name);
        } else {
          auxErrores[e.target.name] = null;
        }
        setErrores(auxErrores);
    };

    const handleCreateAccount = async () => {
        let valido = true;
        let auxErrores = { ...errores };
        for (const key in datos) {
          if (!datos[key]) {
            auxErrores[key] = textErrors("vacio");
            setErrores(auxErrores);
            valido = false;
          }
        }
    
        if (valido) {
            console.log("--------------------------------------");
            console.log(datos);
            const token =  obtenerToken();
            

          const newUser = await crearUsuarioNormal(token,datos);
          if (newUser.error) {
            auxErrores["errorMessage"] = newUser.message;
            setErrores(auxErrores);
          } else {
            setMensaje("Usuario creado con éxito.");
            cambiarLogged(newUser)
            guardarToken(token)
            navigate('/')
           //setTimeout(() => navigate("/"), 2000); // Redirige después de 2 segundos
     
          }
        }
    };

    return (
        <div className={styles.loginContainer}>
        <h2>Create Account</h2>
        {/* Formulario para crear una cuenta */}
        <div className={styles.inputGroup}>
            <label htmlFor="user_name">Username:</label>
            <input
                type="text"
                id="user_name"
                name="user_name"
                value={datos.user_name}
                onChange={handleChange}
            />
            <span className="errorSpan">{errores.user_name}</span>
        </div>

        <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={datos.email}
                onChange={handleChange}
            />
            <span className="errorSpan">{errores.email}</span>
        </div>

        <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={datos.password}
                onChange={handleChange}
            />
            <span className="errorSpan">{errores.password}</span>
        </div>

        <div className={styles.inputGroup}>
            <label htmlFor="full_name">Full Name:</label>
            <input
                type="text"
                id="full_name"
                name="full_name"
                value={datos.full_name}
                onChange={handleChange}
            />
            <span className="errorSpan">{errores.full_name}</span>
        </div>

        <div className={styles.inputGroup}>
            <label htmlFor="billing_address">Billing Address:</label>
            <input
                type="text"
                id="billing_address"
                name="billing_address"
                value={datos.billing_address}
                onChange={handleChange}
            />
            <span className="errorSpan">{errores.billing_address}</span>
        </div>

        <div className={styles.inputGroup}>
            <label htmlFor="country">Country:</label>
            <input
                type="text"
                id="country"
                name="country"
                value={datos.country}
                onChange={handleChange}
            />
            <span className="errorSpan">{errores.country}</span>
        </div>

        <div className={styles.inputGroup}>
            <label htmlFor="phone">Phone:</label>
            <input
                type="text"
                id="phone"
                name="phone"
                value={datos.phone}
                onChange={handleChange}
            />
            <span className="errorSpan">{errores.phone}</span>
        </div>

        <div className={styles.inputGroup}>
            <label htmlFor="date_of_birth">Date of Birth:</label>
            <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={datos.date_of_birth}
                onChange={handleChange}
            />
            <span className="errorSpan">{errores.date_of_birth}</span>
        </div>

        {/* Manejo de errores */}
        {errores.errorMessage && <p className={styles.error}>{errores.errorMessage}</p>}
        <button onClick={handleCreateAccount}>Create Account</button>
        <p>
            Already have an account? <Link to="/login">Login</Link>
        </p>
    </div>
    );
};

export default CreateAccount;
