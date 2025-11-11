import './403.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Error403({role}) {
    const navigate = useNavigate();

    return (
        <div className="error-container">
            <div className="error-codee">403</div>
            <div className="error-messagee">Access Denied</div>
            <div className="error-submessage">
                Sorry, you don't have permission to access this page.
            </div>
            <Link className="back-btn" to={role === '1996' ? '/dashboard/writer' : '/'} >
                {role === '1996' ? 'Go to Writer Dashboard' : 'Go to Home'}
            </Link>
        </div>
    );
}
