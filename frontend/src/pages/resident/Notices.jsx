import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { showError } from "../../utils/alert";
import "../../styles/Notices.css";

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await apiRequest("/notices", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setNotices(data.notices);
      } catch (error) {
        showError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchNotices();
    }
  }, [accessToken]);

  return (
    <div className="notices-page">
      <header className="notices-header">
        <h2>SocietyHub</h2>
        <a href="/resident/dashboard">Dashboard</a>
      </header>

      <main className="notices-content">
        <h1>Society Notices</h1>
        <p>Latest announcements and updates from your society.</p>

        {loading ? (
          <p className="notice-message">Loading notices...</p>
        ) : notices.length === 0 ? (
          <p className="notice-message">No notices available.</p>
        ) : (
          <div className="notices-list">
            {notices.map((notice) => (
              <div className="notice-card" key={notice._id}>
                <span className="notice-category">
                  {notice.category}
                </span>

                <h3>{notice.title}</h3>

                <p>{notice.description}</p>

                <div className="notice-footer">
                  <span>
                    Posted by: {notice.postedBy?.name || "Admin"}
                  </span>

                  <span>
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Notices;