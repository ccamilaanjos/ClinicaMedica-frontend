import React from 'react';
import './style.css'

function Header() {
  return (
    <div className='homepage-header'>
      <img className='logo' src='src\assets\logo.png' />
      <nav className='header-buttons'>
        <ul>
          <li>
            <a href='https://github.com/ccamilaanjos'>Suporte</a>
          </li>
          <li>
            <a href='/sobre'>Sobre</a>
          </li>
          <li>
            <div className='search'>
              <input className='input' type='text' placeholder="Digite algo..."/>
                <button className='search-button'>Buscar</button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header;