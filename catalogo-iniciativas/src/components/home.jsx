/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import './home.css';
import Pilares from '../layouts/pilares';
import Card from '../layouts/card';
import axios from 'axios';
import SearchBar from '../layouts/searchBar';
const URI = 'http://localhost:3002/iniciativa';

const Home = () => {
  const pilaresRef = useRef(null);

  const scrollToPilares = () => {
    if (pilaresRef.current) {
      window.scrollTo({
        top: pilaresRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const [iniciativas, setIniciativas] = useState([]);

  useEffect(() => {
    // Realiza una solicitud Axios para obtener la información de iniciativas
    axios.get(`${URI}`)
      .then((response) => {
        setIniciativas(response.data); // Establece las iniciativas en el estado
      })
      .catch((error) => {
        console.error("Error al obtener las iniciativas:", error);
      });
  }, []);

  return (
    < >
    <SearchBar/>
      <div className='contimg andale' style={{ backgroundImage: `url("/src/assets/1.svg")` }}>
        {/* Agrega el contenido sobre la imagen */}
        <div className="container">
          <div className="row">
            <div className="col-12 mgcont">
              <img className='sizehomelogo' src="/src/assets/consultor blanco.png" alt="" />
            </div>
          </div>
          <div className="row mgcont1">
            <div className="col-12">
              <p className='texted'>
                AGROECOLOGÍA
              </p>
            </div>
          </div>
          <div className="row mgcont2">
            <div className="col-12">
              <p className='texted2'>
                ¿Qué es?
              </p>
            </div>
          </div>
          <div className="row mgcont3">
            <div className="col-8">
              <h2 className='textconcept'>
                La agroecología es una disciplina que promueve prácticas agrícolas sostenibles, armonizando la agricultura con el entorno natural.
              </h2>
            </div>
          </div>
          <div className="row mgcont4">
            <div className="col-3 scrollbtn" onClick={scrollToPilares}   style={{ whiteSpace: 'nowrap' }}>
              <img src="/src/assets/scroll.png" className='scroll' alt="jejej" /> &nbsp; Conocer más
            </div>
          </div>
        </div>
      </div>
      <Pilares ref={pilaresRef} />
      <div className="container">
        <div className="row">
            <Card iniciativas={iniciativas} />
        </div>
      </div>
      <div className='footerhome'>
      </div>
    </>
  );
};

export default Home;
