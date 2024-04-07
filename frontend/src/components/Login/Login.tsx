// import { ChangeEventHandler, FocusEventHandler, MouseEventHandler, useState } from 'react';
// import Input from './Input';
// import Button from './Button';
// import Validation, { ValidationErrors } from './Validation';
// import styles from './Login.module.css';
// import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
// import { app } from "../../Auth/firebaseConfig";

// type UserLoginState = {
//   email: string;
//   password: string;
// };

// const InitialValue: UserLoginState = {
//   email: '',
//   password: '',
// };

// const Login = () => {
//   const [login, setLogin] = useState(InitialValue);
//   const [errors, setErrors] = useState<ValidationErrors>({});
//   const auth = getAuth(app);

//   const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
//     const name = e.target.name as keyof UserLoginState;
//     setLogin((state) => ({
//       ...state,
//       [name]: e.target.value,
//     }));
//   };

//   const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
//     const name = e.target.name as keyof UserLoginState;
//     const validateErrors = Validation({ ...login, [name]: e.target.value });
//     setErrors(validateErrors);
//   };

//   const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
//     e.preventDefault();
//     const validateErrors = Validation(login);
//     setErrors(validateErrors);
  
//     if (Object.keys(validateErrors).length === 0) {
//       signIn(); 
//       setLogin(InitialValue);
//     }
//   };
  
  
//   const signIn = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, login.email, login.password); 
//       console.log("Inicio de sesión exitoso");
//     } catch (error) {
//       console.error("Error al iniciar sesión:", error);
//     }
//   };
  

//   return (
//     <div className={styles.loginPageContainer}>
//       <div className={styles.loginContainer}>
//         <h2 className={styles.loginHeading}>Inicio de sesión</h2>
//         <div className={styles.introText}>
//           Introduce tu cuenta de siempre en InterFoods o regístrate si es tu primera vez.
//         </div>
//         {errors.email && <p className={styles.inputError}>{errors.email}</p>}
//         <div className={styles.inputContainer}>
//           <Input
//             type="email"
//             value={login.email}
//             name="email"
//             placeholder="Email"
//             handleChange={handleChange}
//             onBlur={handleBlur}
//             required
//           />
//         </div>
//         {errors.password && <p className={styles.inputError}>{errors.password}</p>}
//         <div className={styles.inputContainer}>
//           <Input
//             type="password"
//             value={login.password}
//             name="password"
//             placeholder="Password"
//             handleChange={handleChange}
//             onBlur={handleBlur}
//             required
//           />
//         </div>
//         <div className={styles.forgetandcreate}>
//           <a href="/forgot-password">¿Olvidaste la contraseña?</a>
//         </div>
//         <div className={styles.buttonSub}>
//           <Button className={styles.submitButton} handleClick={handleClick}>
//             INICIAR SESION
//           </Button>
//         </div>
//         <div className={styles.forgetandcreates}>
//           <a href="/register">Crear cuenta</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login

import { ChangeEventHandler, FocusEventHandler, MouseEventHandler, useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import Swal from 'sweetalert2';
import Validation, { ValidationErrors } from './Validation';
import styles from './Login.module.css';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithRedirect, onAuthStateChanged } from '@firebase/auth';
import { app} from "../../Auth/firebaseConfig";
import { NavLink } from 'react-router-dom';
import { getUser } from '../../redux/actions/Actions';
import { useNavigate } from 'react-router-dom';


type UserLoginState = {
  email: string;
  password: string;
};

const InitialValue: UserLoginState = {
  email: '',
  password: '',
};

export const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(InitialValue);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name as keyof UserLoginState;
    const validateErrors = Validation({ ...login, [name]: e.target.value });
    setErrors(validateErrors);
    setLogin((state) => ({
      ...state,
      [name]: e.target.value,
    }));
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name as keyof UserLoginState;
    const validateErrors = Validation({ ...login, [name]: e.target.value });
    setErrors(validateErrors);
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const validateErrors = Validation(login);
    setErrors(validateErrors);
  
    if (Object.keys(validateErrors).length === 0) {
      try {
        // Iniciar sesión con Firebase
        const userCredential = await signInWithEmailAndPassword(auth, login.email, login.password);
        const userEmail = userCredential.user?.email;

        // Llamar a la función registerUser pasando el correo electrónico
        if (userEmail) {
          const userData = await getUser(userEmail);
          console.log(userData);
          
        }

        // Mostrar mensaje de éxito
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          text: '¡Bienvenido de nuevo!',
          icon: 'success',
          confirmButtonText: 'Entendido'
        }).then(() => {
          window.location.href = "/";
        });
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        // Mostrar mensaje de error
        Swal.fire({
          title: 'Error al iniciar sesión',
          text: 'Hubo un problema al intentar iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      }
    }
  };
  const handleGoogleSignIn = () => {
       const auth = getAuth();
       signInWithRedirect(auth, googleProvider);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      } else {
      }
    });
    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

 
 
  

  

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginContainer}>
        <h2 className={styles.loginHeading}>Inicio de sesión</h2>
        <div className={styles.introText}>
          Introduce tu cuenta de siempre en InterFoods o regístrate si es tu primera vez.
        </div>
        {errors.email && <p className={styles.inputError}>{errors.email}</p>}
        <div className={styles.inputContainer}>
          <Input
            type="email"
            value={login.email}
            name="email"
            placeholder="Email"
            handleChange={handleChange}
            onFocus={handleBlur}
            required
          />
        </div>
        {errors.password && <p className={styles.inputError}>{errors.password}</p>}
        <div className={styles.inputContainer}>
          <Input
            type="password"
            value={login.password}
            name="password"
            placeholder="Password"
            handleChange={handleChange}
            onFocus={handleBlur}
            required
          />
        </div>
        <div className={styles.forgetandcreate}>
          <a href="/Recuperarcontraseña">¿Olvidaste la contraseña?</a>
        </div>
        <div className={styles.buttonSub}>
          <Button className={styles.submitButton} handleClick={handleClick}>
            INICIAR SESION
          </Button>
        </div>
        <div className={styles.buttonSub}>
          <button  className={styles.submitButtonGoogle} onClick={handleGoogleSignIn}>
            INICIAR SESION CON GOOGLE
          </button>
        </div>
        <div className={styles.forgetandcreates}>
          <NavLink to="/Register">Crear cuenta</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
