// Aside.js
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { exportToXLSX } from "../helpers/exportExcel";
import { Link } from "react-router-dom";
import { Map } from "./map";
// holaaaaaaaaaaaaaaaaaaaaaaa
const URI = 'http://localhost:3002/iniciativa';

const Aside = () => {
  const [allIniciativas, setAllIniciativas] = useState([]);
  const [iniciativasPorProvincia, setIniciativasPorProvincia] = useState([]);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
  const [detallesProvincia, setDetallesProvincia] = useState([]);
  const [menuDesplegado, setMenuDesplegado] = useState(true);

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

        // Por defecto, selecciona la primera provincia y carga sus detalles
        const primerProvincia = Object.keys(groupedByProvincia)[0];
        setProvinciaSeleccionada(primerProvincia);
        setDetallesProvincia(groupedByProvincia[primerProvincia]);
      })
      .catch((error) => {
        console.error("Error al obtener todas las iniciativas:", error);
      });
  }, []);

  const handleExportToXLSX = () => {
    exportToXLSX(allIniciativas);
  };

  const toggleMenu = (provincia) => {
    if (menuDesplegado && provincia === provinciaSeleccionada) {
      setMenuDesplegado(false);
      setProvinciaSeleccionada(null);
      setDetallesProvincia([]);
    } else {
      setProvinciaSeleccionada(provincia);
      setMenuDesplegado(true);

      const detalles = iniciativasPorProvincia[provincia] || [];
      setDetallesProvincia(detalles);
    }
  };

  const handleBotonColapseClick = () => {
    setMenuDesplegado(!menuDesplegado);
  };

  return (
    <div className="">
      <div className="row">
        <div className={`col-lg-3 col-md-6 col-sm-12 ${menuDesplegado ? "" : "d-none"}`}>
          <div className="base shadowdiv">
            <div className="center txth1">
              Total de iniciativas: {allIniciativas.length}
            </div>
            <div className="center">
              <div>
                {Object.entries(iniciativasPorProvincia).map(([provincia, detalles], index) => (
                  <React.Fragment key={index}>
                    <div className="center" onClick={() => toggleMenu(provincia)}>
                      <div className={`end ${menuDesplegado && provincia === provinciaSeleccionada ? 'bgtd divsi' : 'fontcolor'}`}>
                        {provincia}
                      </div>
                      <div className={`end ${menuDesplegado && provincia === provinciaSeleccionada ? 'bgtd1' : 'fontcolor'}`}>
                        {detalles.length}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className='btnVt'>
              <img className="iconexcelmap" onClick={handleExportToXLSX} src="/src/assets/exportar excel.png" alt="Exportar a Excel" title="Exportar a Excel" />  &nbsp;Exportar tabla en Excel
            </div>
          </div>
        </div>
        <div className={`col-lg-4 col-md-6 col-sm-12 col-xsm-12 ${menuDesplegado ? "col-3" : "d-none"}`}>
          {/* Ajustar la clase dinámica para el tamaño del mapa */}
          {menuDesplegado && (
            <div className="menuDesplegadoContent">
              <div className="end padb d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src="/src/assets/pat.png" alt="hola" />
                  &nbsp;&nbsp;&nbsp; <strong className="strg" style={{ whiteSpace: 'nowrap' }}>{provinciaSeleccionada}</strong>
                </div>
                {/* <img onClick={() => setMenuDesplegado(false)} className="closeButton stbclose padim" src="/src/assets/closeorange.png" alt="" /> */}
              </div>
              <div>
                <ul className="scrollableList">
                  {detallesProvincia.map((detalle, index) => (
                    <React.Fragment key={index}>
                      <div className="tarjeta">
                        <li className="lnone">
                        <Link className="txtdnone" to={`/ficha/${detalle.identificador}`}>{detalle.nombre}</Link>
                        </li>
                        <li className="txtlist"> {detalle.tematica}</li>
                      </div>
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className={`mgmapa col-5 ${menuDesplegado ? "col-3" : "col-12"}`}>
          <Map></Map>
        </div>
        <div className={menuDesplegado ? "botonColapse" : "botonColapseall"} onClick={handleBotonColapseClick}>
          <img role="button" src={menuDesplegado ? " /src/assets/cerrar.png" : "/src/assets/abrir.png"} alt="Boton Colapse" />
        </div>
      </div>
    </div>
  );
};

export default Aside;
