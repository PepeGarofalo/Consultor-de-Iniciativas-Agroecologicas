/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchIniciativas = async () => {
      try {
        const response = await axios.get('http://localhost:3002/iniciativa');
        const iniciativas = response.data;
        if (searchTerm) {
          const filtered = iniciativas.filter((iniciativa) =>
            iniciativa.nombre_iniciativa.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredResults(filtered.slice(0, 5));
        } else {
          setFilteredResults([]);
        }
      } catch (error) {
        console.error('Error al obtener la lista de iniciativas:', error);
      }
    };

    fetchIniciativas();
  }, [searchTerm]);
  const handleResultClick = (iniciativa) => {
  };

  return (
    <div className='bglinera'>
      <div className='dactive centrado'>
        <input
          className="lgs"
          type="text"
          placeholder="   Buscador"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
 <img src="/src/assets/busc.png" className="iconlg mgicon lgsi" alt="Icon Search" />
      </div>

      {/* Resultados de búsqueda */}
      {filteredResults.length > 0 && (
        <div className="search-results positionsearchficha">
          <ul className='searcnavbar '>
            {filteredResults.map((iniciativa) => (
              <li className='serachresult' key={iniciativa.identificador} onClick={() => handleResultClick(iniciativa)}>
                <img className="imglist" src="/src/assets/icon.png" alt="Icono"/>
                <Link className='serachresult' to={`/ficha/${iniciativa.identificador}`}>
                  {iniciativa.nombre_iniciativa}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
