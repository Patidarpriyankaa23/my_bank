// import React, { useEffect, useState } from "react";
// import adminAxios from "../utils/axiosadmin";
// import { useNavigate } from "react-router-dom";

// export default function AdminTotalAgents() {
//   const [stats, setStats] = useState(null);
//   const [filters, setFilters] = useState({});
//   const [searchResults, setSearchResults] = useState([]);
//   const [editedAgents, setEditedAgents] = useState([]);
//   const [inactiveAgents, setInactiveAgents] = useState([]);
//   const [inactiveDays, setInactiveDays] = useState(15);
//   const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
//   const [lifetimeSelected, setLifetimeSelected] = useState(true); // ✅ NEW
//   const navigate = useNavigate();

//   const fetchStats = async () => {
//     const res = await adminAxios.get("/admin/agents/stats");
//     setStats(res.data);
//   };

//   const fetchEditedAgents = async () => {
//     const res = await adminAxios.get("/admin/agents/edited");
//     setEditedAgents(res.data);
//   };

//   const fetchInactiveAgents = async (days) => {
//     const res = await adminAxios.get(`/admin/agents/inactive?days=${days}`);
//     setInactiveAgents(res.data);
//   };

//   const fetchSearchResults = async () => {
//     const allFilters = {
//       ...filters,
//       ...dateRange,
//     };

//     const hasAnyFilter = Object.values(allFilters).some((v) =>
//       typeof v === "string" ? v.trim() !== "" : !!v
//     );

//     try {
//       const res =
//         hasAnyFilter && !lifetimeSelected
//           ? await adminAxios.get(`/admin/agents/search?${new URLSearchParams(allFilters)}`)
//           : await adminAxios.get("/admin/agents/search?lifetime=true");

//       setSearchResults(res.data);
//     } catch (error) {
//       console.error("Search Error:", error);
//       setSearchResults([]);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     fetchEditedAgents();
//     fetchInactiveAgents(inactiveDays);
//   }, [inactiveDays]);

//   // 🟢 Initial load triggers lifetime search
//   useEffect(() => {
//      console.log("Search Results =>", searchResults);
//     fetchSearchResults();
//   }, []);

//   // 🟢 Update on filter or dateRange change
//   useEffect(() => {
//     fetchSearchResults();
//   }, [filters, dateRange]);

//   const handleChange = (e) => {
//     setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     setLifetimeSelected(false);
//   };

//   const handleDateChange = (e) => {
//     setDateRange((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     setLifetimeSelected(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchSearchResults();
//   };

//   return (
//     <div className="p-6 space-y-8">
//       <h2 className="text-2xl font-bold">Admin Panel - Total Agents</h2>

//       {/* 🔍 Search Filters */}
//       <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-3 text-sm">
//         <input name="name" placeholder="Name" onChange={handleChange} className="border px-3 py-2 rounded" />
//         <input name="state" placeholder="State" onChange={handleChange} className="border px-3 py-2 rounded" />
//         <input name="city" placeholder="City" onChange={handleChange} className="border px-3 py-2 rounded" />
//         <input name="pincode" placeholder="Pincode" onChange={handleChange} className="border px-3 py-2 rounded" />
//         <input name="uniqueId" placeholder="Unique ID" onChange={handleChange} className="border px-3 py-2 rounded" />
//         <input name="category" placeholder="Category" onChange={handleChange} className="border px-3 py-2 rounded" />
//         <select name="status" onChange={handleChange} className="border px-3 py-2 rounded">
//           <option value="">Status</option>
//           <option value="active">Active</option>
//           <option value="deactivated">Deactivated</option>
//           <option value="deleted">Deleted</option>
//         </select>
//         <select name="gstType" onChange={handleChange} className="border px-3 py-2 rounded">
//           <option value="">GST Type</option>
//           <option value="GST">GST Registered</option>
//           <option value="Non-GST">Non-GST</option>
//         </select>

//         {/* 📅 Lifetime Filter */}
//         <select
//           onChange={(e) => {
//             const value = e.target.value;

//             if (value === "today") {
//               const today = new Date().toISOString().split("T")[0];
//               setDateRange({ fromDate: today, toDate: today });
//               setLifetimeSelected(false);
//             } else if (value === "yesterday") {
//               const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
//               setDateRange({ fromDate: yesterday, toDate: yesterday });
//               setLifetimeSelected(false);
//             } else {
//               // 🟢 Lifetime selected — clear everything
//               setFilters({});
//               setDateRange({ fromDate: "", toDate: "" });
//               setLifetimeSelected(true);
//             }
//           }}
//           className="border px-3 py-2 rounded"
//         >
//           <option value="">Lifetime Filter</option>
//           <option value="today">Today</option>
//           <option value="yesterday">Yesterday</option>
//         </select>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded col-span-2 md:col-span-1 hover:bg-blue-700"
//         >
//           Search
//         </button>
//       </form>

