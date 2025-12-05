import { useEffect, useState } from "react";

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchCampaigns();
  }, [statusFilter]);

  const fetchCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = "http://127.0.0.1:8000/campaigns";
      if (statusFilter) url += `?status=${statusFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      setCampaigns(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load campaigns.");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sorted = [...campaigns].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setCampaigns(sorted);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Campaign Dashboard</h1>

      <div className="mb-3 d-flex justify-content-center">
        <label className="me-2 fw-semibold">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-select w-auto"
        >
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered align-middle text-center">
          <thead className="table-light">
            <tr>
              {["ID", "Name", "Status", "Clicks", "Cost", "Impressions"].map((col) => (
                <th
                  key={col}
                  onClick={
                    ["ID", "Clicks", "Cost", "Impressions"].includes(col)
                      ? () => handleSort(col.toLowerCase())
                      : undefined
                  }
                  style={{ cursor: ["ID", "Clicks", "Cost", "Impressions"].includes(col) ? "pointer" : "default" }}
                >
                  {col} {sortField === col.toLowerCase() ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td className={`fw-bold ${c.status === "Active" ? "text-success" : "text-danger"}`}>
                  {c.status}
                </td>
                <td>{c.clicks}</td>
                <td>{c.cost.toFixed(2)}</td>
                <td>{c.impressions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
