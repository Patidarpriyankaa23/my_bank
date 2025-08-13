// import React, { useEffect, useState } from 'react';
// import adminAxios from '../utils/axiosadmin';

// export default function ReportsDownload() {
//   const [reports, setReports] = useState([]);
//   const [summary, setSummary] = useState({ totalReports: 0 });
//   const [filter, setFilter] = useState('lifetime');
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [searchName, setSearchName] = useState('');
//   const [bureau, setBureau] = useState('');

//   useEffect(() => {
//     fetchReports();
//   }, [filter, fromDate, toDate, bureau, searchName]); 

//   const fetchReports = async () => {
//     try {
//       let url = `/admin/reports/filter?filter=${filter}&bureau=${bureau}`;


//       if (filter === 'custom' && fromDate && toDate) {
//         url += `&from=${fromDate}&to=${toDate}`;
//       }

//       if (searchName) {
//         url += `&name=${encodeURIComponent(searchName)}`;
//       }

//       const res = await adminAxios.get(url);
//       setReports(res.data.reports || []);
//       setSummary({ totalReports: res.data.totalReports || 0 });
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//       setReports([]);
//       setSummary({ totalReports: 0 });
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Reports Download</h2>

//       {/* 🔍 Filters Section */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         {['today', 'yesterday', 'lifetime', 'custom'].map((item) => (
//           <button
//             key={item}
//             onClick={() => setFilter(item)}
//             className={`px-3 py-1 border rounded ${filter === item ? 'bg-blue-600 text-white' : 'bg-gray-100'
//               }`}
//           >
//             {item.charAt(0).toUpperCase() + item.slice(1)}
//           </button>
//         ))}
//       </div>

//       {filter === 'custom' && (
//         <div className="mb-4 flex gap-4">
//           <input
//             type="date"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//             className="border p-2 rounded"
//           />
//           <input
//             type="date"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//             className="border p-2 rounded"
//           />
//         </div>
//       )}

//       {/* 🔎 Search + Bureau + Button */}
//       <div className="flex flex-wrap gap-4 mb-4 items-end">
//         <div>
//           <input
//             type="text"
//             value={searchName}
//             onChange={(e) => setSearchName(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 fetchReports(); 
//               }
//             }}
//             placeholder="Search by name"
//             className="border border-gray-300 px-3 py-2 rounded w-full"
//           />

//         </div>

//         <div>
//           <select
//             value={bureau}
//             onChange={(e) => setBureau(e.target.value)}
//             className="border p-2 rounded"
//           >
//           <option value="">-- Select Bureau --</option>
//             <option value="EXPERIAN">EXPERIAN</option>
//             <option value="CIBIL">CIBIL</option>
//             <option value="CRIF">CRIF</option>
//             <option value="EQUIFAX">EQUIFAX</option>
//           </select>
//         </div>

//         <div>
        
//           <button
//             onClick={fetchReports}
//             className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             🔍 Search
//           </button>

//         </div>
//       </div>

//       <div className="mb-4 font-semibold">
//         Total Reports: {summary.totalReports}
//       </div>

//       {/* 📄 Reports Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-2 border">#</th>
//               <th className="p-2 border">Customer Name</th>
//               <th className="p-2 border">Bureau</th>
//               <th className="p-2 border">Date</th>
//               <th className="p-2 border">PDF</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reports.length > 0 ? (
//               reports.map((report, index) => (
//                 <tr key={report._id || index}>
//                   <td className="p-2 border">{index + 1}</td>
//                   <td className="p-2 border">{report.customerName}</td>
//                   <td className="p-2 border">{report.bureau}</td>
//                   <td className="p-2 border">
//                     {report?.createdAt && !isNaN(new Date(report.createdAt))
//                       ? new Date(report.createdAt).toLocaleString('en-IN', {
//                         day: '2-digit',
//                         month: '2-digit',
//                         year: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit',
//                       })
//                       : 'N/A'}
//                   </td>

//                   <td className="p-2 border">
//                     <a
//                       href={report.pdf_url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 underline"
//                     >
//                       Download
//                     </a>


//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td className="p-4 text-center border" colSpan="5">
//                   No reports found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import adminAxios from '../utils/axiosadmin';

export default function ReportsDownload() {
  const [reports, setReports] = useState([]);
  const [summary, setSummary] = useState({ totalReports: 0 });
  const [filter, setFilter] = useState('lifetime');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchName, setSearchName] = useState('');
  const [bureau, setBureau] = useState('EXPERIAN');

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line
  }, [filter, fromDate, toDate, bureau, searchName]);

  const fetchReports = async () => {
    try {
      let url = `/admin/reports/filter?filter=${filter}&bureau=${bureau}`;

      if (filter === 'custom' && fromDate && toDate) {
        url += `&from=${fromDate}&to=${toDate}`;
      }

      if (searchName) {
        url += `&name=${encodeURIComponent(searchName)}`;
      }

      const res = await adminAxios.get(url);
      setReports(res.data.reports || []);
      setSummary({ totalReports: res.data.totalReports || 0 });
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReports([]);
      setSummary({ totalReports: 0 });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📊 Reports Download</h2>

      {/* 🔍 Filters Section */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['today', 'yesterday', 'lifetime', 'custom'].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-3 py-1 border rounded ${
              filter === item ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {/* 📅 Custom Date Range */}
      {filter === 'custom' && (
        <div className="mb-4 flex gap-4">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      )}

      {/* 🔎 Search Inputs */}
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchReports()}
          placeholder="Search by name or Unique ID"
          className="border border-gray-300 px-3 py-2 rounded w-full sm:w-64"
        />

        <select
          value={bureau}
          onChange={(e) => setBureau(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="EXPERIAN">EXPERIAN</option>
          <option value="CIBIL">CIBIL</option>
          <option value="CRIF">CRIF</option>
          <option value="EQUIFAX">EQUIFAX</option>
        </select>

        <button
          onClick={fetchReports}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🔍 Search
        </button>
      </div>

      <div className="mb-4 font-semibold">Total Reports: {summary.totalReports}</div>

      {/* 📄 Reports Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Customer Name</th>
                <th className="p-2 border">Unique ID</th>
              <th className="p-2 border">Bureau</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">PDF</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report, index) => (
                <tr key={report._id || index}>
                  <td className="p-2 border text-center">{index + 1}</td>
               <td className="p-2 border">{report?.customerName || 'N/A'}</td>

                    <td className="p-2 border">{report?.uniqueId || 'N/A'}</td>
                  <td className="p-2 border">{report.bureau}</td>
                  <td className="p-2 border">
                    {report?.createdAt
                      ? new Date(report.createdAt).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'N/A'}
                  </td>
                  <td className="p-2 border text-center">
                    <a
                      href={report.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center border">
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
