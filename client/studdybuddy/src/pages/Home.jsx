import GoogleLoginButton from "../components/GoogleLoginButton";
import { useNavigate } from "react-router-dom";
import "../styles.css";

function Home() {
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    alert(`Welcome, ${user.name}!`);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
  };

  const handleLoginError = (error) => {
    alert("Login failed: " + error.message);
  };

  return (
    <>
      <svg className="animated-blob" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(300,300)">
          <path d="M120,-153.6C153.6,-120,180,-76.8,180,-30.7C180,15.4,153.6,61.5,120,92.3C86.4,123.1,45.6,138.6,0,138.6C-45.6,138.6,-91.2,123.1,-123.1,92.3C-155,61.5,-173.1,15.4,-173.1,-30.7C-173.1,-76.8,-155,-120,-123.1,-153.6C-91.2,-187.2,-45.6,-210.2,0,-210.2C45.6,-210.2,91.2,-187.2,120,-153.6Z" fill="#2a5298" />
        </g>
      </svg>
      <div className="home-card">
        <h1 className="main-title light-text">Study Buddy</h1>
        <div className="slogan light-text">
          aaj kamaayinga toh kal khaayinga <span role="img" aria-label="funny">😜</span>
        </div>
        <p className="subtitle light-text">Connect, collaborate, and grow with fellow students based on your interests.</p>
        <div className="login-section">
          <GoogleLoginButton onSuccess={handleLoginSuccess} onError={handleLoginError} />
        </div>
        <div className="info-section features-list">
          <h2>Features</h2>
          <ul>
            <li><span className="feature-icon">🤝</span> Find and connect with study buddies</li>
            <li><span className="feature-icon">📚</span> Share resources and notes</li>
            <li><span className="feature-icon">❓</span> Post doubts and questions</li>
            <li><span className="feature-icon">💬</span> Real-time chat and collaboration</li>
            <li><span className="feature-icon">⭐</span> Save your favorite buddies</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home; 