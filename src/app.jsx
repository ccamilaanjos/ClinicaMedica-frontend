import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Homepage from './components/homepage/index.jsx';
import Pacientes from './components/pacientes/index.jsx';
import Medicos from './components/medicos/index.jsx';
import Consultas from './components/consultas/index.jsx';
import CadastroPaciente from './components/pacientes/crud/create/index.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
            <Route exact path={'/'} element={<Homepage/>} />
                <Route exact path='/pacientes' element={<Pacientes/>} />
                <Route path='/pacientes/cadastrar' element={<CadastroPaciente/>} />
                <Route exact path='/medicos' element={<Medicos/>} />
                <Route exact path='/consultas' element={<Consultas/>} />
                {/* <Route path="*" element={<Error/>}/> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
