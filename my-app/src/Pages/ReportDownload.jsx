import React, { useEffect, useState } from 'react';
import adminAxios from '../utils/axiosadmin';

export default function ReportsDownload() {
  const [reports, setReports] = useState([]);
  const [summary, setSummary] = useState({});
  const [filter, setFilter] = useState('lifetime');
  const [customDates, setCustomDates] = useState({ from: '', to: '' });
  const [search, setSearch] = useState({ name: '', state: '', city: '', pincode: '' });

  useEffect(() => {
    fetchReports();
  }, [filter, customDates]);

  const fetchReports = async () => {
    let params = new URLSearchParams();

    if (filter === 'custom') {
      if (customDates.from) params.append('from', customDates.from);
      if (customDates.to) params.append('to', customDates.to);
    } else {
      params.append('filter', filter);
    }

    Object.entries(search).forEach(([key, val]) => {
      if (val.trim()) params.append(key, val.trim());
    });

    const res = await adminAxios.get(`/admin/reports?${params}`);
    setReports(res.data.reports || []);
    setSummary(res.data.summary || {});
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchReports();
  };

  const filterOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Lifetime', value: 'lifetime' },
    { label: 'Custom', value: 'custom' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reports Download</h2>

      {/* ✅ Filter Buttons */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-4 py-2 rounded-lg border text-sm ${
              filter === opt.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ✅ Custom Date Picker */}
      {filter === 'custom' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="text-sm">From</label>
            <input
              type="date"
              value={customDates.from}
              onChange={(e) =>
                setCustomDates((prev) => ({ ...prev, from: e.target.value }))
              }
              className="border w-full px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">To</label>
            <input
              type="date"
              value={customDates.to}
              onChange={(e) =>
                setCustomDates((prev) => ({ ...prev, to: e.target.value }))
              }
              className="border w-full px-3 py-2 rounded"
            />
          </div>
        </div>
      )}

      {/* ✅ Search Form */}
      <form
        onSubmit={handleSearch}
        className="grid md:grid-cols-4 gap-3 mb-6 text-sm"
      >
        <input
          name="name"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
          placeholder="Name"
          className="border px-3 py-2 rounded"
        />
        <input
          name="state"
          value={search.state}
          onChange={(e) => setSearch({ ...search, state: e.target.value })}
          placeholder="State"
          className="border px-3 py-2 rounded"
        />
        <input
          name="city"
          value={search.city}
          onChange={(e) => setSearch({ ...search, city: e.target.value })}
          placeholder="City"
          className="border px-3 py-2 rounded"
        />
        <input
          name="pincode"
          value={search.pincode}
          onChange={(e) => setSearch({ ...search, pincode: e.target.value })}
          placeholder="Pincode"
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="md:col-span-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* ✅ Summary Count */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded p-4 shadow text-center">
          <h4 className="text-sm text-gray-600">Total Reports</h4>
          <p className="text-2xl font-bold text-blue-700">{summary.total || 0}</p>
        </div>
        {summary.byBureau &&
          Object.entries(summary.byBureau).map(([bureau, count]) => (
            <div
              key={bureau}
              className="bg-white border rounded p-4 shadow text-center"
            >
              <h4 className="text-sm text-gray-600">{bureau.toUpperCase()} Reports</h4>
              <p className="text-2xl font-bold text-blue-700">{count}</p>
            </div>
          ))}
      </div>

      {/* ✅ Report Table */}
      <div className="overflow-x-auto border rounded shadow-sm">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Bureau</th>
              <th className="px-4 py-2 border">Fetched At</th>
              <th className="px-4 py-2 border">State</th>
              <th className="px-4 py-2 border">City</th>
              <th className="px-4 py-2 border">Pincode</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((r) => (
                <tr key={r._id} className="even:bg-gray-50">
                  <td className="px-4 py-2 border">{r.name}</td>
                  <td className="px-4 py-2 border">{r.bureau}</td>
                  <td className="px-4 py-2 border">
                    {new Date(r.fetchedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">{r.state}</td>
                  <td className="px-4 py-2 border">{r.city}</td>
                  <td className="px-4 py-2 border">{r.pincode}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500 italic">
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
//Report download on the basis of burea