import { useState } from "react";
import { API_BASE_URL } from "../api";

function BuddySearch({ userId, onBuddyAdded }) {
  const [interest, setInterest] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/api/buddies/search?interest=${encodeURIComponent(interest)}&exclude=${userId}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  const addBuddy = async (buddyId) => {
    await fetch(`${API_BASE_URL}/api/buddies/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, buddyId }),
    });
    if (onBuddyAdded) onBuddyAdded();
    setResults(results.filter((u) => u._id !== buddyId));
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <form onSubmit={search} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search by interest (e.g. math)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Searching...</p>}
      {results.length > 0 && (
        <ul>
          {results.map((user) => (
            <li key={user._id} style={{ marginBottom: 10 }}>
              <span>{user.name} ({user.email})</span>
              <button style={{ marginLeft: 10 }} onClick={() => addBuddy(user._id)}>Add Buddy</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BuddySearch; 