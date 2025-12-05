import React, { useEffect, useState } from "react";
import { getCampaigns } from "../services/campaignService";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchCampaigns();
  }, [statusFilter]);

  const fetchCampaigns = async () => {
    const data = await getCampaigns(statusFilter);
    setCampaigns(data);
  };

  return (
    <div>
      <h1>Campaigns</h1>

      <label>
        Filter by Status:
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
        </select>
      </label>

      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Clicks</th>
            <th>Cost</th>
            <th>Impressions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.status}</td>
              <td>{c.clicks}</td>
              <td>{c.cost}</td>
              <td>{c.impressions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignList;
