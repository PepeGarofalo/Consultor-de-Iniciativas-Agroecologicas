/* eslint-disable no-unused-vars */
import React from 'react';
import './login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { LogedUser } from '../../../api/src/saveJwt/saveJWT';

const URI = 'http://localhost:3002/auth';

const Login = () => {
  const navigate = useNavigate();

  const login = async (e) => {
    try {
      e.preventDefault();
      const data = new FormData(e.target);
      const username = data.get('username');
      const password = data.get('password');

      const d = { username, password };

      const resp = await axios.post(URI, d);
      if (resp.data?.access_token) {
        const user = new LogedUser(resp.data?.access_token);
   
        return navigate('/ShowIniciativa', { replace: true });
      }
    } catch (error) {
      alert('Credenciales Incorrectas');
    }
  };

  return (
    <div className="row d-flex">
      <div className="col-lg-4 containform">
        <div className="margincont">
          <form onSubmit={login}>
            <div className="center pasing">
              <img className="medidaslogo" src="/src/assets/consultorcolor.png" alt="" />
            </div>
            <div className="center mgtp">
              <label className="txt divnm" htmlFor="username">
                Usuario
              </label>
            </div>

            <div className="center mgtp">
              <input
                className="inpt"
                type="text"
                id="username"
                name="username"
                required
                placeholder="Nombre de Usuario"
              />
            </div>
            <div className="center mgtp">
              <label className="txt divnm" htmlFor="password">
                Contraseña
              </label>
            </div>
            <div className="center mgtp">
              <input
                className="inpt"
                type="password"
                id="password"
                name="password"
                required
                placeholder="Contraseña"
              />
            </div>
            <div className="center">
              <button className="btStyle" type="submit">
                Autenticarse
              </button>
            </div>
          </form>
        </div>
       
      </div>
      <img className='pdimg' src="/src/assets/login.png" alt=""/>
    </div>
  );
};

export default Login;
