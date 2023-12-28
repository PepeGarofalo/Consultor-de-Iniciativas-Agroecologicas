/* eslint-disable no-unused-vars */
import React from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import './mapa.css';
import Aside from '../layouts/aside';
import AsideResponsive from '../layouts/AsideResp';
import SearchBar from '../layouts/searchBar';

const Mapa = () => {
  // Usa el hook useMediaQuery para detectar si la pantalla es menor a 991 píxeles
  const isSmallScreen = useMediaQuery('(max-width: 991px)');

  return (
    <>
      <SearchBar />

      {/* Decide qué componente mostrar según el tamaño de la pantalla */}
      {isSmallScreen ? (
        <AsideResponsive />
      ) : (
        <div>
          <div className="row">
            <div className="indice col" id='sect'>
              <Aside />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Mapa;