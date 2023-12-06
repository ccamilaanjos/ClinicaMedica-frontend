import React from 'react';
import './style.css';
import logo from '../../assets/logo.png';

function Header () {  
  return (
    <div className='homepage-header'>
      <img className='logo' src={logo}/>
      <nav className='header-buttons'>
        <ul>
          <li>
            <a href='https://github.com/ccamilaanjos'>Suporte</a>
          </li>
          <li>
            <a href='https://trello.com/invite/b/z6GdAVZd/ATTI6a482e522dea5322bbd51e1e064db32d231103D8/trabalho-pweb-2023-1'>Sobre</a>
          </li>
          <li>
            <div className='search'>
              <input className='search-input' type='text' placeholder="Digite algo..."/>
                <button className='search-button'>Buscar</button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header;