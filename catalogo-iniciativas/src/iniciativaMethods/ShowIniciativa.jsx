/* eslint-disable no-unused-vars */
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { loadIniciativas } from '../helpers/loadIniciativa';
import { LogedUser } from '../../../api/src/saveJwt/saveJWT';
import imagenExportar from '../assets/exportar excel.png';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { exportToXLSX } from '../helpers/exportExcel';
import './methodsCss.css';

const MySwal = withReactContent(Swal);
const URI = 'http://localhost:3002/iniciativa';

const CompShowIniciativa = () => {
  const [iniciativas, setIniciativas] = useState([]);
  const [filteredIniciativas, setFilterIniciativas] = useState([]);
  const [search, setSearch] = useState('');

  const refreshInit = async () => {
    const r = await loadIniciativas();
    setIniciativas(r.data);
    setFilterIniciativas(r.data);
  };

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const user = new LogedUser();
  
  const toggleDestacada = async (identificador) => {
    try {
      await axios.put(`${URI}/${identificador}/toggleDestacada`, null, {
        headers: {
          Authorization: `Bearer ${user._access_token}`,
        },
      });
      // Actualizar el estado local para reflejar el cambio
      setIniciativas((prevIniciativas) =>
        prevIniciativas.map((iniciativa) =>
          iniciativa.identificador === identificador
            ? { ...iniciativa, destacada: !iniciativa.destacada }
            : iniciativa
        )
      );
      if (!iniciativas.find((iniciativa) => iniciativa.identificador === identificador).destacada) {
        MySwal.fire({
          title: 'Correcto',
          text: 'Añadida a destacada.',
          icon: 'success',
          confirmButtonColor: '#F5A301',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error("Error toggling destacada:", error);
    }
  };

  const deleteIniciativa = async (identificador) => {
    try {
      await axios.delete(`${URI}/${identificador}/`, {
        headers: {
          Authorization: `Bearer ${user._access_token}`,
        },
      });
      // Actualizar el estado local para reflejar el cambio
      setIniciativas((prevIniciativas) =>
        prevIniciativas.filter((iniciativa) => iniciativa.identificador !== identificador)
      );
      MySwal.fire({
        title: 'Eliminado',
        text: 'La iniciativa ha sido eliminada correctamente.',
        icon: 'success',
        confirmButtonColor: '#F5A301', 
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      console.error("Error deleting iniciativa:", error);
    }
  };
  const handleExportToXLSX = () => {
    exportToXLSX(iniciativas);
  };

  const confirmDeleteIniciativa = (identificador) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la iniciativa de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F5A301',
      cancelButtonColor: '#46967F',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Usuario hizo clic en "Sí, eliminar"
        deleteIniciativa(identificador);
      }
    });
  };

  useEffect(() => {
    refreshInit();
  }, []);

  useEffect(() => {
    const regExp = new RegExp(search, 'i');

    const filterInitciativas = iniciativas.filter((iniciativa) => {
      return (
        regExp.test(iniciativa.nombre_iniciativa) ||
        regExp.test(iniciativa.nombre_municipio) ||
        regExp.test(iniciativa.nombre_provincia)
      );
    });

    setFilterIniciativas(() => {
      if (search === '') {
        return iniciativas;
      }
      return filterInitciativas.length === 0 ? iniciativas : filterInitciativas;
    });
  }, [search, iniciativas, filteredIniciativas]);

  return (
    <div className="container-fluid over">
      <div className="row d-flex clnon align-items-center barrafija">
        <div className="col-1 justend">
          <Link to={"/"}>
            <img className='' src="/src/assets/back.png" title='Volver al Inicio' alt="Volver" />
          </Link>
        </div>
        <div className="col-1 justend">
          <img className='iconnavsts' src="/src/assets/logoCatalogo.png" alt="" />
        </div>
        <div className="col-6">
          <input
            value={search}
            type="text"
            placeholder='   Buscar iniciativas'
            className='outline-indigo-700 inptbuscador'
            onChange={searcher}
          />
        </div>
        <div className="col-1 justend">
                <img className='iconnavst' onClick={handleExportToXLSX}  src={imagenExportar} alt="Exportar a Excel" title='Exportar a Excel.' />
        </div>
        <div className="col-1">
          <Link to="/CreateIniciativa" className='text-light text-center mt-2 mb-2'>
            <img className='iconnavst' src="/src/assets/nieva iniciativa.png" alt="" title='Insertar una nueva iniciativa.' />
          </Link>
        </div>
        <div className="col-2 txtcolortd ftsdm">
          <img className='iconnavsta' src="/src/assets/ADM.png" alt="admin" title='' /> &nbsp; Administración
        </div>
        <div></div>
      </div>
      <div className="">
        <table className="table mgtablaAd" id='tablaIniciativa'>
          <thead className="">
            <tr className='texthedert'>
              <th>Acciones</th>
              <th className='text-nowrap '>Nombre de la Iniciativa</th>
              <th>Temática</th>
              <th>Propietario</th>
              <th>Hectáreas</th>
              <th>Dirección</th>
              <th>Provincia</th>
              <th>Municipio</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Redes</th>
            </tr>
          </thead>
          <tbody>
            {filteredIniciativas.map((iniciativa) => (
              <tr key={iniciativa.identificador} className='txtcolortd'>
                <td className=''>
                  <div className='borderaccion'>
                    <div className='padtn'>
                      <img
                        className='cursorpt sizeicon'
                        src={iniciativa.destacada ? "/src/assets/ya destacada.png" :"/src/assets/poner destacada.png"  }
                        alt=""
                        title='Destacada'
                        onClick={() => toggleDestacada(iniciativa.identificador)}
                      />
                    </div>
                    <div className='padtn'>
                      <Link to={`/EditIniciativa/${iniciativa.identificador}`} className='padtn'>
                        <img
                          className="imgtable stylebtntable sizeicon"
                          src="/src/assets/editar.png"
                          alt="Editar"
                          title='Modificar iniciativa'
                        />
                      </Link>
                    </div>
                    <div className='padtn'>
                      <img
                        className='stylebtntable sizeicon'
                        onClick={() => confirmDeleteIniciativa(iniciativa.identificador)}
                        src="/src/assets/eliminar.png"
                        alt=""
                        title='Eliminar iniciativa'
                      />
                    </div>
                  </div>
                </td>
                <td>{iniciativa.nombre_iniciativa}</td>
                <td>{iniciativa.tematica}</td>
                <td>{iniciativa.propietario}</td>
                <td>{iniciativa.hectareas}</td>
                <td>{iniciativa.direccion}</td>
                <td>{iniciativa.nombre_provincia}</td>
                <td>{iniciativa.nombre_municipio}</td>
                <td>{iniciativa.latitud}</td>
                <td>{iniciativa.longitud}</td>
                <td>{iniciativa.contacto}</td>
                <td>{iniciativa.telefonos}</td>
                <td>{iniciativa.correo}</td>
                <td>{iniciativa.redes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompShowIniciativa;
