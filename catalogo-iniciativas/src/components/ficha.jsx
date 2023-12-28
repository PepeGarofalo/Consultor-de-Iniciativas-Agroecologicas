import { useEffect, useState } from 'react';
import Ban from '../layouts/banner-img';
import Info from '../layouts/infoF';
import './ficha.css';
import { useParams } from 'react-router-dom';
import { Element } from 'react-scroll';
import axios from 'axios';

const URI = 'http://localhost:3002/iniciativa';

const Ficha = () => {
  const { identificador } = useParams();
  const [iniciativaAleatoria, setIniciativaAleatoria] = useState(null);
  const [iniciativas, setIniciativas] = useState([]);

  useEffect(() => {
    const fetchIniciativas = async () => {
      try {
        const response = await axios.get(URI);
        setIniciativas(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de iniciativas:', error);
      }
    };

    fetchIniciativas();
  }, []);

  useEffect(() => {
    if (!identificador && iniciativas.length > 0) {
      const iniciativaRandom = iniciativas[Math.floor(Math.random() * iniciativas.length)];
      setIniciativaAleatoria(iniciativaRandom);
    }
  }, [identificador, iniciativas]);

  return (
    <>
     {iniciativaAleatoria && !identificador && (
      <Ban iniciativa={iniciativaAleatoria} />
    )}

    {identificador && (
      <Element name="infoSection" className="element">
        <Info identificador={identificador.toString()} />
      </Element>
    )}
    </>
  );
};

export default Ficha;
