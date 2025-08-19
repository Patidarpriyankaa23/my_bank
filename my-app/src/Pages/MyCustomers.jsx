// import React, { useEffect, useState } from 'react';
// import axios from '../utils/userAxios';
// import { useUser } from '../contexts/UserContext.jsx';
// import { FaDownload } from 'react-icons/fa';
// import dayjs from 'dayjs';

// export default function MyCustomers() {
//   const { user } = useUser();

//   const [reportsCount, setReportsCount] = useState(0);
//   const [filter, setFilter] = useState('lifetime'); // today, yesterday, lifetime, custom
//   const [customDate, setCustomDate] = useState({ from: '', to: '' });
//   const [searchInputs, setSearchInputs] = useState({
//     name: '',
//     pan: '',
//     mobile: '',
//     bureau: ''
//   });
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchReportsCount();
//     fetchCustomers(); // initial fetch = lifetime
//   }, [filter]);

//   const fetchReportsCount = async () => {
//     try {
//       const res = await axios.get(`/customers/count/${user.uniqueId}`);
//       setReportsCount(res.data.count);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchCustomers = async () => {
//     setLoading(true);
//     try {
//       const params = {
//         filter,
//         from: customDate.from,
//         to: customDate.to,
//         ...searchInputs
//       };
//       const res = await axios.get(`/customers/${user.uniqueId}`, { params });
//       setCustomers(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//     setLoading(false);
//   };

//   const handleSearchChange = (e) => {
//     setSearchInputs({ ...searchInputs, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="pt-20 max-w-7xl mx-auto px-4 py-6 space-y-6">
//       <h1 className="text-3xl font-bold mb-4">My Customers</h1>

//       {/* Total Reports */}
//       <div className="bg-white shadow p-4 rounded-lg flex justify-between items-center">
//         <p className="text-lg font-medium">Total Civil Reports</p>
//         <p className="text-2xl font-bold">{reportsCount}</p>
//       </div>

//       {/* Filters */}
//       <div className="flex gap-4 flex-wrap items-center">
//         {['today', 'yesterday', 'lifetime', 'custom'].map((f) => (
//           <button
//             key={f}
//             onClick={() => setFilter(f)}
//             className={`px-4 py-2 rounded ${
//               filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200'
//             }`}
//           >
//             {f.charAt(0).toUpperCase() + f.slice(1)}
//           </button>
//         ))}
//         {filter === 'custom' && (
//           <div className="flex gap-2">
//             <input
//               type="date"
//               value={customDate.from}
//               onChange={(e) => setCustomDate({ ...customDate, from: e.target.value })}
//               className="border p-2 rounded"
//             />
//             <input
//               type="date"
//               value={customDate.to}
//               onChange={(e) => setCustomDate({ ...customDate, to: e.target.value })}
//               className="border p-2 rounded"
//             />
//           </div>
//         )}
//       </div>

//       {/* Search Inputs */}
//       <div className="flex gap-4 flex-wrap items-center">
//         <input
//           type="text"
//           placeholder="Customer Name"
//           name="name"
//           value={searchInputs.name}
//           onChange={handleSearchChange}
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           placeholder="PAN Number"
//           name="pan"
//           value={searchInputs.pan}
//           onChange={handleSearchChange}
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Mobile Number"
//           name="mobile"
//           value={searchInputs.mobile}
//           onChange={handleSearchChange}
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Bureau"
//           name="bureau"
//           value={searchInputs.bureau}
//           onChange={handleSearchChange}
//           className="border p-2 rounded"
//         />
//         <button
//           onClick={fetchCustomers}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Search
//         </button>
//       </div>

