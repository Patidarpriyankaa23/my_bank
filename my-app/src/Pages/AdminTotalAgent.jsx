
import React, { useEffect, useState } from "react";
import adminAxios from '../utils/axiosadmin';


export default function AdminTotalAgents() {
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [editedAgents, setEditedAgents] = useState([]);
  const [inactiveAgents, setInactiveAgents] = useState([]);
  const [inactiveDays, setInactiveDays] = useState(15);

  const fetchStats = async () => {
    const res = await adminAxios.get("/admin/agents/stats");
    setStats(res.data);
  };

  const fetchEditedAgents = async () => {
    const res = await adminAxios.get("/admin/agents/edited");
    setEditedAgents(res.data);
  };

  const fetchInactiveAgents = async (days) => {
    const res = await adminAxios.get(`/admin/agents/inactive?days=${days}`);
    setInactiveAgents(res.data);
  };

  const fetchSearchResults = async (filters) => {
    const cleanedFilters = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        cleanedFilters[key] = value.trim();
      }
    });

    const params = new URLSearchParams(cleanedFilters);
    try {
      const res = await adminAxios.get(`/admin/agents/search?${params}`);
      setSearchResults(res.data);
    } catch (error) {
      console.error("Search Error:", error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchEditedAgents();
    fetchInactiveAgents(inactiveDays);
  }, [inactiveDays]);

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults(filters);
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Admin Panel - Total Agents</h2>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <SummaryCard title="Agents Today" value={stats.todayCount} />
          <SummaryCard title="Agents Yesterday" value={stats.yesterdayCount} />
          <SummaryCard title="Total Agents" value={stats.lifetimeCount} />
          <SummaryCard title="GST Registered" value={stats.gstCount} />
          <SummaryCard title="Non-GST" value={stats.nonGstCount} />
          <SummaryCard title="Edited Profiles" value={stats.editedCount} />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-4 gap-3 text-sm"
      >
        <input
          name="name"
          value={filters.name || ""}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              name: e.target.value.replace(/\s+/g, " "),
            }))
          }
          placeholder="Agent Name"
          className="border px-3 py-2 rounded"
        />
        <input
          name="state"
          value={filters.state || ""}
          onChange={handleChange}
          placeholder="State"
          className="border px-3 py-2 rounded"
        />
        <input
          name="city"
          value={filters.city || ""}
          onChange={handleChange}
          placeholder="City"
          className="border px-3 py-2 rounded"
        />
        <input
          name="pincode"
          value={filters.pincode || ""}
          onChange={handleChange}
          placeholder="Pincode"
          className="border px-3 py-2 rounded"
        />
        <select
          name="category"
          value={filters.category || ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">Category</option>
          <option value="DSA">DSA</option>
          <option value="Freelancer">Freelancer</option>
          <option value="Banker">Banker</option>
          <option value="Others">Others</option>
        </select>
        <select
          name="isDeactivated"
          value={filters.isDeactivated || ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">Status</option>
          <option value="true">Deactivated</option>
          <option value="false">Active</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-2 md:col-span-1 hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {searchResults.length > 0 && (
        <DataTable
          title="Search Results"
          columns={["Name", "Category", "State", "City", "Pincode", "Status"]}
          rows={searchResults.map((a) => [
            a.name || a.fullname,
            a.category,
            a.state,
            a.city,
            a.pincode,
            a.isActive ? "Active" : "Deactivated",
          ])}
        />
      )}

      {/* 🔥 All Edit History */}
      <DataTable
        title="Edited Agent Profiles"
        columns={["Agent", "Edited At", "Before", "After"]}
        rows={editedAgents.map((edit) => [
          edit.agentId?.fullname || edit.agentId?.name || "Unknown",
          new Date(edit.editedAt).toLocaleString(),
          <div className="text-xs text-red-700 space-y-1">
            {Object.entries(edit.oldData).map(([key, value]) => (
              <div key={key}>
                <strong className="capitalize">{key}</strong>: {String(value)}
              </div>
            ))}
          </div>,
          <div className="text-xs text-green-700 space-y-1">
            {Object.entries(edit.newData).map(([key, value]) => (
              <div key={key}>
                <strong className="capitalize">{key}</strong>: {String(value)}
              </div>
            ))}
          </div>,
        ])}
      />

      <div>
        <h3 className="text-lg font-semibold mb-2 text-black">
          Inactive Agents (Last {inactiveDays} days)
        </h3>
        <div className="flex gap-2 mb-4 text-black">
          {[15, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setInactiveDays(d)}
              className={`px-3 py-1 rounded text-sm border text-black ${
                inactiveDays === d
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {d} Days
            </button>
          ))}
        </div>
        <DataTable
          columns={[
            "Name",
            "Email",
            "Mobile",
            "Last Login",
            "Last CIBIL Fetch",
          ]}
          rows={inactiveAgents.map((agent) => [
            agent.name || agent.fullname,
            agent.email,
            agent.mobile,
            agent.lastLogin
              ? new Date(agent.lastLogin).toLocaleDateString()
              : "Never",
            agent.lastCibilFetch
              ? new Date(agent.lastCibilFetch).toLocaleDateString()
              : "Never",
          ])}
        />
      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white border rounded-lg shadow p-4 text-center">
      <h4 className="text-sm font-medium text-gray-700">{title}</h4>
      <p className="text-xl font-bold text-blue-700">{value}</p>
    </div>
  );
}

function DataTable({ title, columns, rows }) {
  return (
    <div className="overflow-x-auto">
      {title && <h3 className="font-semibold text-lg mb-2">{title}</h3>}
      <table className="w-full table-auto text-sm border border-gray-200 shadow-sm rounded">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="p-2 border text-left font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, i) => (
              <tr key={i} className="even:bg-gray-50">
                {row.map((cell, j) => (
                  <td key={j} className="p-2 border align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="p-3 text-center text-gray-500 italic">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
