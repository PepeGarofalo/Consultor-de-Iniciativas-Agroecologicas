/* eslint-disable no-unused-vars */
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from '../hooks/useFrom';
import { loadIniciativas } from '../helpers/loadIniciativa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useCallback, useEffect, useState } from 'react';
import { LogedUser } from '../../../api/src/saveJwt/saveJWT';
import ProvinciaSelector from '../layouts/provinciaselect';
import MunicipioSelector from '../layouts/municipioselect';
import './methodsCss.css';
const MySwal = withReactContent(Swal);
const URI = 'http://localhost:3002/iniciativa';
// hasta aquiiiisaddddddddddddddddddddddddddddddddddddddddd
const Editiniciativa = () => {
  const navigate = useNavigate();
  const { identificador } = useParams();
  const [nombreIniciativaOriginal, setNombreIniciativaOriginal] = useState("");
  const { formData, handleChange, setFormData } = useForm({
    nombre_iniciativa: "",
    tematica: "",
    propietario: "",
    hectareas: "",
    direccion: "",
    nombre_provincia: "",
    nombre_municipio: "",
    latitud: "",
    longitud: "",
    contacto: "",
    telefonos: "",
    correo: "",
    redes: "",
  });

  const {
    correo,
    latitud,
    longitud,
    contacto,
    direccion,
    hectareas,
    nombre_iniciativa,
    nombre_municipio,
    nombre_provincia,
    propietario,
    redes,
    telefonos,
    tematica,
  } = formData;

  const [existeIniciativa, setExisteIniciativa] = useState(false);

  const setIn = useCallback(async () => {
    try {
      const response = await axios.get(`${URI}/${identificador}`);
      const iniciativaData = response.data;

      if (iniciativaData) {
        setNombreIniciativaOriginal(iniciativaData.nombre_iniciativa);
        setFormData((prevData) => ({
          ...prevData,
          ...iniciativaData,
        }));
      } else {
        // Manejar el caso en que no se encuentra la iniciativa
        console.error("No se encontró la iniciativa");
      }
    } catch (error) {
      // Manejar errores de la petición
      console.error("Error al cargar la iniciativa", error);
    }
  }, [identificador, setFormData]);

  const user = new LogedUser();

  const validateTextOnlyInput = (value, field) => {
    const regex = /^[a-zA-Z \s]+$/; // Acepta solo letras y espacios
    if (regex.test(value) || value === '') {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
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
  const validateCoordinateInput = (value, field) => {
    const regex = /^[0-9.]*$/; // Acepta solo dígitos y comas
    if (regex.test(value) || value === '') {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
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
  const validateCoordinateInputlon = (value, field) => {
    const regex = /^[0-9.-]*$/; // Acepta solo dígitos y comas
    if (regex.test(value) || value === '') {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese un valor válido ejemplo -78.4',
        confirmButtonColor: '#F5A301',
        confirmButtonText: 'Aceptar',
      });
    }
  };
  const validateNumberInput = (value, field) => {
    const regex = /^[0-9,\b]+$/; // Cambiar esta validacion para que deje modificar
    if (regex.test(value) || value === '') {
      handleChange({ target: { name: field, value } });
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

  const validateteleInput = (value, field) => {
    const regex = /^[0-9,+\b]+$/; // Acepta solo dígitos
    if (regex.test(value) || value === '') {
      handleChange({ target: { name: field, value } });
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

  const update = async (e) => {
    e.preventDefault();

    // Validación: Si el nombre de la iniciativa no cambia, continuar con la actualización
    if (formData.nombre_iniciativa === nombreIniciativaOriginal) {
      setExisteIniciativa(false);

      // Utiliza handleChange en lugar de formData directamente
      await axios.put(`${URI}/${identificador}`, formData, {
        headers: {
          Authorization: `Bearer ${user._access_token}`,
        },
      });

      MySwal.fire({
        icon: 'success',
        title: 'Actualización exitosa',
        text: 'La iniciativa se actualizó correctamente.',
        confirmButtonColor: '#F5A301',
        confirmButtonText: 'Aceptar',
      });

      navigate('ShowIniciativa');
      return;
    }

    // Validación: Verificar que no exista una iniciativa con el nuevo nombre
    const iniciativas = await loadIniciativas();
    const iniciativaExistente = iniciativas.data.some((i) => i.nombre_iniciativa === formData.nombre_iniciativa);

    if (iniciativaExistente) {
      setExisteIniciativa(true);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La iniciativa ya existe. Por favor, intente con un nombre diferente.',
        confirmButtonColor: '#F5A301',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    setExisteIniciativa(false);

    // Utiliza handleChange en lugar de formData directamente
    await axios.put(`${URI}/${identificador}`, formData, {
      headers: {
        Authorization: `Bearer ${user._access_token}`,
      },
    });

    MySwal.fire({
      icon: 'success',
      title: 'Actualización exitosa',
      text: 'La iniciativa se actualizó correctamente.',
      confirmButtonColor: '#F5A301',
      confirmButtonText: 'Aceptar',
    });

    navigate('ShowIniciativa');
  };



  useEffect(() => {
    setIn();
  }, [identificador, setIn]);
  return (<>
    <div className="">
      <div className="divalmacen" style={{ backgroundImage: "url('/src/assets/nueva iniciativa foto.png')" }}>
        <div className="container">
          <div className="row padtp">
            <div className="col-6">
              <Link to={'/ShowIniciativa'}><img className='' src="/src/assets/atras.png" alt="Volver" /></Link>
            </div>
            <div className="col-6 text-white fontpar justend">
              <img src="/src/assets/administracion.png" alt="" />&nbsp; Administración
            </div>
          </div>
          <div className="row mrgt">
            <div className="col-2 justend">
              <img src="/src/assets/nueva iniciativa grande.png" alt="hola" />
            </div>
            <div className="col-8 center padintext">
              <p>Inserte la información requerida en cada campo para modificar la iniciativa en el sistema.</p>
            </div>

          </div>

        </div>
      </div>
      <div className="container mgconti">
        <form className="formd" onSubmit={update}>
          <div className="row">
            <p className='colortxt'> </p>
            <div className="col-md-4 mb-3">
              <label htmlFor="" className="form-label txtlabel">
                <img src="/src/assets/nombre.png" alt="" /> Nombre de la Iniciativa
              </label>
              <input
                value={nombre_iniciativa}
                onChange={handleChange}
                name='nombre_iniciativa'
                type="text"
                required
                className={`form-control same-width inptt ${nombre_iniciativa === '' ? 'is-invalid' : 'is-valid'}`}
                placeholder='Inserte el nombre de la iniciativa '
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="" className="form-label txtlabel">
                <img src="/src/assets/tematica.png" alt="" />    Temática
              </label>
              <input
                value={tematica}
                onChange={handleChange}
                name='tematica'
                type="text"
                required
                className={`form-control same-width inptt ${tematica === '' ? 'is-invalid' : 'is-valid'}`}
                placeholder='Inserte el nombre de la temática '
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="" className="form-label txtlabel">
                <img src="/src/assets/propietario.png" alt="" />  Propietario
              </label>
              <input
                value={propietario}
                onChange={handleChange}
                type="text"
                name='propietario'
                className={`form-control same-width inptt ${propietario === '' ? 'is-invalid' : 'is-valid'}`}
                placeholder='Inserte el nombre del propietario'
              />
            </div>
          </div>
          {/* --------------Cierre de row 1 */}

          <div className="row">
            <div className="col-md-4 mb-3">
              <ProvinciaSelector
                onProvinciaChange={(nombre_provincia) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    nombre_provincia,
                    nombre_municipio: '', // Limpiar el municipio al cambiar la provincia
                  }));
                }}
                initProvincia={formData.nombre_provincia}
              />
            </div>


            <div className="col-md-4 mb-3">
              <label htmlFor="" className="form-label txtlabel">
                <img src="/src/assets/direccion.png" alt="" />   Dirección
              </label>
              <input
                value={direccion}
                onChange={handleChange}
                type="text"
                name='direccion'
                required
                className={`form-control same-width inptt ${direccion === '' ? 'is-invalid' : 'is-valid'}`}
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
                  onChange={(e) => validateCoordinateInput(e.target.value, 'latitud')}
                  required
                  type="text"
                  name='latitud'
                  className={`form-control same-width inptt ${latitud === '' ? 'is-invalid' : 'is-valid'}`}
                  placeholder="Latitud"
                />
                <input
                  value={longitud}
                  onChange={(e) => validateCoordinateInputlon(e.target.value, 'longitud')}
                  type="text"
                  name='longitud'
                  required
                  className={`form-control same-width inptt ${longitud === '' ? 'is-invalid' : 'is-valid'}`}
                  placeholder="Longitud"
                />
              </div>
            </div>
          </div>
          {/* cierrreee row2-------------------------------- */}
          <div className="row">

            <div className="col-md-4">
              <MunicipioSelector
                onMunicipioChange={(nombre_municipio) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    nombre_municipio,
                  }));
                }}
                provinciaSeleccionada={formData.nombre_provincia}
                initMunicipio={formData.nombre_municipio}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="" className="form-label txtlabel">
                <img src="/src/assets/hectareas.png" alt="" /> Hectáreas
              </label>
              <input
                value={hectareas}
                onChange={(e) => validateNumberInput(e.target.value, 'hectareas')}
                type="text"
                name='hectareas'
                className="form-control same-width inptt"
                placeholder='Hectáreas '
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="" className="form-label txtlabel">
                <img src="/src/assets/persona contacto.png" alt="" /> Contacto
              </label>
              <input
                value={contacto}
                onChange={(e) => validateTextOnlyInput(e.target.value, 'contacto')}
                type="text"
                name='contacto'
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
                onChange={handleChange}
                name='redes'
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
                onChange={(e) => validateteleInput(e.target.value, 'telefonos')}
                name='telefonos'
                type="text"
                className="form-control same-width inptt"
                placeholder='Inserte el numero de teléfono a contactar'
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="" className="form-label txtlabel">
                <img src="/src/assets/correo.png" alt="" />   Correo
              </label>
              <input
                value={correo}
                onChange={handleChange}
                name='correo'
                type="text"
                className="form-control same-width inptt"
                placeholder='Inserte la direccion de correo electronico'
              />
            </div>

          </div>
          <div className="row">
            <div className="col-md-4 pt-2 justend txtlabel ">
              <img src="/src/assets/imagenes.png" alt="Subir img" /> &nbsp;Imágenes &nbsp;
            </div>
            <div className="col-md-4 mb-3">
              {/* <input type="hidden" name="identificador" value={newIniciativaId} /> */}
              <label htmlFor="" className="form-label inptlabel txtlabel"> </label>
              <input
                type="file"
                name="images"
                accept=".pdf,.doc,.docx,.txt"
                // onChange={handleImageChange}
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

  )

}
export default Editiniciativa;