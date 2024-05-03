import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginDataContext } from '../context/LoginDataContext';
import { apiUrl } from '../constants/config';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    adminUserName: '',
    adminPassword: '',
    guestsUserName: '',
    guestsPassword: ''
  });

  const { loginData } = useContext(LoginDataContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loginData) {
      navigate('/');
    }
  });

  const handleChange = (e) => {
    // Remove whitespace from input values
    const sanitizedValue = e.target.value.replace(/\s/g, '');
    setRegisterData({
      ...registerData,
      [e.target.name]: sanitizedValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(registerData.adminPassword)) {
      setError('La contraseña del administrador debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números.');
    } else if (!passwordRegex.test(registerData.guestsPassword)) {
      setError('La contraseña del invitado debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números.');
    } else {
      setError(null);
      axios.post(`${apiUrl}/register`, registerData)
        .then((response) => {
          if (response.data.state === 'success') {
            console.log('Usuario registrado correctamente');
            navigate('/login');
            setRegisterData({
              adminUserName: '',
              adminPassword: '',
              guestsUserName: '',
              guestsPassword: ''
            })
          } else {
            setError('Error al registrar el usuario');
          }
        })
        .catch((error) => {
          setError(error.response?.data.message || error.message);
        });
    }
  };

  return (
    <div className='container'>
      <div className='d-flex-center flex-column'>
        <div className='card wider my-3'>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className='error-box mb-3'>
                <p className='m-0 p-2'>{error}</p>
              </div>
            )}
            <div className='mb-3'>
              <label htmlFor='adminUserName' className='form-label'>Usuario administrador</label>
              <input type='text' className='form-input' name='adminUserName' value={registerData.adminUserName} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label htmlFor='adminPassword' className='form-label'>Contraseña administrador</label>
              <input type='password' className='form-input' name='adminPassword' value={registerData.adminPassword} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label htmlFor='guestsUserName' className='form-label'>Usuario invitados</label>
              <input type='text' className='form-input' name='guestsUserName' value={registerData.guestsUserName} onChange={handleChange} />
            </div>
            <div className='mb-4'>
              <label htmlFor='guestsPassword' className='form-label'>Contraseña invitados</label>
              <input type='password' className='form-input' name='guestsPassword' value={registerData.guestsPassword} onChange={handleChange} />
            </div>
            <div className='d-block text-center'>
              <button type='submit' className='btn'>Aceptar</button>
            </div>
          </form>
        </div>
        <p>¿Quieres iniciar sesión en una página de bodas?
          <a href='/login' className='link'> Haz click aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
