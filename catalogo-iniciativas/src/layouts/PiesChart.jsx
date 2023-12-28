/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

export function IniciativasPorProvinciaPie({ setProvinciaSeleccionada }) {
  const [iniciativasPorProvincia, setIniciativasPorProvincia] = useState({});

  useEffect(() => {
    const URI = 'http://localhost:3002/iniciativa';

    axios.get(URI)
      .then((response) => {
        const groupedByProvincia = response.data.reduce((acc, iniciativa) => {
          const provincia = iniciativa.nombre_provincia.trim();
          acc[provincia] = acc[provincia] || { total: 0, destacadas: 0 };
          acc[provincia].total += 1;
          if (iniciativa.destacada) {
            acc[provincia].destacadas += 1;
          }
          return acc;
        }, {});

        setIniciativasPorProvincia(groupedByProvincia);
      })
      .catch((error) => {
        console.error("Error al obtener iniciativas por provincia:", error);
      });
  }, []);

  const provincias = Object.keys(iniciativasPorProvincia);
  const datosProvincias = Object.values(iniciativasPorProvincia);
  const cantidades = datosProvincias.map(detalles => detalles.total);

  const data = {
    labels: provincias,
    datasets: [
      {
        label: 'Cantidad de Iniciativas por Provincia',
        data: cantidades,
        backgroundColor: [
          'rgba(154, 212, 218, 0.8)',
          'rgba(245, 163, 1,0.8)',
          'rgba(127, 115,233,0.8)',
          'rgba(255, 151, 220,0.8)',
          'rgba(241,209,0,0.8)',
          'rgba(6, 84, 60,0.8)',
          'rgba(114,28, 139,0.8)',
          'rgba(225, 107,107,0.8)',
          'rgba(182,0,0,0.8)',
          'rgba(0, 44, 148,0.8)',
          'rgba(196,102, 224,0.8)',
          'rgba(70, 150, 127,0.8)',
          'rgba(102, 54,38,0.8)',
          'rgba(72, 180,252,0.8)',
          'rgba(199, 106,0,0.8)',
          'rgba(255,58,91,0.8)',
        ],
        borderColor: [
          'rgba(154, 212, 218, 2)',
          'rgba(245, 163, 1, 2)',
          'rgba(127, 115,233, 2)',
          'rgba(255, 151, 220, 2)',
          'rgba(241,209,0, 2)',
          'rgba(6, 84, 60, 2)',
          'rgba(114,28, 139, 2)',
          'rgba(225, 107,107, 2)',
          'rgba(182,0,0, 2)',
          'rgba(0, 44, 148,2)',
          'rgba(196,102, 224,2)',
          'rgba(70, 150, 127,2)',
          'rgba(102, 54,38,2)',
          'rgba(72, 180,252,2)',
          'rgba(199, 106,0,2)',
          'rgba(255,58,91, 2)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const provincia = context.label;
            const detallesProvincia = iniciativasPorProvincia[provincia] || { total: 0, destacadas: 0 };
            const cantidadTotal = detallesProvincia.total;
            const cantidadDestacadas = detallesProvincia.destacadas;
            const porcentajeDestacadas = cantidadTotal > 0 ? ((cantidadDestacadas / cantidadTotal) * 100).toFixed(2) : 0;
            return `Iniciativas Agroecológicas: ${cantidadTotal}, Destacadas: ${cantidadDestacadas} Representan un ${porcentajeDestacadas} % del total`;
          },
        },
      },
    },
    // Puedes ajustar las opciones del gráfico según tus necesidades
  };

  return (
    <div>
      <div className='texttotalgraf'>Total de Iniciativas Agroecológicas en el país: {cantidades.reduce((acc, curr) => acc + curr, 0)}</div>
      <Pie data={data} options={options} />
    </div>
  );
}

IniciativasPorProvinciaPie.propTypes = {
  setProvinciaSeleccionada: PropTypes.func.isRequired,
};
