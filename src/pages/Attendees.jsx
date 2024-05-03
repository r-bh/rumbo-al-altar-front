import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginDataContext } from '../context/LoginDataContext';
import AttendeesTable from '../components/AttendeesTable';
import axios from 'axios';
import { apiUrl } from '../constants/config';
import Modal from '../components/Modal';

const Attendees = () => {
  const [attendees, setAttendees] = useState([]);
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    message: ''
  });
  const [attendeeToRemove, setAttendeeToRemove] = useState(null);
  const [error, setError] = useState(null);
  const { loginData } = useContext(LoginDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginData) {
      navigate('/login');
    } else {
      axios.get(`${apiUrl}/attendees`)
        .then((res) => {
          setAttendees(res.data);
        }).catch((err) => {
          console.log(err);
        });
    }
  }, [loginData, navigate]);

  const openRemoveAttendeeModal = (attendee) => {
    setModalInfo({
      isOpen: true,
      message: `¿ Estás segur@ de que quieres eliminar a ${attendee.name} ?`
    });
    setAttendeeToRemove(attendee);
  }

  const onModalCancel = () => {
    setModalInfo({
      isOpen: false,
      message: ''
    });
  }

  const onRemoveConfirm = () => {
    // As the attendee email is unique, we can use it as the identifier
    axios.delete(`${apiUrl}/attendees/${attendeeToRemove.email}`).then(() => {
      setAttendees(attendees.filter((attendee) => attendee.email !== attendeeToRemove.email));
      setModalInfo({
        isOpen: false,
        message: ''
      });
      setAttendeeToRemove(null);
      setError(null);
    }).catch((error) => {
      setError(error.response?.data.message || error.message);
    });
  }

  return (
    <div className="container d-flex-center flex-column">
      <Modal
        title={modalInfo.message}
        subtitle='Esta acción no se puede deshacer'
        confirmText='Eliminar'
        isOpen={modalInfo.isOpen}
        onConfirm={() => onRemoveConfirm()}
        onCancel={onModalCancel}>
      </Modal>
      {error && (
          <div className="error-box mb-3 w-100 d-flex-center">
            <p className="m-0 p-2">{error}</p>
          </div>
        )}
      {attendees.length === 0 && <h3> Todavía no hay asistentes registrados</h3>}
      {attendees.length > 0 && <AttendeesTable attendees={attendees} onRemoveAttendee={openRemoveAttendeeModal} />}
    </div>
  );
};

export default Attendees;
