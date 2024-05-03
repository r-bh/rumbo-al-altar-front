import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginDataContext } from '../context/LoginDataContext';
import { ADMIN_ROLE } from '../constants/constants';
import axios from 'axios';
import { apiUrl } from '../constants/config';

const Home = () => {
  const navigate = useNavigate();
  const { loginData } = useContext(LoginDataContext);
  const [formData, setFormData] = useState({ description: '', image: '' });

  useEffect(() => {
    if (!loginData) {
      navigate('/login');
    } else if (loginData.role === ADMIN_ROLE) {
      // Redirect to edit page if user is an admin
      navigate('/edit');
    } else if (!formData.coupleName && !formData.description && !formData.image) {
      // Fetch wedding data if form data is empty
      axios
        .get(`${apiUrl}/wedding/${loginData.weddingId}`)
        .then((response) => {
          setFormData({
            description: response.data.description,
            image: response.data.image,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  return (
    <div className='container d-flex-center flex-column'>
      <img src={`${apiUrl}/${formData.image}`} className='w-100 py-5' alt='Imagen de la boda' />
      <p className='pb-5'> {formData.description} </p>
    </div>
  );
};

export default Home;
