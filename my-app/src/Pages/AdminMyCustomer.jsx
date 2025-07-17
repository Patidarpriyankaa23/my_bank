import React, { useEffect, useState } from 'react';
import adminAxios from '../utils/axiosadmin';

export default function MyCustomers() {
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState('lifetime');
  const [search, setSearch] = useState({
    name: '',
    state: '',
    city: '',
    pincode: '',
    from: '',
    to: ''
  });

  useEffect(() => {
    fetchCustomers();
  }, [filter]);

  const fetchCustomers = async () => {
    const params = new URLSearchParams({
      ...search,
      filter,
    });
    const res = await adminAxios.get(`/admin/customers?${params}`);
    setCustomers(res.data.customers);
    setStats(res.data.stats);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchCustomers();
  };

  const filterOptions = [
    { label: 'Today', value: 'today', count: stats.todayCount || 0 },
    { label: 'Yesterday', value: 'yesterday', count: stats.yesterdayCount || 0 },
    { label: 'Lifetime', value: 'lifetime', count: stats.lifetimeCount || 0 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Customers</h2>

      {/* Filter Buttons with Count */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-4 py-2 rounded-lg border text-sm transition ${
              filter === opt.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {opt.label} <span className="ml-1 text-xs text-gray-500">({opt.count})</span>
          </button>
        ))}
        <div className="ml-auto text-sm font-medium text-green-700">
          Total CIBIL Reports: {stats.totalCibilReports || 0}
        </div>
      </div>

      {/* Search Filters */}
      <form
        onSubmit={handleSearch}
        className="grid md:grid-cols-4 gap-3 mb-6 text-sm"
      >
        <input
          name="name"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
          placeholder="Customer Name"
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

      {/* Table */}
      <div className="overflow-x-auto border rounded shadow-sm">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Mobile</th>
              <th className="px-4 py-2 border">State</th>
              <th className="px-4 py-2 border">City</th>
              <th className="px-4 py-2 border">Pincode</th>
              <th className="px-4 py-2 border">CIBIL Reports</th>
              <th className="px-4 py-2 border">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((cust) => (
                <tr key={cust._id} className="even:bg-gray-50">
                  <td className="px-4 py-2 border">{cust.name}</td>
                  <td className="px-4 py-2 border">{cust.email}</td>
                  <td className="px-4 py-2 border">{cust.mobile}</td>
                  <td className="px-4 py-2 border">{cust.state}</td>
                  <td className="px-4 py-2 border">{cust.city}</td>
                  <td className="px-4 py-2 border">{cust.pincode}</td>
                  <td className="px-4 py-2 border">{cust.cibilReports?.length || 0}</td>
                  <td className="px-4 py-2 border">
                    {new Date(cust.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500 italic">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
