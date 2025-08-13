// // import React, { useEffect, useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import userAxios from "../utils/userAxios";

// // const FlatEmiReport = () => {
// //   const { state } = useLocation();
// //   const navigate = useNavigate();
// //   const { amount, interest, tenure, tenureType } = state || {};

// //   const [activeTab, setActiveTab] = useState("yearly");
// //   const [report, setReport] = useState(null);

// //   // Redirect if data missing
// //   // useEffect(() => {
// //   //   if (!amount || !interest || !tenure || !tenureType) {
// //   //     alert("Missing data. Please calculate EMI first.");
// //   //     navigate("/emi/flat");
// //   //   }
// //   // }, [amount, interest, tenure, tenureType, navigate]);

// //   useEffect(() => {
// //     const inputs = [amount, interest, tenure, tenureType];
// //     const filled = inputs.filter(Boolean).length;

// //     if (filled >= 3) {
// //       userAxios
// //         .post("/flat-emi-report", { amount, interest, tenure, tenureType })
// //         .then(res => setReport(res.data))
// //         .catch(console.error);
// //     }
// //   }, [amount, interest, tenure, tenureType]);


// //   if (!report) return <p className="text-center mt-10">Loading...</p>;

// //   return (
// //     <div className="max-w-6xl mx-auto p-6 space-y-6">
// //       {/* Tabs Card */}
// //       <div className="bg-white rounded-xl shadow-md p-4 flex justify-center gap-4 sticky top-4 z-10 mt-10">
// //         {["yearly", "monthly"].map(tab => (
// //           <button
// //             key={tab}
// //             onClick={() => setActiveTab(tab)}
// //             className={`px-6 py-2 font-medium rounded-full transition ${activeTab === tab
// //               ? "bg-blue-600 text-white"
// //               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
// //               }`}
// //           >
// //             {tab === "yearly" ? "Yearly Report" : "Monthly Report"}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Yearly */}
// //       {activeTab === "yearly" && (
// //         <div className="bg-white rounded-xl shadow overflow-hidden">
// //           <h2 className="text-2xl font-semibold p-4 border-b mb-11">📘 Yearly Report</h2>
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full text-center">
// //               <thead className="bg-gray-100">
// //                 <tr>
// //                   <th className="p-3">Year</th>
// //                   <th className="p-3">Principal Paid (₹)</th>
// //                   <th className="p-3">Interest Paid (₹)</th>
// //                   <th className="p-3">Year End Balance (₹)</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y">
// //                 {report.yearlyData.map(item => (
// //                   <tr key={item.year}>
// //                     <td className="p-3">{item.year}</td>
// //                     <td className="p-3">{item.principal}</td>
// //                     <td className="p-3">{item.interest}</td>
// //                     <td className="p-3">{item.balance}</td>
// //                   </tr>
// //                 ))}
// //                 <tr className="font-bold bg-gray-50">
// //                   <td className="p-3">Total</td>
// //                   <td className="p-3">{report.totalPrincipal}</td>
// //                   <td className="p-3">{report.totalInterest}</td>
// //                   <td className="p-3">-</td>
// //                 </tr>
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       )}

// //       {/* Monthly */}
// //       {activeTab === "monthly" && (
// //         <div className="space-y-8">
// //           {report.monthlyData.map(yearItem => (
// //             <div
// //               key={yearItem.year}
// //               className="bg-white rounded-xl shadow overflow-hidden"
// //             >
// //               <h3 className="text-xl font-semibold p-4 border-b">
// //                 📘 Year {yearItem.year}
// //               </h3>
// //               <div className="overflow-x-auto">
// //                 <table className="min-w-full text-center">
// //                   <thead className="bg-gray-100">
// //                     <tr>
// //                       <th className="p-3">Month</th>
// //                       <th className="p-3">Principal Paid (₹)</th>
// //                       <th className="p-3">Interest Paid (₹)</th>
// //                       <th className="p-3">Balance (₹)</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="divide-y">
// //                     {yearItem.data.map((m, i) => (
// //                       <tr key={i}>
// //                         <td className="p-3">{m.month}</td>
// //                         <td className="p-3">{m.principal}</td>
// //                         <td className="p-3">{m.interest}</td>
// //                         <td className="p-3">{m.balance}</td>
// //                       </tr>
// //                     ))}
// //                     <tr className="font-bold bg-gray-50">
// //                       <td className="p-3">Total</td>
// //                       <td className="p-3">{yearItem.totalPrincipal}</td>
// //                       <td className="p-3">{yearItem.totalInterest}</td>
// //                       <td className="p-3">-</td>
// //                     </tr>
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default FlatEmiReport;
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import userAxios from "../utils/userAxios";