//       {/* Customers Table */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : customers.length === 0 ? (
//         <p>No customers found.</p>
//       ) : (
//         <div className="overflow-x-auto mt-4">
//           <table className="min-w-full bg-white shadow rounded-lg">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="p-2">Name</th>
//                 <th className="p-2">PAN No.</th>
//                 <th className="p-2">Mobile No.</th>
//                 <th className="p-2">Bureau</th>
//                 <th className="p-2">Report PDF</th>
//                 <th className="p-2">Fetched</th>
//               </tr>
//             </thead>
//             <tbody>
//               {customers.map((c) => (
//                 <tr key={c._id} className="border-b">
//                   <td className="p-2">{c.name}</td>
//                   <td className="p-2">{c.pan}</td>
//                   <td className="p-2">{c.mobile}</td>
//                   <td className="p-2">{c.bureau}</td>
//                   <td className="p-2">
//                     {c.reportPdf && (
//                       <a href={c.reportPdf} target="_blank" rel="noopener noreferrer">
//                         <FaDownload />
//                       </a>
//                     )}
//                   </td>
//                   <td className="p-2">
//                     {c.fetchedPdf && (
//                       <a href={c.fetchedPdf} target="_blank" rel="noopener noreferrer">
//                         <FaDownload />
//                       </a>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import axios from '../utils/userAxios';
import { useUser } from '../contexts/UserContext.jsx';
import { FaDownload } from 'react-icons/fa';
import dayjs from 'dayjs';

export default function MyCustomers() {
  const { user } = useUser();

  const [reportsCount, setReportsCount] = useState(0);
  const [filter, setFilter] = useState('lifetime');
  const [customDate, setCustomDate] = useState({ from: '', to: '' });
  const [searchInputs, setSearchInputs] = useState({
    name: '',
    pan: '',
    mobile: '',
    bureau: ''
  });
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReportsCount();
    fetchCustomers();
  }, [filter]);

  const fetchReportsCount = async () => {
    try {
      const res = await axios.get(`/customers/count/${user.uniqueId}`);
      setReportsCount(res.data.count);
    } catch (error) {
      console.error("Error fetching reports count:", error);
    }
  };

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const params = {
        filter,
        from: customDate.from,
        to: customDate.to,
        ...searchInputs
      };
      const res = await axios.get(`/customers/${user.uniqueId}`, { params });
      setCustomers(res.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
    setLoading(false);
  };

  const handleSearchChange = (e) => {
    setSearchInputs({ ...searchInputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">My Customers</h1>

      {/* Total Reports */}
      <div className="bg-white shadow p-4 rounded-lg flex justify-between items-center">
        <p className="text-lg font-medium">Total Cibil Reports</p>
        <p className="text-2xl font-bold">{reportsCount}</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap items-center">
        {['today', 'yesterday', 'lifetime', 'custom'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        {filter === 'custom' && (
          <div className="flex gap-2">
            <input
              type="date"
              value={customDate.from}
              onChange={(e) => setCustomDate({ ...customDate, from: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="date"
              value={customDate.to}
              onChange={(e) => setCustomDate({ ...customDate, to: e.target.value })}
              className="border p-2 rounded"
            />
          </div>
        )}
      </div>

      {/* Search Inputs */}
      <div className="flex gap-4 flex-wrap items-center">
        <input type="text" placeholder="Customer Name" name="name" value={searchInputs.name} onChange={handleSearchChange} className="border p-2 rounded"/>
        <input type="text" placeholder="PAN Number" name="pan" value={searchInputs.pan} onChange={handleSearchChange} className="border p-2 rounded"/>
        <input type="text" placeholder="Mobile Number" name="mobile" value={searchInputs.mobile} onChange={handleSearchChange} className="border p-2 rounded"/>
        <input type="text" placeholder="Bureau" name="bureau" value={searchInputs.bureau} onChange={handleSearchChange} className="border p-2 rounded"/>
        <button onClick={fetchCustomers} className="bg-green-600 text-white px-4 py-2 rounded">Search</button>
      </div>

      {/* Customers Table */}
      {loading ? (
        <p>Loading...</p>
      ) : customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Name</th>
                <th className="p-2">PAN No.</th>
                <th className="p-2">Mobile No.</th>
                <th className="p-2">Bureau</th>
                <th className="p-2">Report PDF</th>
                <th className="p-2">Fetched PDF</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c._id} className="border-b">
                  <td className="p-2">{c.name}</td>
                  <td className="p-2">{c.pan}</td>
                  <td className="p-2">{c.mobile}</td>
                  <td className="p-2">{c.bureau}</td>
                  <td className="p-2">
                    {c.reportPdf && <a href={c.reportPdf} target="_blank" rel="noopener noreferrer"><FaDownload /></a>}
                  </td>
                  <td className="p-2">
                    {c.fetchedPdf && <a href={c.fetchedPdf} target="_blank" rel="noopener noreferrer"><FaDownload /></a>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
