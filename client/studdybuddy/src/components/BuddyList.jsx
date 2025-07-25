import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";

function BuddyList({ userId }) {
  const [buddies, setBuddies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBuddies = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/api/buddies/${userId}`);
    const data = await res.json();
    setBuddies(data);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    if (userId) fetchBuddies();
    // Poll every 5 seconds
    const interval = setInterval(() => {
      if (userId) fetchBuddies();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [userId]);

  const removeBuddy = async (buddyId) => {
    await fetch(`${API_BASE_URL}/api/buddies/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, buddyId }),
    });
    fetchBuddies();
  };

  const handleManualRefresh = () => {
    setRefreshing(true);
    fetchBuddies();
  };

  if (loading) return <p>Loading buddies...</p>;
  if (!buddies.length) return (
    <>
      <p>No buddies yet. Connect with others to see your buddies here.</p>
      <button onClick={handleManualRefresh} disabled={refreshing} style={{marginTop: 8}}>
        {refreshing ? "Refreshing..." : "Refresh"}
      </button>
    </>
  );

  return (
    <>
      <button onClick={handleManualRefresh} disabled={refreshing} style={{marginBottom: 10}}>
        {refreshing ? "Refreshing..." : "Refresh"}
      </button>
      <ul>
        {buddies.map((buddy) => (
          <li key={buddy._id} style={{ marginBottom: 10 }}>
            <span>{buddy.name} ({buddy.email})</span>
            <button style={{ marginLeft: 10 }} onClick={() => removeBuddy(buddy._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default BuddyList; 