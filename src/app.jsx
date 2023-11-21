import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Homepage from './components/homepage/index.jsx';
import Pacientes from './components/pacientes/index.jsx';
import Medicos from './components/medicos/index.jsx';
import Consultas from './components/consultas/index.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
            <Route exact path={'/'} element={<Homepage/>} />
                <Route exact path='/pacientes' element={<Pacientes/>} />
                <Route path='/medicos' element={<Medicos/>} />
                <Route path='/consultas' element={<Consultas/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
