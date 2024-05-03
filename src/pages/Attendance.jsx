import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginDataContext } from "../context/LoginDataContext";
import axios from "axios";
import { apiUrl } from "../constants/config";

const Attendance = () => {
  const navigate = useNavigate();
  const { loginData } = useContext(LoginDataContext);
  const [attendeeInfo, setAttendeeInfo] = useState({
    name: "",
    email: "",
    mealPreference: "none",
    busPreference: "no",
    comments: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!loginData) {
      navigate('/login');
    }
  })

  const handleChange = (e) => {
    setError(null);
    setSuccess(null);

    setAttendeeInfo({
      ...attendeeInfo,
      [e.target.name]: e.target.value
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (attendeeInfo.name && attendeeInfo.email && attendeeInfo.mealPreference && attendeeInfo.busPreference) {
      axios.post(`${apiUrl}/attendees/${loginData.weddingId}`, attendeeInfo).then(() => {
        setAttendeeInfo({
          name: "",
          email: "",
          mealPreference: "none",
          busPreference: "no",
          comments: ""
        })
        setSuccess('Datos guardados correctamente');
      }).catch((error) => {
        setError(error.response.data.message);
      })
    }
  };

  return (
    <div className="container">
      <form className="d-flex-center flex-column" onSubmit={handleFormSubmit}>
        <h2>Formulario de Asistencia</h2>
        {error && (
          <div className="error-box mb-3 w-100 d-flex-center">
            <p className="m-0 p-2">{error}</p>
          </div>
        )}
        {success && (
          <div className="success-box mb-3 w-100 d-flex-center">
            <p className="m-0 p-2">{success}</p>
          </div>
        )}
        <div className="mb-3 w-100">
          <label htmlFor="name" className="form-label">Nombre *</label>
          <input type="text" name="name" className="form-input w-100" value={attendeeInfo.name} onChange={handleChange} required />
        </div>
        <div className="mb-3 w-100">
          <label htmlFor="name" className="form-label">Correo electrónico *</label>
          <input type="email" name="email" className="form-input w-100" value={attendeeInfo.email} onChange={handleChange} required />
        </div>
        <div className="mb-3 w-100">
          <label htmlFor="name" className="form-label">Preferencias alimentarias *</label>
          <div className="p-2">
            <input type="radio" name="mealPreference" value="gluten" onChange={handleChange} required />
            <span>Sin Gluten</span>
          </div>
          <div className="p-2">
            <input type="radio" name="mealPreference" value="vegan" onChange={handleChange} required />
            <span>Vegano</span>
          </div>
          <div className="p-2">
            <input type="radio" name="mealPreference" value="vegetarian" onChange={handleChange} required />
            <span>Vegetariano</span>
          </div>
          <div className="p-2">
            <input type="radio" name="mealPreference" value="none" onChange={handleChange} required />
            <span>Como de todo!</span>
          </div>
        </div>
        <div className="mb-3 w-100">
          <label htmlFor="bus" className="form-label">Servicio de autobuses *</label>
          <div className="p-2">
            <input type="radio" name="busPreference" value="seven" onChange={handleChange} required />
            <span>Iré en el autobús de las 7</span>
          </div>
          <div className="p-2">
            <input type="radio" name="busPreference" value="twelve" onChange={handleChange} required />
            <span>Iré en el autobús de las 12</span>
          </div>
          <div className="p-2">
            <input type="radio" name="busPreference" value="no" onChange={handleChange} required />
            <span>No necesito autobús</span>
          </div>
        </div>
        <div className="mb-3 w-100">
          <label htmlFor="comments" className="form-label">Otros comentarios / sugerencias</label>
          <textarea name="comments" className="form-input w-100" value={attendeeInfo.comments} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="btn">Enviar</button>
      </form>
    </div>
  );
};

export default Attendance;
