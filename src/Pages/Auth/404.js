import './404.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <button
          className="error-btn"
          onClick={() => navigate('/', { replace: true })}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Go Back Home
        </button>
      </div>
     
    </div>
  );
}
