import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";

function Resources() {
  const [user, setUser] = useState(null);
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", link: "", description: "" });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const fetchResources = async (q = "") => {
    if (!user) return;
    setLoading(true);
    const url = q
      ? `${API_BASE_URL}/api/resources/search/${user._id}?name=${encodeURIComponent(q)}`
      : `${API_BASE_URL}/api/resources/${user._id}`;
    const res = await fetch(url);
    const data = await res.json();
    setResources(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchResources();
    // eslint-disable-next-line
  }, [user]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.link) return;
    setAdding(true);
    await fetch(`${API_BASE_URL}/api/resources`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, owner: user._id }),
    });
    setForm({ name: "", link: "", description: "" });
    setAdding(false);
    fetchResources(search);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchResources(search);
  };

  // Group resources by owner
  const yourResources = resources.filter(r => r.owner._id === user?._id);
  const buddyResources = resources.filter(r => r.owner._id !== user?._id);

  if (!user) return null;

  return (
    <div className="container" style={{ maxWidth: 700 }}>
      <h1>Resources</h1>
      <form onSubmit={handleAdd} style={{ marginBottom: 24 }}>
        <h2>Add Resource</h2>
        <input
          type="text"
          name="name"
          placeholder="Resource Name"
          value={form.name}
          onChange={handleInput}
          style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <input
          type="text"
          name="link"
          placeholder="Resource Link (URL)"
          value={form.link}
          onChange={handleInput}
          style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleInput}
          style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 4, border: '1px solid #ccc', minHeight: 60 }}
        />
        <button type="submit" disabled={adding}>{adding ? "Adding..." : "Add Resource"}</button>
      </form>
      <form onSubmit={handleSearch} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search resources by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '80%', padding: 8, borderRadius: 4, border: '1px solid #ccc', marginRight: 8 }}
        />
        <button type="submit">Search</button>
      </form>
      {loading ? <p>Loading resources...</p> : (
        <>
          <h2>Your Resources</h2>
          {yourResources.length ? (
            <ul>
              {yourResources.map(r => (
                <li key={r._id} style={{ marginBottom: 12 }}>
                  <strong>{r.name}</strong> (<a href={r.link} target="_blank" rel="noopener noreferrer">link</a>)<br />
                  <span style={{ color: '#555' }}>{r.description}</span>
                </li>
              ))}
            </ul>
          ) : <p>No resources added by you yet.</p>}
          <h2>Buddies' Resources</h2>
          {buddyResources.length ? (
            <ul>
              {buddyResources.map(r => (
                <li key={r._id} style={{ marginBottom: 12 }}>
                  <strong>{r.name}</strong> by {r.owner.name} (<a href={r.link} target="_blank" rel="noopener noreferrer">link</a>)<br />
                  <span style={{ color: '#555' }}>{r.description}</span>
                </li>
              ))}
            </ul>
          ) : <p>No resources shared by your buddies yet.</p>}
        </>
      )}
    </div>
  );
}

export default Resources; 