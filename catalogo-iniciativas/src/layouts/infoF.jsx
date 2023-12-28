/* eslint-disable no-unused-vars */
// Info.jsx
import { useEffect, useState } from "react";
import axios from 'axios';
import '../components/ficha.css';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
const URI = 'http://localhost:3002/iniciativa';

const Info = ({ identificador, iniciativaData }) => {
  const [infoIniciativa, setInfoIniciativa] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (identificador) {
          const response = await axios.get(`${URI}/${identificador}`);
          setInfoIniciativa(response.data);
        } else if (iniciativaData) {
          setInfoIniciativa(iniciativaData);
        }
      } catch (error) {
        // console.error("Error al obtener la información de la iniciativa:", error);
      }
    };

    fetchData();
  }, [identificador, iniciativaData]);

  return (
    <>
      <div className="container continfo">
        <div className="row">
          <div className="col-lg-4 col-xs-12">
            <div className="card-info">
              <div className="paddeeste">
              <div className="divver">
              <img src="/src/assets/persona contacto.png" className="divver" alt="Contactos"/>&nbsp;Contactos
              </div>
              <div className="envolver">
              <div className="color centerdiv">
                <div className="marg">
                Nombre:
                </div>
                <p className="colorpp">
               {infoIniciativa.contacto || iniciativaData.contacto}
                </p>
              </div>
              <div className="centerdiv">
              <img className="cliconcontact" src="/src/assets/telefono.png" alt="Telefono" />
              <p className="colorpp">
              {infoIniciativa.telefonos || iniciativaData.telefonos}
              </p>
              </div>
              <div className="centerdiv">
              <img className="cliconcontact"  src="/src/assets/correo.png" alt="Correo" />
              <p className="colorpp">
              {infoIniciativa.correo || iniciativaData.correo}
              </p>
              </div>
              </div>
              </div>
            </div>
          </div>
        {/* el segundo --------------------- */}
          <div className="col-lg-4 col-xs-12">
            <div className="card-info">
              <div className="paddeeste">
              <div className="divver">
              <img src="/src/assets/direccion.png" className="divver" alt="Contactos"/>&nbsp;Dirección
              </div>
              <div className="envolver">
              <div className="color centerdiv">
                <div className="marg">
                Provincia:
                </div>
                <p className="colorpp">
                {infoIniciativa.nombre_provincia || iniciativaData.nombre_provincia}
                </p>
              </div>
              <div className="centerdiv">
             <div className="color marg">
              Municipio:
             </div>
             <div className="mgdireccin">
             <p className="colorpp">
              {infoIniciativa.nombre_municipio || iniciativaData.nombre_municipio}
              </p>
             </div>
              </div>
              <div className="">
              <p className="colorst">
              {infoIniciativa.direccion || iniciativaData.direccion}
              </p>
              </div>
              </div>
              </div>
            </div>
          </div>
                  {/* el tercero-------------------------- */}
          <div className="col-lg-4 col-xs-12">
            <div className="card-info">
              <div className="paddeeste">
              <div className="divver">
              <img src="/src/assets/redes sociales.png" className="divver" alt="Contactos"/>&nbsp;Redes Sociales
              </div>
              <div className="color centerdiv red">
             <img className="cursorpt redesres" src="/src/assets/feic.png" alt="Redes" />
             <img className="cursorpt redesres" src="/src/assets/x.png" alt="" />
             <img className="cursorpt redesres" src="/src/assets/inst.png" alt="" />
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row centerdiv margin">
        <div className="col-12 centrate color divgalera">
        <img className="iconimgsize" src="/src/assets/img.png" alt="" />
        <p className="fontimgs">Galería de imágenes</p>
        </div>
      </div>
      <div className="row paddes">
        <div className="col-lg-3 pdboton fontimgs">
          <img className="stgaleriaimg" src="/src/assets/placeholderimg.png" alt="" />
        </div>
        <div className="col-lg-3 pdboton">
          <img className="stgaleriaimg" src="/src/assets/placeholderimg.png" alt="" />
        </div>
        <div className="col-lg-3 pdboton">
          <img className="stgaleriaimg" src="/src/assets/placeholderimg.png" alt="" />
        </div>
        <div className="col-lg-3 pdboton">
          <img className="stgaleriaimg" src="/src/assets/placeholderimg.png" alt="" />
        </div>
      </div>
  
      </div>
    </>
  );
};

Info.propTypes = {
  identificador: PropTypes.string,
  iniciativaData: PropTypes.object,
};

export default Info;