import '../layouts/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/mapa.css';


const URI = 'http://localhost:3002/iniciativa';

export const Map = () => {
  const newIcon = L.icon({
    iconUrl: '/src/assets/located.svg',
    iconSize: [40, 40],
  });

  const iconDes = L.icon({
    iconUrl: '/src/assets/mapa destacadas.svg',
    iconSize: [40, 40],
  });

  const [iniciativas, setInitiatives] = useState([]);

  useEffect(() => {
    axios.get(URI).then((response) => {
      setInitiatives(response.data);
    });
  }, []);

  return (
    <div className="map-container">
      {/* Leyenda */}
      <div className="leyenda d-flex">
        <div className='iconleyenda'>
        <img className='leyendaicon'  src="/src/assets/located.svg" alt="Icono 1" /> Iniciativa Agroecológica
        </div>
    <div className='iconleyenda1'>
    <img className='leyendaicon1'  src="/src/assets/mapa destacadas.svg" alt="Icono 2" /> Iniciativa Agroecológica Destacada
    </div>
       
      </div>

      {/* Mapa */}
      <MapContainer className='mapa' center={[22.41667, -83.69667]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {iniciativas.map((iniciativa, index) => {
          const lat = parseFloat(iniciativa.latitud);
          const lng = parseFloat(iniciativa.longitud);

          if (!isNaN(lat) && !isNaN(lng)) {
            return (
              <Marker
                key={index}
                position={[lat, lng]}
                icon={iniciativa.destacada ? iconDes : newIcon}
              >
                <Popup>
                  <Link className="txtdnone" to={`/ficha/${iniciativa.identificador}`}>
                    {iniciativa.nombre_iniciativa}
                  </Link>
                  <p className='coloresmap'>{iniciativa.tematica}</p>
                </Popup>
              </Marker>
            );
          }

          return null;
        })}
      </MapContainer>
    </div>
  );
};
