import './403.css';
import { useNavigate } from 'react-router-dom';

export default function Error403() {
    const navigate = useNavigate();

    return (
        <div className="error-container">
            <div className="error-code">403</div>
            <div className="error-message">Access Denied</div>
            <div className="error-submessage">
                Sorry, you don't have permission to access this page.
            </div>
            <button className="back-btn" onClick={() => navigate(-1)}>
                Go Back
            </button>
        </div>
    );
}