// const FlatEmiReport = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { amount, interest, tenure, tenureType } = state || {};

//   const [activeTab, setActiveTab] = useState("yearly");
//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Redirect if missing input
//   useEffect(() => {
//     if (!amount || !interest || !tenure || !tenureType) {
//       alert("Missing data. Please calculate EMI first.");
//       navigate("/emi/flat");
//     }
//   }, [amount, interest, tenure, tenureType, navigate]);

//   // Fetch report
//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         const res = await userAxios.post("/flat-emi-report", {
//           amount,
//           interest,
//           tenure,
//           tenureType,
//         });
//         setReport(res.data);
//       } catch (err) {
//         console.error("Error fetching EMI report:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (amount && interest && tenure && tenureType) {
//       fetchReport();
//     }
//   }, [amount, interest, tenure, tenureType]);

//   if (loading) return <p className="text-center mt-10">Loading report...</p>;

//   if (!report) return <p className="text-center mt-10 text-red-600">Unable to load report.</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-6">
//       {/* Tabs */}
//       <div className="bg-white rounded-xl shadow-md p-4 flex justify-center gap-4 sticky top-4 z-10 mt-10">
//         {["yearly", "monthly"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-6 py-2 font-medium rounded-full transition ${
//               activeTab === tab
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {tab === "yearly" ? "📘 Yearly Report" : "📗 Monthly Report"}
//           </button>
//         ))}
//       </div>

//       {/* Yearly Report */}
//       {activeTab === "yearly" && (
//         <div className="bg-white rounded-xl shadow overflow-hidden">
//           <h2 className="text-2xl font-semibold p-4 border-b mb-6">📘 Yearly Report</h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-center">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-3">Year</th>
//                   <th className="p-3">Principal Paid (₹)</th>
//                   <th className="p-3">Interest Paid (₹)</th>
//                   <th className="p-3">Year-End Balance (₹)</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {report?.yearlyData?.map((item) => (
//                   <tr key={item.year}>
//                     <td className="p-3">{item.year}</td>
//                     <td className="p-3">{item.principal}</td>
//                     <td className="p-3">{item.interest}</td>
//                     <td className="p-3">{item.balance}</td>
//                   </tr>
//                 ))}
//                 <tr className="font-bold bg-gray-50">
//                   <td className="p-3">Total</td>
//                   <td className="p-3">{report.totalPrincipal}</td>
//                   <td className="p-3">{report.totalInterest}</td>
//                   <td className="p-3">-</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Monthly Report */}
//       {activeTab === "monthly" && (
//         <div className="space-y-8">
//           {report?.monthlyData?.map((yearItem) => (
//             <div key={yearItem.year} className="bg-white rounded-xl shadow overflow-hidden">
//               <h3 className="text-xl font-semibold p-4 border-b">📗 Year {yearItem.year}</h3>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full text-center">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="p-3">Month</th>
//                       <th className="p-3">Principal Paid (₹)</th>
//                       <th className="p-3">Interest Paid (₹)</th>
//                       <th className="p-3">Balance (₹)</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y">
//                     {yearItem.data.map((month, i) => (
//                       <tr key={i}>
//                         <td className="p-3">{month.month}</td>
//                         <td className="p-3">{month.principal}</td>
//                         <td className="p-3">{month.interest}</td>
//                         <td className="p-3">{month.balance}</td>
//                       </tr>
//                     ))}
//                     <tr className="font-bold bg-gray-50">
//                       <td className="p-3">Total</td>
//                       <td className="p-3">{yearItem.totalPrincipal}</td>
//                       <td className="p-3">{yearItem.totalInterest}</td>
//                       <td className="p-3">-</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlatEmiReport;
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userAxios from "../utils/userAxios";

