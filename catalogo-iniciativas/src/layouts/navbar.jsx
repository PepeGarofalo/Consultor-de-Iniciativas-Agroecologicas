import { useLocation, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import './navbar.css';
import CompShowIniciativa from '../iniciativaMethods/ShowIniciativa';
import CreateIniciativa from '../iniciativaMethods/CreateIniciativa';
import EditIniciativa from '../iniciativaMethods/EditIniciativa';

const URI = 'http://localhost:3002/iniciativa';

const NavBar = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [iniciativas, setIniciativas] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URI);
        const data = await response.json();
        setIniciativas(data);
      } catch (error) {
        console.error('Error al obtener la lista de iniciativas:', error);
      }
    };

    fetchData();
  }, []); // Solo se ejecuta una vez al montar el componente

  useEffect(() => {
    // Lógica de búsqueda aquí...
    if (searchTerm) {
      const filtered = iniciativas.filter((iniciativa) =>
        iniciativa.nombre_iniciativa.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(filtered.slice(0, 8));
      setShowResults(true);
      setSearchResultsVisible(true);
    } else {
      setFilteredResults([]);
      setShowResults(false);
      setSearchResultsVisible(false);
    }
  }, [searchTerm, iniciativas]);

  // Nuevo useEffect para actualizar las iniciativas cada vez que se cambia de ruta
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URI);
        const data = await response.json();
        setIniciativas(data);
      } catch (error) {
        console.error('Error al obtener la lista de iniciativas:', error);
      }
    };

    // Solo se actualiza si la ruta no es "/CreateIniciativa" o "/EditIniciativa/"
    if (!(location.pathname === '/CreateIniciativa' || location.pathname.includes('/EditIniciativa/'))) {
      fetchData();
    }
  }, [location.pathname]); // Se ejecuta cada vez que cambia la ruta
  useEffect(() => {
    // Limpia el término de búsqueda y los resultados filtrados cuando cambias de vista
    clearSearch();
  }, [location.pathname]);
  
  const handleResultClick = (iniciativa) => {
    window.location.href = `/ficha/${iniciativa.identificador}`;
    clearSearch();
  };

  const closeSearchResults = () => {
    setSearchResultsVisible(false);
    clearSearch();
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredResults([]);
  };

  if (location.pathname === '/ShowIniciativa') {
    return <CompShowIniciativa></CompShowIniciativa>;
  }
  if (location.pathname === '/CreateIniciativa') {
    return <CreateIniciativa />
  }
  if (location.pathname.includes('/EditIniciativa/')) {
    return <EditIniciativa />;
  }

  return (
    <>
      <Navbar className="degradate" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand><img src="/src/assets/logoCatalogo.png" className='imgnvbr' alt="logo del catálogo" /></Navbar.Brand>
          <input
            className="inpts dnonelg"
            type="text"
            placeholder="   Buscar iniciativas"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Navbar.Toggle  aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className='' id="basic-navbar-nav">
            <Nav.Link className={`Clr ajust colorLinks ${location.pathname === '/' ? 'active' : ''}`} as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link className={`Clr ajust colorLinks ${location.pathname === '/mapa' ? 'active' : ''}`} as={Link} to="/mapa">
              Mapa
            </Nav.Link>
            <NavLink
              className={`Clr nav-link ajust colorLinkss ${location.pathname.includes('/ficha') ? 'active' : ''}`}
              to="/ficha"
              style={{ textDecoration: 'none' }}
            >
              Ficha Técnica
            </NavLink>
            <Nav.Link className={`Clr ajust colorLinkss ${location.pathname === '/estadistica' ? 'active' : ''}`} as={Link} to="/estadistica">
              Estadística
            </Nav.Link>
          </Navbar.Collapse>
          <Nav.Link className="rgt dnonelg" as={Link} to="/login"><img className="iconlg" src="/src/assets/ADM.png" alt="logo de admin" /></Nav.Link>
        </Container>
      </Navbar>
      {showResults && (
        <div className={`search-results ml-5 positionsearch ${searchResultsVisible ? 'visible' : ''}`}>
          <div className='final'>
            <img className='closebtn' src="/src/assets/close.png" alt="Cerrar búsqueda" onClick={closeSearchResults} />
          </div>
          <ul className='searcnavbar'>
            {filteredResults.map((iniciativa) => (
              <li className='serachresult' key={iniciativa.identificador} onClick={() => handleResultClick(iniciativa)}>
                <img className="imglist" src="/src/assets/icon.png" alt="Icono" />
                <Link className='serachresult' to={`/ficha/${iniciativa.identificador}`}>{iniciativa.nombre_iniciativa}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <section>
        <Outlet></Outlet>
      </section>
    </>
  );
};

export default NavBar;
