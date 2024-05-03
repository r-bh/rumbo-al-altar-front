import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginDataContext } from '../context/LoginDataContext';
import { apiUrl } from '../constants/config';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { loginData, updateLoginData } = useContext(LoginDataContext);
  const [loginInfo, setLoginInfo] = useState({ name: '', password: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loginData) {
      navigate('/');
    }
  }, [loginData, navigate]);

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${apiUrl}/login`, loginInfo).then((response) => {
      updateLoginData(response.data.user);
      navigate('/');
    }).catch((error) => {
      console.log('EL ERROR', error.message)
      setError(error.response?.data.message || error.message);
    });
  };

  return (
    <div className='container'>
      <div className='d-flex-center flex-column'>
        <p>Por favor, introduce las credenciales de acceso</p>
        <div className='card my-3'>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className='text-center error-box mb-3'>
                <p className='m-0 p-2'>{error}</p>
              </div>
            )}
            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>Usuario</label>
              <input type='text' className='form-input' name='name' value={loginInfo.name} onChange={handleChange} />
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='form-label'>Contraseña</label>
              <input type='password' className='form-input' name='password' value={loginInfo.password} onChange={handleChange} />
            </div>
            <div className='d-block text-center'>
              <button type='submit' className='btn'>Aceptar</button>
            </div>
          </form>
        </div>
        <p>Quieres crear tu propia página de bodas?
          <a href='/register' className='link'> Haz click aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
