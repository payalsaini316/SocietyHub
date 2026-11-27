import { Link } from "react-router-dom";
import { showWarning } from "../utils/alert";

const Unauthorized = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>

        <Link to="/login" className="back-link">
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;