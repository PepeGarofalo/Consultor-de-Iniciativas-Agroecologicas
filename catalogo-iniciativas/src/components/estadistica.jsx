/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './estadistica.css';
import { IniciativasPorProvinciaPie } from '../layouts/PiesChart';
import IniciativasPorMunicipioBar from '../layouts/PiesChartMun';
import SearchBar from '../layouts/searchBar';
import axios from 'axios';

export const Estadistica = () => {
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');
    const [provincias, setProvincias] = useState([]);

    useEffect(() => {
        const URI = 'http://localhost:3002/iniciativa';

        axios.get(URI)
            .then((response) => {
                const provinciasUnicas = Array.from(new Set(response.data.map((iniciativa) => iniciativa.nombre_provincia.trim())));
                setProvincias(provinciasUnicas);
            })
            .catch((error) => {
                console.error("Error al obtener provincias:", error);
            });
    }, []);

    return (
        <>    
         <SearchBar/>
        <div className="container">
            <div className="row margintpdiagram">
                <div className="col-lg-6">
                    <h1 className='texttosstyles'>
                        Cantidad de Iniciativas Agroecológicas por provincia
                    </h1>
                    <div className=''>
                        <IniciativasPorProvinciaPie setProvinciaSeleccionada={setProvinciaSeleccionada} />
                    </div>
                </div>
                <div className="col-lg-6">
                    <h1 className='texttosstyles'>
                        Cantidad de Iniciativas Agroecológicas por municipios
                    </h1>
                    <div className='pdbottomc'>
                        <select className='selectgraf' value={provinciaSeleccionada} onChange={(e) => setProvinciaSeleccionada(e.target.value)}>
                            <option value="" disabled>Selecciona una provincia</option>
                            {provincias.map((provincia) => (
                                <option key={provincia} value={provincia}>{provincia}</option>
                            ))}
                        </select>
                    </div>

                    <div className='despega'>
                        <IniciativasPorMunicipioBar provinciaSeleccionada={provinciaSeleccionada} />
                    </div>
                </div>
            </div>
        </div>
        <div className='footerhome'>
      </div>
        </>
   
    );
};

export default Estadistica;
