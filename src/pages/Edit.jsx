import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginDataContext } from '../context/LoginDataContext';
import axios from 'axios';
import UploadImageIcon from './../assets/upload.svg';
import { apiUrl } from '../constants/config';

function Edit() {
  const navigate = useNavigate();
  const { loginData } = useContext(LoginDataContext);
  const [formData, setFormData] = useState({
    coupleName: null,
    date: null,
    description: null,
    image: null,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [changedFields, setChangedFields] = useState({
    image: false,
    date: false,
    description: false,
    coupleName: false,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!loginData) {
      navigate('/login');
    // Only fetch data if we haven't already (coupleName is null)
    } else if (formData.coupleName === null) {
      axios
        .get(`${apiUrl}/wedding/${loginData.weddingId}`)
        .then((response) => {
          setFormData({
            coupleName: response.data.coupleName,
            date: response.data.date,
            description: response.data.description,
            image: response.data.image,
          });
        })
        .catch((error) => {
          setError(error.response?.data.message || error.message);
        });
    }
  });

  const handleFormChange = (event, field) => {
    setError(null);
    setSuccess(null);
    setFormData({ ...formData, [field]: event.target.value });
    setChangedFields({ ...changedFields, [field]: true });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setError(null);
    setSuccess(null);
    setFile(e.target.files[0]);
    setChangedFields({ ...changedFields, image: true });
  };

  const handleImageUpload = event => {
    event.preventDefault();
    const imageFormData = new FormData();
    imageFormData.append('file', file);
    setLoading(true);

    axios
      .post(`${apiUrl}/upload`, imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const imagePath = response.data.imagePath;
        setFormData({ ...formData, image: imagePath });
        saveChanges(imagePath);
      })
      .catch(() => {
        setError('Fallo en la subida de la imagen. Por favor, inténtalo de nuevo.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Save changes to the server
  const saveChanges = (imagePath) => {
    const changedFieldsData = {
      ...(changedFields.coupleName && { coupleName: formData.coupleName }),
      ...(changedFields.date && { date: formData.date }),
      ...(changedFields.description && { description: formData.description }),
      ...(imagePath && { image: imagePath }),
    };

    axios
      .put(`${apiUrl}/wedding/${loginData.weddingId}`, changedFieldsData)
      .then(() => {
        setSuccess('Datos guardados correctamente');
      })
      .catch((error) => {
        setError(error.response?.data.message || error.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (changedFields.image) {
      handleImageUpload(event);
    } else {
      saveChanges();
    }
  };

  return (
    <div className='container mt-3'>
      <form className='d-flex-center flex-column' onSubmit={handleSubmit}>
        {/* Display error message */}
        {error && (
          <div className='error-box mb-3 w-100 d-flex-center'>
            <p className='m-0 p-2'>{error}</p>
          </div>
        )}
        {/* Display success message */}
        {success && (
          <div className='success-box mb-3 w-100 d-flex-center'>
            <p className='m-0 p-2'>{success}</p>
          </div>
        )}
        <div className='mb-3 w-100'>
          <label htmlFor='coupleName' className='form-label'>
            Nombre de la pareja *
          </label>
          {/* Input for coupleName */}
          <input
            type='text'
            id='coupleName'
            className='form-input w-100'
            value={formData.coupleName}
            onChange={(event) => handleFormChange(event, 'coupleName')}
          />
        </div>
        <div className='mb-3 w-100'>
          <label htmlFor='date' className='form-label'>
            Fecha de la boda *
          </label>
          {/* Input for date */}
          <input
            type='date'
            id='date'
            className='form-input w-100'
            value={formData.date}
            onChange={(event) => handleFormChange(event, 'date')}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <div className='mb-3 w-100'>
          <label htmlFor='description' className='form-label'>
            Descripción *
          </label>
          {/* Textarea for description */}
          <textarea
            id='description'
            className='form-input w-100'
            value={formData.description}
            onChange={(event) => handleFormChange(event, 'description')}
            required
          />
        </div>
        <div className='mb-3 w-100 d-flex-center flex-column'>
          <div className='image-container d-flex-center h-100 flex-row'>
            {/* Display uploading message */}
            {loading && <p>Uploading image...</p>}

            {/* Display preview of selected image */}
            {!loading && file && (
              <div className='low-opacity'>
                <img src={URL.createObjectURL(file)} alt='Vista previa' className='w-100' />
              </div>
            )}

            {/* Display preview of existing image */}
            {!loading && formData.image && !file && (
              <div className='low-opacity'>
                <img src={`${apiUrl}/${formData.image}`} alt='Vista previa' className='w-100' />
              </div>
            )}

        {!loading && (
            <div className='custom-file-upload'>
              <input type="file" accept="image/*" onChange={handleImageChange}/>
              <img src={UploadImageIcon} alt="Subir foto" />
            </div>
        )}

      </div>
    </div>
        <button type="submit" className="btn">Enviar</button>
      </form>
    </div>
  );
}

export default Edit;
