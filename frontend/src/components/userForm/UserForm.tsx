import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './UserForm.module.css';
import validateUser from './UserValidate';
import { useNavigate } from 'react-router-dom';
import { signUpNewUser } from '../../redux/actions/Actions';
import { useDispatch } from 'react-redux';

interface FormValues {
  profilePictureName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture?: File | null;
  country: string;
  city: string;
  address: string;
}

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  profilePicture: null,
  country: '',
  city: '',
  address: '',
  profilePictureName: ''
};

const UserForm: React.FC = () => {
  const history = useNavigate()
  const dispatch = useDispatch();
  
  const handleSubmit = async (values: FormValues) => {
    try {
      await signUp(values, dispatch);
      history('/');
    } catch (error) {
      console.error("Error al crear la cuenta:", error);
    }
  };
  
 const signUp = async (values: FormValues, dispatch: any) => {
  try {
    console.log(values.email, values.password, values.firstName, values.lastName, values.profilePicture?.name, values.city, values.country, values.address, false, true );
    
    
    await dispatch(signUpNewUser(values.email, values.password, values.firstName, values.lastName, values.profilePictureName, values.city, values.country, values.address, false, true )); 
    console.log("Cuenta creada");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};
return (
  <div className={styles.container}>
    <Formik
      initialValues={initialValues}
      validationSchema={validateUser}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isValid, dirty }) => (
        <Form className={styles.form}>
          <h1>Crear cuenta</h1>
          <div>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              className={styles.field}
              placeholder="Nombre"
            />
            <br />
            <p className={styles.error}><ErrorMessage name="firstName" /></p>
          </div>

          <div>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              className={styles.field}
              placeholder="Apellido"
            />
            <br />
            <p className={styles.error}><ErrorMessage name="lastName" /></p>
          </div>

          <div>
            <Field
              type="email"
              id="email"
              name="email"
              className={styles.field}
              placeholder="Email"
            />
            <br />
            <p className={styles.error}><ErrorMessage name="email" /></p>
          </div>

          <div>
            <Field
              type="password"
              id="password"
              name="password"
              className={styles.field}
              placeholder="Contraseña"
            />
            <br />
            <p className={styles.error}><ErrorMessage name="password" /></p>
          </div>

          <div>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={styles.field}
              placeholder="Confirma contraseña"
            />
            <br />
            <p className={styles.error}><ErrorMessage name="confirmPassword" /></p>
          </div>

          <div>
            <label htmlFor="profilePicture">Foto de perfil: (formatos en .jpg, .jpeg ó .png)</label>
            <br />
            <input
              className={styles.field}
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(event) =>
                setFieldValue('profilePicture', event.currentTarget.files?.[0])
              }
            />
            <br />
            <p className={styles.error}><ErrorMessage name="profilePicture" /></p>
          </div>

          <div>
            <Field
              type="text"
              id="country"
              name="country"
              className={styles.field}
              placeholder="País"
            />
            <br />
            <p className={styles.error}><ErrorMessage name="country" /></p>
          </div>

          <div>
            <Field
              type="text"
              id="city"
              name="city"
              className={styles.field}
              placeholder="Ciudad"
            />
            <br />
            <p className={styles.error}><ErrorMessage name="city" /></p>
          </div>

          <div>
            <Field
              type="text"
              id="address"
              name="address"
              className={styles.field}
              placeholder="Direccion"
            />
            <br />
            <p className={styles.error}><ErrorMessage name="address" /></p>
          </div>

          <button type="submit" className={styles.send} disabled={!isValid || !dirty}>REGISTRARME</button>
        </Form>
      )}
    </Formik>
  </div>
);
}

export default UserForm;
