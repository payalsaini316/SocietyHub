import { useAuth } from "../../context/AuthContext";
import "../../styles/ResidentDashboard.css";

function ResidentDashboard() {
  const { user } = useAuth();

  return (
    <div className="resident-dashboard">
      <header className="resident-header">
        <div>
          <h2>SocietyHub</h2>
          <p>Apartment Society Management</p>
        </div>

        <div className="resident-profile">
          <span>{user?.name?.charAt(0).toUpperCase()}</span>
          <div>
            <h4>{user?.name}</h4>
            <p>Resident</p>
          </div>
        </div>
      </header>

      <main className="resident-content">
        <div className="resident-welcome">
          <h1>Welcome, {user?.name}!</h1>
          <p>Manage your society activities from one place.</p>
          <p className="flat-number">
            Flat Number: {user?.flatNumber}
          </p>
        </div>

        <div className="resident-cards">
          <div className="resident-card">
            <h3>Notices</h3>
            <p>View society announcements and updates.</p>
          </div>

          <div className="resident-card">
            <h3>Complaints</h3>
            <p>Submit complaints and check their status.</p>
          </div>

          <div className="resident-card">
            <h3>Maintenance</h3>
            <p>Check your monthly maintenance dues.</p>
          </div>

          <div className="resident-card">
            <h3>Visitor Pass</h3>
            <p>Create visitor passes for your guests.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResidentDashboard;