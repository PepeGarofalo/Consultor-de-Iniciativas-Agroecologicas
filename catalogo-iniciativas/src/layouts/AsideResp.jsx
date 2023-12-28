// AsideResponsive.jsx
import React, { useState, useEffect } from "react";
import { exportToXLSX } from "../helpers/exportExcel";
import { Link } from "react-router-dom";
import axios from 'axios';
import '../layouts/asideResponsive.css';
import { Map } from "./map";  

const URI = 'http://localhost:3002/iniciativa';

const AsideResponsive = () => {
  const [allIniciativas, setAllIniciativas] = useState([]);
  const [iniciativasPorProvincia, setIniciativasPorProvincia] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    axios.get(URI)
      .then((response) => {
        setAllIniciativas(response.data);
        const groupedByProvincia = response.data.reduce((acc, iniciativa) => {
          const provincia = iniciativa.nombre_provincia.trim();
          acc[provincia] = (acc[provincia] || []);
          acc[provincia].push({
            identificador: iniciativa.identificador,
            nombre: iniciativa.nombre_iniciativa.trim(),
            tematica: iniciativa.tematica.trim(),
          });
          return acc;
        }, {});

        setIniciativasPorProvincia(groupedByProvincia);
      })
      .catch((error) => {
        console.error("Error al obtener todas las iniciativas:", error);
      });
  }, []);

  const handleExportToXLSX = () => {
    exportToXLSX(allIniciativas);
  };

  const handleProvinceClick = (provincia) => {
    setSelectedProvince(selectedProvince === provincia ? null : provincia);
  };

  const handleCloseButtonClick = () => {
    setSelectedProvince(null);
  };

  const handleToggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="">
      <div className="">
        {showMap ? (
          <>
            <div className="emp txth1 paddingfull">
              Total de iniciativas: {allIniciativas.length}
            </div>
            <div className="">
              <div>
                {Object.entries(iniciativasPorProvincia).map(([provincia, detalles], index) => (
                  <React.Fragment key={index}>
                    <div className="emp d-flex">
                      <button
                        onClick={() => handleProvinceClick(provincia)}
                        className={`elimistbuton personalice ${selectedProvince === provincia ? '' : ''}`}
                      >
                        {provincia}
                      </button>
                      <div className="marginnega">
                        <div className={`personalice   ${selectedProvince === provincia ? '' : ''}`}>
                          {detalles.length}
                        </div>
                      </div>
                    </div>
                    {selectedProvince === provincia && (
                      <div className="">
                        <ul className="">
                          <div className="vete" onClick={handleCloseButtonClick}>
                            <img src="/src/assets/closet.png" alt="cerrar" />
                          </div>
                          {detalles.map((detalle, index) => (
                            <React.Fragment key={index}>
                              <div className="tarjeta">
                                <li className="lnone">
                                  <Link className="txtdnone" to={`/ficha/${detalle.identificador}`}>
                                    {detalle.nombre}
                                  </Link>
                                </li>
                                <li className="txtlist"> {detalle.tematica}</li>
                              </div>
                            </React.Fragment>
                          ))}
                        </ul>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className='texex'>
              <img className="icoap" onClick={handleExportToXLSX} src="/src/assets/exportar excel.png" alt="" title="Exportar a Excel" /> 
              <div className="pe">
                Exportar tabla en Excel
              </div>
            </div>
          </>
        ) : (
          <Map />
        )}
      </div>

      <div className={showMap ? "vertical-center " : "corn"}>
        <div className="corner">
          <img className="btncolres" role="button" src={showMap ? "/src/assets/abreres.png " : "/src/assets/cerrares.png"} alt="Boton Colapse" onClick={handleToggleMap} />
        </div>
      </div>
    </div>
  );
};

export default AsideResponsive;
