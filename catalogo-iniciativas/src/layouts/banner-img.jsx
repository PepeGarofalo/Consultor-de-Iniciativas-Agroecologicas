/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import axios from 'axios';
import Info from './infoF';
import { useParams } from 'react-router-dom';
import '../components/ficha.css';
import PropTypes from 'prop-types';
import SearchBar from "./searchBar";
import { Link } from 'react-scroll';
import Element from "react-scroll";
import '../components/ficha.css'
const URI = 'http://localhost:3002/iniciativa';

export const Ban = ({ iniciativa }) => {
  const { identificador } = useParams();
  const [iniciativaData, setIniciativaData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (iniciativa) {
          setIniciativaData(iniciativa);
        } else if (identificador) {
          const response = await axios.get(`${URI}/${identificador}`);
          setIniciativaData(response.data);
        }
      } catch (error) {
        console.error("Error al obtener los datos de la iniciativa:", error);
      }
    };

    fetchData();
  }, [identificador, iniciativa]);

  return (
    <>
      <SearchBar />
      <div className='cesped' style={{ backgroundImage: `url("/src/assets/foto ficha.png")` }}></div>
      <div className="container">
        <div className="row centrate rowup">
          <div className="col-4">
            <img className="casares" src="/src/assets/lacasita.png" alt="Logo Ficha" />
          </div>
          <div className="col-8 textoficha">
            <p className="padup" style={{ whiteSpace: 'nowrap' }}>
              FICHA TÉCNICA
            </p>
          </div>
        </div>
        {iniciativaData.destacada && (
          <div className="row">
            <div className="col-12 fi tpoi">
              <img className="estrella" src="/src/assets/destaca.svg" alt="Destacada" />
              <p className="yelou">Destacada</p>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xsm-12">
            <div>
              <h2 className="nameini">
                Nombre de la Iniciativa
              </h2>
              <h3 className="namereal">
                {iniciativaData.nombre_iniciativa}
              </h3>
            </div>
            <div className="txtkonw dsnohay">
              <Link to="infoSection" smooth={true} duration={500}>
                <img src="/src/assets/knowmore.jpg" className='cursorpt' alt="conocer mas" />
              </Link> &nbsp;Conocer más
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 col-xsm-12 ender palmedio">
            <div className="tematicaficha nameini">
              <div className="padbcomponente">
                <img className="iconsresp" src="/src/assets/bombillo.png" alt="img Temática" /> Temática
              </div>
              <div className="pdtextinside">
                <p className="txttematica">{iniciativaData.tematica}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <Element name="infoSection" className="element">
          {identificador && <Info identificador={identificador} />}
        </Element> */}
      {identificador && <Info identificador={identificador.toString()} iniciativaData={iniciativaData} />}
{!identificador && iniciativa && iniciativa.identificador && <Info identificador={iniciativa.identificador.toString()} iniciativaData={iniciativa} />}

      </div>
      <div className='footerinfo'>
        z
      </div>
    </>
  );
};

Ban.propTypes = {
  iniciativa: PropTypes.object,
};

export default Ban;
