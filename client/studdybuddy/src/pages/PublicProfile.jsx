import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../api";

function PublicProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`${API_BASE_URL}/api/profile/${userId}`);
      const data = await res.json();
      setUser(data);
      setLoading(false);
    };
    fetchProfile();
  }, [userId]);

  if (loading) return <div className="container"><p>Loading profile...</p></div>;
  if (!user) return <div className="container"><p>User not found.</p></div>;

  return (
    <div className="container" style={{ maxWidth: 500 }}>
      <h1>{user.name}'s Profile</h1>
      {user.photo && <img src={user.photo} alt="Profile" style={{ width: 80, borderRadius: "50%", marginBottom: 16 }} />}
      <p><strong>Email:</strong> {user.email}</p>
      <div style={{ marginTop: 12 }}>
        <strong>Interests:</strong>
        <div>
          {user.interests && user.interests.length > 0 ? (
            user.interests.map((interest) => (
              <span key={interest} style={{ display: 'inline-block', background: '#e3e9f7', color: '#2a5298', borderRadius: 12, padding: '4px 12px', marginRight: 8, marginBottom: 8 }}>
                {interest}
              </span>
            ))
          ) : (
            <span>No interests listed.</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PublicProfile; 