const FlatEmiReport = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Destructure incoming state
  const { amount, interest, tenure, tenureType } = state || {};

  const [activeTab, setActiveTab] = useState("yearly");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate input
  useEffect(() => {
    const inputs = [amount, interest, tenure, tenureType];
    const filled = inputs.filter((i) => i !== undefined && i !== "").length;

    if (filled < 3) {
      alert("⚠️ Incomplete input! Please calculate first.");
      navigate("/emi/flat");
    }
  }, [amount, interest, tenure, tenureType, navigate]);

  // Fetch report from server
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await userAxios.post("/flat-emi-report", {
          amount,
          interest,
          tenure,
          tenureType,
        });

        if (res.data && res.data.success) {
          setReport(res.data);
        } else {
          throw new Error("Empty report");
        }
      } catch (err) {
        console.error("❌ Error fetching report:", err);
        setReport(null);
      } finally {
        setLoading(false);
      }
    };

    if (amount && interest && tenure && tenureType) {
      fetchReport();
    }
  }, [amount, interest, tenure, tenureType]);

  // Show loading/error
  if (loading) return <p className="text-center mt-10">📊 Loading EMI Report...</p>;
  if (!report) return <p className="text-center mt-10 text-red-600">❌ Failed to load report.</p>;

  // UI Render
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Toggle Tabs */}
      <div className="bg-white rounded-xl shadow-md p-4 flex justify-center gap-4 sticky top-4 z-10 mt-10">
        {["yearly", "monthly"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 font-medium rounded-full transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab === "yearly" ? "📘 Yearly Report" : "📗 Monthly Report"}
          </button>
        ))}
      </div>

      {/* Yearly Report */}
      {activeTab === "yearly" && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <h2 className="text-2xl font-semibold p-4 border-b mb-6">📘 Yearly EMI Report</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Year</th>
                  <th className="p-3">Principal Paid (₹)</th>
                  <th className="p-3">Interest Paid (₹)</th>
                  <th className="p-3">Year-End Balance (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {report?.yearlyData?.map((item) => (
                  <tr key={item.year}>
                    <td className="p-3">{item.year}</td>
                    <td className="p-3">{item.principal}</td>
                    <td className="p-3">{item.interest}</td>
                    <td className="p-3">{item.balance}</td>
                  </tr>
                ))}
                <tr className="font-bold bg-gray-50">
                  <td className="p-3">Total</td>
                  <td className="p-3">{report.totalPrincipal}</td>
                  <td className="p-3">{report.totalInterest}</td>
                  <td className="p-3">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Monthly Report */}
      {activeTab === "monthly" && (
        <div className="space-y-8">
          {report?.monthlyData?.map((yearItem) => (
            <div key={yearItem.year} className="bg-white rounded-xl shadow overflow-hidden">
              <h3 className="text-xl font-semibold p-4 border-b">📗 Year {yearItem.year}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-center">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3">Month</th>
                      <th className="p-3">Principal Paid (₹)</th>
                      <th className="p-3">Interest Paid (₹)</th>
                      <th className="p-3">Balance (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {yearItem.data.map((month, i) => (
                      <tr key={i}>
                        <td className="p-3">{month.month}</td>
                        <td className="p-3">{month.principal}</td>
                        <td className="p-3">{month.interest}</td>
                        <td className="p-3">{month.balance}</td>
                      </tr>
                    ))}
                    <tr className="font-bold bg-gray-50">
                      <td className="p-3">Total</td>
                      <td className="p-3">{yearItem.totalPrincipal}</td>
                      <td className="p-3">{yearItem.totalInterest}</td>
                      <td className="p-3">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlatEmiReport;


