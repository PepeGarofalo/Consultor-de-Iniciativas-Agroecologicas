/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import '../components/home.css';
import { Link } from 'react-router-dom';
const Card = ({ iniciativas }) => {
  // Filtra iniciativas destacadas
  const destacadas = iniciativas.filter((iniciativa) => iniciativa.destacada);

  // Verifica si hay al menos tres iniciativas destacadas
  if (destacadas.length < 3) {
    return null; // No hay suficientes iniciativas destacadas
  }

  // Selecciona tres iniciativas aleatorias entre las destacadas
  const iniciativasAleatorias = destacadas
    .sort(() => Math.random() - 0.5) // Ordena aleatoriamente
    .slice(0, 3); // Toma las primeras tres

  return (
    <div className="row">
      {iniciativasAleatorias.map((iniciativa) => (
        <div key={iniciativa.identificador} className="col-lg-4">
          <div className="card cardstyle">
            <img src="/src/assets/señor.jpg" className="styleimgcard" alt="Imagen Destacada" />
            <div className="card-body">
              <p className="card-title subti">Nombre iniciativa:</p>
              <p className="colorfontcard">{iniciativa.nombre_iniciativa}</p>
              <div className='center'>
                <Link to={`/ficha/${iniciativa.identificador}`} className="btn stbtnfichacrad center">
                  Ficha Técnica
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Card.propTypes = {
  iniciativas: PropTypes.array.isRequired,
};

export default Card;
