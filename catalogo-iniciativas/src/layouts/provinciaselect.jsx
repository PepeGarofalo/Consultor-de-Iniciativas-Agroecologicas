import '../iniciativaMethods/methodsCSS.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProvinciaSelector = ({ onProvinciaChange, initProvincia }) => {
  const [selectedProvincia, setSelectedProvincia] = useState(initProvincia || '');

  const handleProvinciaChange = (e) => {
    const provinciaSeleccionada = e.target.value;
    setSelectedProvincia(provinciaSeleccionada);
    onProvinciaChange(provinciaSeleccionada);
  };

  useEffect(() => {
    // Actualizar valor cuando cambian los valores iniciales
    setSelectedProvincia(initProvincia || '');
  }, [initProvincia]);

  const provincias = [
    'Pinar del Río',
    'Artemisa',
    'La Habana',
    'Mayabeque',
    'Matanzas',
    'Villa Clara',
    'Cienfuegos',
    'Sancti Spíritus',
    'Ciego de Ávila',
    'Camagüey',
    'Las Tunas',
    'Holguín',
    'Granma',
    'Santiago de Cuba',
    'Guantánamo',
    'Municipio Especial Isla de la Juventud',
  ];

  return (
    <div className='row'>
      <div className='col-12'>
        <div>
          <img src="/src/assets/prov-municip.png" alt="" /> <label className='form-label txtlabel pimgg' htmlFor="provincia">Provincia:</label>
        </div>
        <select required className='selectstyle' id="provincia" value={selectedProvincia} onChange={handleProvinciaChange}>
          <option value="">Selecciona una provincia</option>
          {provincias.map((provincia) => (
            <option key={provincia} value={provincia}>
              {provincia}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

ProvinciaSelector.propTypes = {
  onProvinciaChange: PropTypes.func.isRequired,
  initProvincia: PropTypes.string, // Valor inicial de la provincia
};

export default ProvinciaSelector;