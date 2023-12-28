import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Mapa from './components/mapa';
import NavBarExample from './layouts/navbar';
import Ficha from './components/ficha';
import Login from './components/login';
import CompShowIniciativa from './iniciativaMethods/ShowIniciativa';
import CreateIniciativa from './iniciativaMethods/CreateIniciativa';
import Editiniciativa from './iniciativaMethods/EditIniciativa';
import Ban from './layouts/banner-img';
import Estadistica from './components/estadistica';

function App() {
  return (
    <div className="App">

<BrowserRouter>
<Routes>
    <Route path='/' element={ <NavBarExample /> }>
    <Route exact path='/' element={ <Home /> } />
    <Route path='mapa' element={ <Mapa /> } />
    <Route path='ficha' element={ <Ficha/> } />
    <Route path='login' element={ <Login/> } />
    <Route path='estadistica' element={ <Estadistica/> } />
    <Route path='ShowIniciativa' element={<CompShowIniciativa/>}/> 
    <Route path='/CreateIniciativa' element={<CreateIniciativa/>}/> 
    <Route path='/EditIniciativa/:identificador' element={<Editiniciativa/>}/> 
    <Route path="/ficha/:identificador" element={<Ban/>} />
    <Route path='*' element={ <Navigate replace to="/"/> }/>
  </Route>
</Routes> 
</BrowserRouter>


    </div>
  );
}

export default App;