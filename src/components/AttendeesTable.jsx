import PropTypes from 'prop-types';

function AttendeesTable({ attendees, onRemoveAttendee }) {
  // Helper function to get the bus preference text based on the value
  const getBusPreference = (busPreference) => {
    if (busPreference === 'no') {
      return '-';
    } else if (busPreference === 'seven') {
      return '7p.m.';
    }
    return '12p.m.';
  };

  // Helper function to get the meal preference text based on the value
  const getMealPreference = (mealPreference) => {
    if (mealPreference === 'gluten') {
      return 'Sin gluten';
    } else if (mealPreference === 'vegan') {
      return 'Menú Vegano';
    } else if (mealPreference === 'vegetarian') {
      return 'Menú Vegetariano';
    }
    return '-';
  }

  return (
    <table className='custom-table'>
      <thead>
        <tr>
          <th className='header-cell'>Nombre</th>
          <th className='header-cell'>Correo Electrónico</th>
          <th className='header-cell'>Autobús</th>
          <th className='header-cell'>Preferencias Alimentarias</th>
          <th className='header-cell'>Comentarios</th>
          <th className='header-cell'></th>
        </tr>
      </thead>
      <tbody>
        {/* Map through the attendees array and render a table row for each attendee */}
        {attendees.map((attendee, index) => (
          <tr key={index}>
            <td>{attendee.name}</td>
            <td>{attendee.email}</td>
            <td className='text-center'>{getBusPreference(attendee.busPreference)}</td>
            <td className='text-center'>{getMealPreference(attendee.mealPreference)}</td>
            <td>{attendee.comments}</td>
            <td className='text-center'>
              <button title='Eliminar invitado' className='remove-btn' onClick={() => onRemoveAttendee(attendee)}>X</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

AttendeesTable.propTypes = {
  attendees: PropTypes.array.isRequired,
  onRemoveAttendee: PropTypes.func.isRequired
};

export default AttendeesTable;
