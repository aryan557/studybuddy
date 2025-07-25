import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";
import { useNavigate } from "react-router-dom";
import BuddyList from "../components/BuddyList";

function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      setName(u.name || "");
      setPhoto(u.photo || "");
      setInterests(u.interests || []);
    }
  }, []);

  const handleAddInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const res = await fetch(`${API_BASE_URL}/api/profile/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, photo, interests }),
    });
    const updated = await res.json();
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
    setSaving(false);
    alert("Profile updated!");
    navigate("/dashboard");
  };

  if (!user) return null;

  return (
    <div className="container" style={{ maxWidth: 500 }}>
      <h1>My Profile</h1>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
      />
      <label>Photo URL:</label>
      <input
        type="text"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
        style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
      />
      <label>Interests:</label>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          type="text"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          placeholder="Add interest"
          style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <button type="button" onClick={handleAddInterest}>Add</button>
      </div>
      <div style={{ marginBottom: 16 }}>
        {interests.map((interest) => (
          <span key={interest} style={{ display: 'inline-block', background: '#e3e9f7', color: '#2a5298', borderRadius: 12, padding: '4px 12px', marginRight: 8, marginBottom: 8 }}>
            {interest} <button type="button" style={{ background: 'none', border: 'none', color: '#2a5298', cursor: 'pointer' }} onClick={() => handleRemoveInterest(interest)}>×</button>
          </span>
        ))}
      </div>
      <button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Profile"}</button>
      <div style={{ marginTop: 32 }}>
        <h2>My Buddies</h2>
        {user && <BuddyList userId={user._id} key={user._id} />}
      </div>
    </div>
  );
}

export default Profile; 