import { Link } from 'react-router-dom';
import './style.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className='nf'>404 :(<br></br>Página não encontrada</h1>
        <Link to="/" className="back">Voltar para a home</Link>
      </div>
    </div>
  );
}

export default NotFound;
