import PropTypes from 'prop-types';

const Modal = ({ isOpen, onConfirm, onCancel, title, subtitle, confirmText }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='modal-text d-flex-center flex-column m-3'>
            <h3>{title}</h3>
            <p>{subtitle}</p>
        </div>
        <div className="modal-buttons">
          <button onClick={onConfirm}>{confirmText}</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  confirmText: PropTypes.string.isRequired
};

export default Modal;