//       {/* 📊 Total Agents Found */}
//       <div className="text-sm font-semibold text-blue-700 mb-2">
//         Total Agents Found: {searchResults.length}
//       </div>

//       {/* 🔍 Search Results */}
//       <DataTable
//         title="Search Results"
//         columns={[
//           "Name", "State", "City", "Pincode", "Category",
//           "Status", "Last CIBIL Fetch", "Unique ID", "GST", "Total Reports"
//         ]}
//         rows={searchResults.map((a) => [
//           a.name || a.fullname,
//           a.state,
//           a.city,
//           a.pincode,
//           a.category,
//           a.computedStatus || "N/A",
//           a.lastCibilFetch ? new Date(a.lastCibilFetch).toLocaleDateString() : "N/A",
//           <button className="text-blue-600 underline" onClick={() => navigate(`/admin/view/${a._id}`)}>
//             {a.uniqueId}
//           </button>,
//           a.gstType || "N/A",
//           a.totalReports || 0,
//         ])}
//       />

//       {/* 📝 Edited Agent Profiles */}
//       <DataTable
//         title={`Edited Agent Profiles (${editedAgents.length})`}
//         columns={["Agent Name", "Unique ID", "Edited At"]}
//         rows={editedAgents.map((edit) => [
//           edit.agentId?.fullname || edit.agentId?.name || "N/A",
//           <button className="text-blue-600 underline" onClick={() => navigate(`/admin/view/${edit.agentId?._id}`)}>
//             {edit.agentId?.uniqueId}
//           </button>,
//           new Date(edit.editedAt).toLocaleString(),
//         ])}
//       />

//       {/* 💤 Inactive Agents */}
//       <div>
//         <h3 className="text-lg font-semibold mb-2 text-black">
//           Inactive Agents ({inactiveDays} days+): {inactiveAgents.length}
//         </h3>
//         <div className="flex gap-2 mb-4 text-black">
//           {[15, 30, 90].map((d) => (
//             <button
//               key={d}
//               onClick={() => setInactiveDays(d)}
//               className={`px-3 py-1 rounded text-sm border text-black ${inactiveDays === d ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
//                 }`}
//             >
//               {d} Days
//             </button>
//           ))}
//         </div>
//         <DataTable
//           columns={["Name", "Unique ID", "Last Login", "Last CIBIL Fetch"]}
//           rows={inactiveAgents.map((agent) => [
//             agent.name || agent.fullname,
//             <button className="text-blue-600 underline" onClick={() => navigate(`/admin/view/${agent._id}`)}>
//               {agent.uniqueId}
//             </button>,
//             agent.lastLogin ? new Date(agent.lastLogin).toLocaleDateString() : "Never",
//             agent.lastCibilFetch ? new Date(agent.lastCibilFetch).toLocaleDateString() : "Never",
//           ])}
//         />
//       </div>
//     </div>
//   );
// }

// function DataTable({ title, columns, rows }) {
//   return (
//     <div className="overflow-x-auto">
//       {title && <h3 className="font-semibold text-lg mb-2">{title}</h3>}
//       <table className="w-full table-auto text-sm border border-gray-200 shadow-sm rounded">
//         <thead className="bg-gray-100 text-gray-700">
//           <tr>
//             {columns.map((col, i) => (
//               <th key={i} className="p-2 border text-left font-medium">{col}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rows.length > 0 ? (
//             rows.map((row, i) => (
//               <tr key={i} className="even:bg-gray-50">
//                 {row.map((cell, j) => (
//                   <td key={j} className="p-2 border align-top">{cell}</td>
//                 ))}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={columns.length} className="p-3 text-center text-gray-500 italic">
//                 No data found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// src/pages/AdminTotalAgents.jsx
import React, { useEffect, useState } from "react";
import adminAxios from "../utils/axiosadmin";
import { useNavigate } from "react-router-dom";

