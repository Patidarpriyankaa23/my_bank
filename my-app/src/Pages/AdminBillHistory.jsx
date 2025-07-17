
import React, { useState, useEffect } from 'react';
import axios from '../utils/userAxios';

const AdminBillHistory = () => {
  const [filters, setFilters] = useState({
    name: '',
    uniqueId: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('lifetime');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchData = async () => {
    try {
      const params = { ...filters };

      if (filter === 'today' || filter === 'yesterday') {
        params.filter = filter;
      } else if (filter === 'custom') {
        if (startDate && endDate) {
          params.startDate = startDate;
          params.endDate = endDate;
        }
      }

      const res = await axios.get('/admin/bills/search', { params });

      setData(res.data);
    } catch (err) {
      console.error('Error fetching bill history:', err);
    }
  };

  // Optional: Fetch data when filters change automatically
  // useEffect(() => {
  //   fetchData();
  // }, [filter, startDate, endDate]);

  return (
    <div className="pt-24 px-4">
      <h2 className="text-2xl font-semibold mb-4">Admin – Bill History</h2>

      {/* Filter Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
        <input
          type="text"
          placeholder="Agent Name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Unique ID"
          value={filters.uniqueId}
          onChange={(e) => setFilters({ ...filters, uniqueId: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="City"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="State"
          value={filters.state}
          onChange={(e) => setFilters({ ...filters, state: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Pincode"
          value={filters.pincode}
          onChange={(e) => setFilters({ ...filters, pincode: e.target.value })}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={fetchData}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Search
      </button>

      {/* Date Filter Buttons */}
      <div className="flex gap-2 flex-wrap mb-4">
        <button onClick={() => setFilter('lifetime')} className="bg-gray-200 px-4 py-1 rounded">Lifetime</button>
        <button onClick={() => setFilter('today')} className="bg-gray-200 px-4 py-1 rounded">Today</button>
        <button onClick={() => setFilter('yesterday')} className="bg-gray-200 px-4 py-1 rounded">Yesterday</button>
        <button onClick={() => setFilter('custom')} className="bg-gray-200 px-4 py-1 rounded">Custom Date</button>
      </div>

      {/* Custom Date Inputs */}
      {filter === 'custom' && (
        <div className="flex gap-4 mb-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
      )}

      {/* Data Table */}
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Agent ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">City</th>
            <th className="p-2 border">State</th>
            <th className="p-2 border">Pincode</th>
            <th className="p-2 border">Total Bills</th>
            <th className="p-2 border">Last Bill Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((d) => (
              <tr key={d.id} className="text-center">
                <td className="border p-2">{d.id}</td>
                <td className="border p-2">{d.name}</td>
                <td className="border p-2">{d.city}</td>
                <td className="border p-2">{d.state}</td>
                <td className="border p-2">{d.pincode}</td>
                <td className="border p-2">{d.totalBills}</td>
                <td className="border p-2">{new Date(d.lastBillDate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBillHistory;
