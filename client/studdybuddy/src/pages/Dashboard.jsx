import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BuddyList from "../components/BuddyList";
import BuddySearch from "../components/BuddySearch";
import ModeSwitch from "../components/ModeSwitch";
import "../styles.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [refreshBuddies, setRefreshBuddies] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="container dashboard-container" style={{ background: "var(--dashboard-bg)", borderRadius: 0, boxShadow: "none", paddingTop: 0 }}>
      <div className="dashboard-header redesigned-header">
        <div className="user-info redesigned-user-info">
          {user.photo ? (
            <img src={user.photo} alt="Profile" className="profile-pic large-avatar" />
          ) : (
            <div className="profile-pic large-avatar avatar-fallback">
              {user.name ? user.name[0].toUpperCase() : "?"}
            </div>
          )}
          <div className="user-details">
            <h1 className="dashboard-title">Welcome, {user.name}!</h1>
            <div className="dashboard-slogan">Coding kar, future secure kar! <span role="img" aria-label="nerd">🤓</span></div>
            <div className="dashboard-links">
              <Link to="/profile" className="dashboard-link">Edit Profile</Link>
              <Link to="/resources" className="dashboard-link">Resources</Link>
              <ModeSwitch />
            </div>
            <div className="dashboard-interests">
              <strong>Interests:</strong>
              {user.interests && user.interests.length > 0 ? (
                user.interests.map((interest) => (
                  <span key={interest} className="interest-badge">
                    {interest}
                  </span>
                ))
              ) : (
                <span style={{ marginLeft: 8 }}>No interests listed.</span>
              )}
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-btn dashboard-logout">Logout</button>
      </div>
      <div className="dashboard-sections">
        <section>
          <h2>Buddies</h2>
          <BuddySearch userId={user._id} onBuddyAdded={() => setRefreshBuddies((v) => !v)} />
          <BuddyList userId={user._id} key={user._id + refreshBuddies} />
        </section>
        <section>
          <h2>Resources</h2>
          <p>No resources shared yet. <Link to="/resources">Go to Resources</Link></p>
        </section>
        <section>
          <h2>Doubts & Questions</h2>
          <p>No doubts or questions posted yet.</p>
        </section>
        <section>
          <h2>Favorites</h2>
          <p>No favorites yet.</p>
        </section>
      </div>
    </div>
  );
}

export default Dashboard; 