export default function AdminTotalAgents() {
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [editedAgents, setEditedAgents] = useState([]);
  const [inactiveAgents, setInactiveAgents] = useState([]);
  const [inactiveDays, setInactiveDays] = useState(15);
  const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
  const [lifetimeSelected, setLifetimeSelected] = useState(true);
  const navigate = useNavigate();

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

  const fetchSearchResults = async () => {
    const allFilters = {
      ...filters,
      ...dateRange,
    };

    const hasAnyFilter = Object.values(allFilters).some((v) =>
      typeof v === "string" ? v.trim() !== "" : !!v
    );

    try {
      const res =
        hasAnyFilter && !lifetimeSelected
          ? await adminAxios.get(`/admin/agents/search?${new URLSearchParams(allFilters)}`)
          : await adminAxios.get("/admin/agents/search?lifetime=true");

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

  useEffect(() => {
    fetchSearchResults();
  }, []);

  useEffect(() => {
    fetchSearchResults();
  }, [filters, dateRange]);

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setLifetimeSelected(false);
  };

  const handleDateChange = (e) => {
    setDateRange((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setLifetimeSelected(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults();
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Admin Panel - Total Agents</h2>

      {/* Filters (unchanged) */}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-3 text-sm">
        <input name="name" placeholder="Name" onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="state" placeholder="State" onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="city" placeholder="City" onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="uniqueId" placeholder="Unique ID" onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="category" placeholder="Category" onChange={handleChange} className="border px-3 py-2 rounded" />
        <select name="status" onChange={handleChange} className="border px-3 py-2 rounded">
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="deactivated">Deactivated</option>
          <option value="deleted">Deleted</option>
        </select>
        <select name="gstType" onChange={handleChange} className="border px-3 py-2 rounded">
          <option value="">GST Type</option>
          <option value="GST">GST Registered</option>
          <option value="Non-GST">Non-GST</option>
        </select>

        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value === "today") {
              const today = new Date().toISOString().split("T")[0];
              setDateRange({ fromDate: today, toDate: today });
              setLifetimeSelected(false);
            } else if (value === "yesterday") {
              const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
              setDateRange({ fromDate: yesterday, toDate: yesterday });
              setLifetimeSelected(false);
            } else {
              setFilters({});
              setDateRange({ fromDate: "", toDate: "" });
              setLifetimeSelected(true);
            }
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="">Lifetime Filter</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-2 md:col-span-1 hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div className="text-sm font-semibold text-blue-700 mb-2">
        Total Agents Found: {searchResults.length}
      </div>

      {/* Search Results: navigate by uniqueId now */}
      <DataTable
        title="Search Results"
        columns={[
          "Name", "State", "City", "Pincode", "Category",
          "Status", "Last CIBIL Fetch", "Unique ID", "GST", "Total Reports"
        ]}
        rows={searchResults.map((a) => [
          a.name || a.fullname,
          a.state,
          a.city,
          a.pincode,
          a.category,
          a.computedStatus || "N/A",
          a.lastCibilFetch ? new Date(a.lastCibilFetch).toLocaleDateString() : "N/A",
          <button
            className="text-blue-600 underline"
            onClick={() => navigate(`/admin/user/${a.uniqueId}`)}
          >
            {a.uniqueId}
          </button>,
          a.gstType || "N/A",
          a.totalReports || 0,
        ])}
      />

      {/* Edited Agents: also navigate by uniqueId (agentId may be populated) */}
      <DataTable
        title={`Edited Agent Profiles (${editedAgents.length})`}
        columns={["Agent Name", "Unique ID", "Edited At"]}
        rows={editedAgents.map((edit) => [
          edit.agentId?.fullname || edit.agentId?.name || "N/A",
          <button
            className="text-blue-600 underline"
            onClick={() => {
              // try agentId.uniqueId if available, otherwise use edit.uniqueId or edit.agentUniqueId
              const u = edit.agentId?.uniqueId || edit.uniqueId || edit.agentUniqueId;
              if (u) navigate(`/admin/user/${u}?view=edited`);
              else if (edit.agentId?._id) navigate(`/admin/user-by-id/${edit.agentId._id}?view=edited`);
              else alert("Unique ID not available for this edit record");
            }}
          >
            {edit.agentId?.uniqueId || edit.uniqueId || "N/A"}
          </button>,
          new Date(edit.editedAt).toLocaleString(),
        ])}
      />

      {/* Inactive Agents - navigate by uniqueId */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-black">
          Inactive Agents ({inactiveDays} days+): {inactiveAgents.length}
        </h3>
        <div className="flex gap-2 mb-4 text-black">
          {[15, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setInactiveDays(d)}
              className={`px-3 py-1 rounded text-sm border text-black ${inactiveDays === d ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {d} Days
            </button>
          ))}
        </div>
        <DataTable
          columns={["Name", "Unique ID", "Last Login", "Last CIBIL Fetch"]}
          rows={inactiveAgents.map((agent) => [
            agent.name || agent.fullname,
            <button className="text-blue-600 underline" onClick={() => navigate(`/admin/user/${agent.uniqueId}`)}>
              {agent.uniqueId}
            </button>,
            agent.lastLogin ? new Date(agent.lastLogin).toLocaleDateString() : "Never",
            agent.lastCibilFetch ? new Date(agent.lastCibilFetch).toLocaleDateString() : "Never",
          ])}
        />
      </div>
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
              <th key={i} className="p-2 border text-left font-medium">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, i) => (
              <tr key={i} className="even:bg-gray-50">
                {row.map((cell, j) => (
                  <td key={j} className="p-2 border align-top">{cell}</td>
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
