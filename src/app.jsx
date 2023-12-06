import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage';
import Header from './components/header';
import Pacientes from './components/Pacientes';
import Medicos from './components/Medicos';
import CadastroPaciente from './components/Pacientes/crud/create';
import CadastroMedico from './components/Medicos/crud/create';
import AtualizacaoPaciente from './components/Pacientes/crud/update';
import AtualizacaoMedico from './components/Medicos/crud/update';
import Consultas from './components/Consultas';
import MarcacaoConsulta from './components/Consultas/create';
import NotFound from './components/NotFound';
// import CancelamentoConsulta from './components/Consultas/cancel';

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='pacientes'>
          <Route index={true} element={<Pacientes />}></Route>
          <Route path='cadastrar' element={<CadastroPaciente />} />
          <Route path='atualizar/:cpf' element={<AtualizacaoPaciente />} />
        </Route>
        <Route path='medicos'>
          <Route index={true} element={<Medicos />} />
          <Route path='cadastrar' element={<CadastroMedico />} />
          <Route path='atualizar/:crm' element={<AtualizacaoMedico />} />
        </Route>
        <Route path='/consultas'>
          <Route index={true} element={<Consultas />} />
          <Route path='marcar' element={<MarcacaoConsulta />} />
          {/* <Route path='cancelar/:id' element={<CancelamentoConsulta />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
