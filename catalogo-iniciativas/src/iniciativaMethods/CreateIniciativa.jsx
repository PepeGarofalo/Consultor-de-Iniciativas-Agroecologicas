/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './methodsCss.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ProvinciaSelector from '../layouts/provinciaselect';
import MunicipioSelector from '../layouts/municipioselect';

const MySwal = withReactContent(Swal);

const URI = 'http://localhost:3002/iniciativa';
const URI_UPLOAD = 'http://localhost:3002/uploads/upload';
const CreateIniciativa = () => {
  const [iniciativasExistente, setIniciativasExistente] = useState([]);
  const [nombre_iniciativa, setNombreI] = useState('');
  const [tematica, setTematica] = useState('');
  const [propietario, setPropietario] = useState('');
  const [hectareas, setHectareas] = useState('');
  const [direccion, setDireccion] = useState('');
  const [nombre_provincia, setNmobreProivincia] = useState('');
  const [nombre_municipio, setNombreMuncicipio] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [contacto, setContacto] = useState('');
  const [telefonos, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [redes, setRedes] = useState('');
  const [imagenes, setImagn] = useState('');
  const [identificador, setIden] = useState('');
  const [newIniciativaId, setNewIniciativaId] = useState('');
  const [latitudError, setLatitudError] = useState('');
  const [longitudError, setLongitudError] = useState('');
  const [nombreIniciativaError, setNombreIniciativaError] = useState('');
  const [image, setImage] = useState('');
  const [destacada, setDestacada] = useState(false);
  const navigate = useNavigate();

  // Obtener las iniciativas existentes al cargar el componente
  useEffect(() => {
    const fetchIniciativas = async () => {
      const response = await axios.get(URI);
      setIniciativasExistente(response.data);
    };

    fetchIniciativas();
  }, []);

  // Procedimiento para guardar
  const save = async (e) => {
    e.preventDefault();

    // Convertir el nombre ingresado por el usuario a minúsculas
    const nombreIniciativaUsuario = nombre_iniciativa.toLowerCase();

    // Verificar si la iniciativa ya existe en el estado local
    const existeIniciativa = iniciativasExistente.some(
      (iniciativa) => iniciativa.nombre_iniciativa.toLowerCase() === nombreIniciativaUsuario
    );

    if (existeIniciativa) {
      setNombreIniciativaError('Iniciativa ya existente. Intente con un nombre diferente.');
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La iniciativa ya existe. Por favor, intente con un nombre diferente.',
        confirmButtonColor: '#F5A301', 
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    setNombreIniciativaError(''); // Limpiar el mensaje de error si no hay duplicados

    // Continuar con la inserción si no hay duplicados
    const response = await axios.post(URI, {
      identificador,
      nombre_iniciativa,
      tematica,
      propietario,
      hectareas,
      direccion,
      nombre_provincia,
      nombre_municipio,
      latitud,
      longitud,
      contacto,
      telefonos,
      correo,
      redes,
      imagenes,
    });

    // Obtener el ID de la iniciativa recién creada
    const newIniciativaId = response.data.identificador;
    setNewIniciativaId(newIniciativaId);
    console.log('ID de iniciativa:', newIniciativaId);
    // Subir la imagen si está seleccionada
    if (image) {
      const formData = new FormData();
      formData.append('images', image);
      
      try {
     
        formData.append('iniciativaId', newIniciativaId);
        const response = await axios.post(URI_UPLOAD, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Iniciativa ID:', newIniciativaId);
        console.log(response.data);
      } 
      catch (error) {
        console.error(error);
        console.error(error.response.data);
      }
    }
    MySwal.fire({
      icon: 'success',
      title: 'Guardado exitoso',
      text: 'La iniciativa se guardó correctamente.',
      confirmButtonColor: '#F5A301', 
      confirmButtonText: 'Aceptar',
    });
    navigate('/ShowIniciativa');
  };
  const handleDestacadaClick = async () => {
    // Alternar el estado de destacada
    setDestacada(!destacada);

    // Realizar la solicitud al servidor para actualizar el estado en la base de datos
    try {
      await axios.put(`${URI}/toggleDestacada`, { destacada: !destacada });
    } catch (error) {
      console.error('Error al actualizar el estado en la base de datos', error);
    }
  };

  const handleNombreIniciativaChange = (e) => {
    setNombreI(e.target.value);

    // Convertir el nombre a minúsculas y verificar si ya existe en las iniciativas existentes
    const nombreIniciativaUsuario = e.target.value.toLowerCase();
    const existeIniciativa = iniciativasExistente.some(
      (iniciativa) => iniciativa.nombre_iniciativa.toLowerCase() === nombreIniciativaUsuario
    );

    if (existeIniciativa) {
      setNombreIniciativaError('Iniciativa ya existente. Intente con un nombre diferente.');
    } else {
      setNombreIniciativaError('');
    }
  };

  const validateNumberInput = (value, setValue, setError) => {
    const regex = /^[0-9,]*$/; // Acepta solo dígitos y comas
    if (regex.test(value) || value === '') {
      setValue(value);
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese un valor válido ejemplo 2,3',
        confirmButtonColor: '#F5A301', 
        confirmButtonText: 'Aceptar',
      });
    }
  };
  const validateCoordinateLaInput = (value, setValue, setError) => {
    const regex = /^[0-9.]*$/; // Acepta solo dígitos y punto
    if (regex.test(value) || value === '') {
      setValue(value);
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese un valor válido ejemplo 23.4',
        confirmButtonColor: '#F5A301', 
        confirmButtonText: 'Aceptar',
      });
    }
  };
  const validateCoordinateLoInput = (value, setValue, setError) => {
    const regex = /^[0-9.-]*$/; // Acepta solo dígitos y puntos,y el signo menos 
    if (regex.test(value) || value === '') {
      setValue(value);
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese un valor válido ejemplo -79.4',
        confirmButtonColor: '#F5A301', 
        confirmButtonText: 'Aceptar',
      });
    }
  };
    

  const validateteleInput = (value, setValue, setError) => {
    const regex = /^[0-9,+]*$/; // Acepta solo dígitos y comas
    if (regex.test(value) || value === '') {
      setValue(value);
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese un número de teléfono válido',
        confirmButtonColor: '#F5A301', 
        confirmButtonText: 'Aceptar',
      });
    }
  };
  
  const validateTextOnlyInput = (value, setValue, setError) => {
    const regex = /^[a-zA-Z\s]+$/; // Acepta solo letras y espacios
    if (regex.test(value) || value === '') {
      setValue(value);
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese un nombre válido',
        confirmButtonColor: '#F5A301', 
        confirmButtonText: 'Aceptar',
      });
    }
  };


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  // console.log(handleImageChange);
  return (
    <>
    <div className="">
    <div className="divalmacen" style={{ backgroundImage: "url('/src/assets/nueva iniciativa foto.png')" }}>
<div className="container">
<div className="row padtp">
<div className="col-6">
<Link to={'/ShowIniciativa'}><img className='' src="/src/assets/atras.png" alt="Volver" /></Link>
</div>
<div className="col-6 text-white fontpar justend">
<img  src="/src/assets/administracion.png" alt="" />&nbsp; Administración
</div>
</div>
<div className="row mrgt">
  <div className="col-2 justend">
    <img src="/src/assets/nueva iniciativa grande.png" alt="hola" />
  </div>
  <div className="col-8 center padintext">
    <p>Inserte la información requerida en cada campo para añadir una nueva iniciativa al sistema.</p>
  </div>
  {/* <div className={`col-2 center textdest ${destacada ? 'destacada' : ''}`} onClick={handleDestacadaClick}>
      <img
        src={destacada ? "/src/assets/ya destacada.png": "/src/assets/poner destacada.png" }
        alt="Destacada"
      />
      &nbsp; Iniciativa destacada
    </div> */}
 </div>

</div>
    </div>
    <div className="container mgconti"> 
      <form className="formd" onSubmit={save}>
        <div className="row">
        <p className='colortxt'> </p>
          <div className="col-md-4 mb-3">
            <label htmlFor="" className="form-label txtlabel">
          <img src="/src/assets/nombre.png" alt="" />    Nombre de la Iniciativa
            </label>
            <input
              value={nombre_iniciativa}
              onChange={(e) => setNombreI(e.target.value)}
              type="text"
              required
              className={`form-control same-width inptt ${
                nombreIniciativaError ? 'is-invalid' : nombre_iniciativa ? 'is-valid' : 'is-invalid'
              }`}
              placeholder='Inserte el nombre de la iniciativa '
            />
          </div>
          {nombreIniciativaError && <div className="invalid-feedback">{nombreIniciativaError}</div>}
          <div className="col-md-4 mb-3">
            <label htmlFor="" className="form-label txtlabel">
            <img src="/src/assets/tematica.png" alt="" />    Temática 
            </label>
            <input
              value={tematica}
              onChange={(e) => setTematica(e.target.value)}
              type="text"
              required
              className={`form-control same-width inptt ${tematica ? 'is-valid' : 'is-invalid'}`}
              placeholder='Inserte el nombre de la temática '
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="" className="form-label txtlabel">
            <img src="/src/assets/propietario.png" alt="" />  Propietario
            </label>
            <input
              value={propietario}
              onChange={(e) => setPropietario(e.target.value)}
              type="text"
              required
              className={`form-control same-width inptt ${propietario ? 'is-valid' : 'is-invalid'}`}
              placeholder='Inserte el nombre del propietario'
            />
          </div>
          </div>
          {/* --------------Cierre de row 1 */}

          <div className="row">
          <div className="col-md-4">
  <ProvinciaSelector onProvinciaChange={(nombre_provincia) => setNmobreProivincia(nombre_provincia)} />
</div>
          <div className="col-md-4 mb-3">
            <label htmlFor="" className="form-label txtlabel">
            <img src="/src/assets/direccion.png" alt="" />   Dirección
            </label>
            <input
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              type="text"
              required
              className={`form-control same-width inptt ${direccion ? 'is-valid' : 'is-invalid'}`}
              placeholder='Inserte la dirección'
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="" className="form-label txtlabel">
            <img src="/src/assets/latitud longitud.png" alt="" />  Coordenadas
            </label>
            <div className="d-flex">
              <input
                value={latitud}
                onChange={(e) =>   validateCoordinateLaInput(e.target.value, setLatitud, setLatitudError, 'latitud')}
                required
                type="text"
                className={`form-control same-width inptt ${latitud ? 'is-valid' : 'is-invalid'}`}
                placeholder="Latitud"
              />
              <input
                value={longitud}
                onChange={(e) => validateCoordinateLoInput(e.target.value, setLongitud, setLatitudError,'longitud')}
                type="text"
                required
                className={`form-control same-width inptt ${longitud ? 'is-valid' : 'is-invalid'}`}
                placeholder="Longitud"
              />
            </div>
          </div>
          </div>
   {/* cierrreee row2-------------------------------- */}
   <div className="row">
 
<div className="col-md-4">
  <MunicipioSelector
    onMunicipioChange={(nombre_municipio) => setNombreMuncicipio(nombre_municipio)}
    provinciaSeleccionada={nombre_provincia} // Asegúrate de pasar la provincia seleccionada
    initMunicipio={nombre_municipio} // Pasa el municipio inicial si lo tienes
  />
</div>
   <div className="col-md-4 mb-3">  
             <label htmlFor="" className="form-label txtlabel">
             <img src="/src/assets/hectareas.png" alt="" /> Hectáreas 
            </label>
            <input
              value={hectareas}
              onChange={(e) => validateNumberInput(e.target.value,setHectareas)}
              type="text"
              className="form-control same-width inptt"
              placeholder='Inserte la cantidad de hectáreas ejemplo 22,3 '
            /> 
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="" className="form-label txtlabel">
            <img src="/src/assets/persona contacto.png" alt="" /> Contacto
            </label>
            <input
              value={contacto}
              onChange={(e) =>validateTextOnlyInput (e.target.value,setContacto)}
              type="text"
              className="form-control same-width inptt"
              placeholder='Inserte el nombre de la persona a contactar'
            />
          </div>
   </div>
       
    <div className="row">
      
    <div className="col-md-4 mb-3">
            <label htmlFor="" className="form-label txtlabel">
            <img src="/src/assets/redes sociales.png" alt="" /> Redes sociales
            </label>
            <input
              value={redes}
              onChange={(e) =>setRedes(e.target.value)}
              type="text"
              className="form-control same-width inptt"
              placeholder='Inserte las redes sociales de la iniciativa'
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="" className="form-label txtlabel">
            <img src="/src/assets/telefono.png" alt="" />      Teléfono
            </label>
            <input
              value={telefonos}
              onChange={(e) => validateteleInput(e.target.value,setTelefono)}
              type="text"
              className="form-control same-width inptt"
              placeholder='Inserte el número de teléfono a contactar'
            />
          </div>
    
          <div className="col-md-4 mb-3">
            <label htmlFor="" className="form-label txtlabel">
            <img src="/src/assets/correo.png" alt="" />   Correo
            </label>
            <input
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              type="text"
              className="form-control same-width inptt"
              placeholder='Inserte la dirección de correo electrónico'
            />
          </div>

    </div>
    <div className="row">
      <div className="col-md-4 pt-2 justend txtlabel ">
      <img src="/src/assets/imagenes.png" alt="Subir img" /> &nbsp;Imágenes &nbsp;
      </div>
    <div className="col-md-4 mb-3">
    <input type="hidden" name="identificador" value={newIniciativaId} />
     <label htmlFor="" className="form-label inptlabel txtlabel"> </label>
      <input
        type="file"
        name="images"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleImageChange}
        className="form-control same-width inptt input-file"
      />
    </div>
  </div>
        <div className="row">
          <div className="col-md-4 d-flex justify-content-center mrg ">
            <button type="submit" className=" btn btnst">
              Guardar
            </button>
          </div>
        </div>
      </form>

    </div>
    </div>
  
    <footer>
        <div className='foot'>

        </div>
    </footer>
    </>
  );
};

export default CreateIniciativa;

 