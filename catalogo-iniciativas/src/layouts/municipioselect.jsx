import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../iniciativaMethods/methodsCSS.css';

const MunicipioSelector = ({ onMunicipioChange, provinciaSeleccionada, initMunicipio }) => {
  const [selectedMunicipio, setSelectedMunicipio] = useState(initMunicipio || '');

  const municipiosPorProvincia = {
    'Pinar del Río': ['Consolación del Sur', 'Guane', 'La Palma', 'Los Palacios', 'Mantua', 'Minas de Matahambre', 'Pinar del Río', 'San Juan y Martínez', 'San Luis', 'Sandino', 'Viñales'],
    'Artemisa': ['Alquízar', 'Artemisa', 'Bauta', 'Caimito', 'Guanajay', 'Güira de Melena', 'Mariel', 'San Antonio de los Baños', 'Bahía Honda', 'San Cristóbal', 'Candelaria'],
    'La Habana': ['Plaza de la Revolución', 'Habana Vieja', 'Centro Habana', 'Diez de Octubre', 'Cerro', 'Arroyo Naranjo', 'Boyeros', 'Playa', 'Marianao', 'La Lisa', 'Guanabacoa', 'Regla', 'Habana del Este', 'San Miguel del Padrón', 'Cotorro'],
    'Mayabeque': ['Batabanó', 'Bejucal', 'Güines', 'Jaruco', 'Madruga', 'Melena del Sur', 'Nueva Paz', 'Quivicán', 'San José de las Lajas', 'San Nicolás de Bari', 'Santa Cruz del Norte'],
    'Matanzas': ['Calimete', 'Cárdenas', 'Ciénaga de Zapata', 'Colón', 'Jagüey Grande', 'Jovellanos', 'Limonar', 'Los Arabos', 'Martí', 'Matanzas', 'Pedro Betancourt', 'Perico', 'Unión de Reyes'],
    'Villa Clara': ['Caibarién', 'Camajuaní', 'Cifuentes', 'Corralillo', 'Encrucijada', 'Manicaragua', 'Placetas', 'Quemado de Güines', 'Ranchuelo', 'Remedios', 'Sagua la Grande', 'Santa Clara', 'Santo Domingo'],
    'Cienfuegos': ['Abreus', 'Aguada de Pasajeros', 'Cienfuegos', 'Cruces', 'Cumanayagua', 'Palmira', 'Rodas', 'Lajas'],
    'Sancti Spíritus': ['Cabaiguán', 'Fomento', 'Jatibonico', 'La Sierpe', 'Sancti Spíritus', 'Taguasco', 'Trinidad', 'Yaguajay'],
    'Ciego de Ávila': ['Ciro Redondo', 'Baraguá', 'Bolivia', 'Chambas', 'Ciego de Ávila', 'Florencia', 'Majagua', 'Morón', 'Primero de Enero', 'Venezuela'],
    'Camagüey': ['Camagüey', 'Carlos Manuel de Céspedes', 'Esmeralda', 'Florida', 'Guáimaro', 'Jimaguayú', 'Minas', 'Najasa', 'Nuevitas', 'Santa Cruz del Sur', 'Sibanicú', 'Sierra de Cubitas', 'Vertientes'],
    'Las Tunas': ['Amancio', 'Colombia', 'Jesús Menéndez', 'Jobabo', 'Las Tunas', 'Majibacoa', 'Manatí', 'Puerto Padre'],
    'Holguín': ['Antilla', 'Báguanos', 'Banes', 'Cacocum', 'Calixto García', 'Cueto', 'Frank País', 'Gibara', 'Holguín', 'Mayarí', 'Moa', 'Rafael Freyre', 'Sagua de Tánamo', 'Urbano Noris'],
    'Granma': ['Bartolomé Masó', 'Bayamo', 'Buey Arriba', 'Campechuela', 'Cauto Cristo', 'Guisa', 'Jiguaní', 'Manzanillo', 'Media Luna', 'Niquero', 'Pilón', 'Río Cauto', 'Yara'],
    'Santiago de Cuba': ['Contramaestre', 'Guamá', 'Julio Antonio Mella', 'Palma Soriano', 'San Luis', 'Santiago de Cuba', 'Segundo Frente', 'Songo la Maya', 'Tercer Frente'],
    'Guantánamo': ['Baracoa', 'Caimanera', 'El Salvador', 'Guantánamo', 'Imías', 'Maisí', 'Manuel Tames', 'Niceto Pérez', 'San Antonio del Sur', 'Yateras'],
    'Municipio Especial Isla de la Juventud': ['Municipio Especial Isla de la Juventud']
  };

  const handleMunicipioChange = (e) => {
    const municipioSeleccionado = e.target.value;
    setSelectedMunicipio(municipioSeleccionado);
    onMunicipioChange(municipioSeleccionado);
  };

  useEffect(() => {
    setSelectedMunicipio(initMunicipio || '');
  }, [provinciaSeleccionada,initMunicipio]);

  useEffect(() => {
    // Actualizar valor cuando cambia la provincia
    setSelectedMunicipio(''); // Resetea el municipio seleccionado al cambiar la provincia
  }, [provinciaSeleccionada]);

  return (
    <div className='row'>
      <div className='col-12'>
        <div className='pimg'>
        <img src="/src/assets/prov-municip.png" alt="" /> <label className='form-label txtlabel' htmlFor="municipio">Municipio:</label>
        </div>
        <select required className='selectstyle' id="municipio" value={selectedMunicipio} onChange={handleMunicipioChange}>
          <option value="">Selecciona un municipio</option>
          {municipiosPorProvincia[provinciaSeleccionada]?.map((municipio) => (
            <option key={municipio} value={municipio}>
              {municipio}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

MunicipioSelector.propTypes = {
  onMunicipioChange: PropTypes.func.isRequired,
  provinciaSeleccionada: PropTypes.string.isRequired,
  initMunicipio: PropTypes.string,
};

export default MunicipioSelector;