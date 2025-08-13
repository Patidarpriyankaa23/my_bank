// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import userAxios from "../utils/userAxios";

// export default function ReducingReportEmi() {
//   const location = useLocation();
//   const { amount, interest, tenure, tenureType } = location.state || {};

//   const [report, setReport] = useState(null);

//   useEffect(() => {
//     if (amount && interest && tenure) {
//       userAxios
//         .post("/myemi/report", { amount, interest, tenure, tenureType })
//         .then((res) => {
//           setReport(res.data);
//         })
//         .catch((err) => {
//           console.error("Fetch error:", err.message);
//         });
//     }
//   }, [amount, interest, tenure, tenureType]);

//   if (!report) return <div className="p-4">Loading report...</div>;

//   const { emi, monthlyReport, yearlyReport, totalPrincipal, totalInterest } = report;

//   // Group months by year
//   const monthByYear = {};
//   monthlyReport.forEach((item) => {
//     if (!monthByYear[item.year]) monthByYear[item.year] = [];
//     monthByYear[item.year].push(item);
//   });

//   return (
//     <div className="p-6 max-w-screen-xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Reducing EMI Report</h2>

//       {/* Yearly Report */}
//       <div className="mb-10">
//         <h3 className="text-xl font-semibold mb-2">Yearly Report</h3>
//         <table className="w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 border">Year</th>
//               <th className="p-2 border">Principal Paid</th>
//               <th className="p-2 border">Interest Paid</th>
//               <th className="p-2 border">Year End Loan Balance</th>
//             </tr>
//           </thead>
//           <tbody>
//             {yearlyReport.map((item) => (
//               <tr key={item.year} className="text-center">
//                 <td className="p-2 border">{item.year}</td>
//                 <td className="p-2 border">{item.principal.toFixed(2)}</td>
//                 <td className="p-2 border">{item.interest.toFixed(2)}</td>
//                 <td className="p-2 border">{item.balance.toFixed(2)}</td>
//               </tr>
//             ))}
//             <tr className="font-bold bg-gray-50 text-center">
//               <td className="p-2 border">Total</td>
//               <td className="p-2 border">{totalPrincipal.toFixed(2)}</td>
//               <td className="p-2 border">{totalInterest.toFixed(2)}</td>
//               <td className="p-2 border">{0.0}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Monthly Report */}
//       <div>
//         <h3 className="text-xl font-semibold mb-2">Monthly Report</h3>
//         {Object.entries(monthByYear).map(([year, months]) => (
//           <div key={year} className="mb-8">
//             <h4 className="text-lg font-medium mb-1">Year {year}</h4>
//             <table className="w-full border border-gray-300 mb-2">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-2 border">Month</th>
//                   <th className="p-2 border">Principal Paid</th>
//                   <th className="p-2 border">Interest Paid</th>
//                   <th className="p-2 border">Month End Loan Balance</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {months.map((item, index) => (
//                   <tr key={index} className="text-center">
//                     <td className="p-2 border">{item.month - (year - 1) * 12}</td>
//                     <td className="p-2 border">{item.principal.toFixed(2)}</td>
//                     <td className="p-2 border">{item.interest.toFixed(2)}</td>
//                     <td className="p-2 border">{item.balance.toFixed(2)}</td>
//                   </tr>
//                 ))}
//                 <tr className="font-semibold bg-gray-50 text-center">
//                   <td className="p-2 border">Total</td>
//                   <td className="p-2 border">
//                     {months.reduce((sum, m) => sum + m.principal, 0).toFixed(2)}
//                   </td>
//                   <td className="p-2 border">
//                     {months.reduce((sum, m) => sum + m.interest, 0).toFixed(2)}
//                   </td>
//                   <td className="p-2 border">-</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import userAxios from "../utils/userAxios";

export default function ReducingReportEmi() {
  const location = useLocation();
  const { amount, interest, tenure, tenureType } = location.state || {};

  const [report, setReport] = useState(null);
  const [viewMode, setViewMode] = useState("yearly"); // toggle: yearly | monthly

  useEffect(() => {
    if (amount && interest && tenure) {
      userAxios
        .post("/myemi/report", { amount, interest, tenure, tenureType })
        .then((res) => {
          setReport(res.data);
        })
        .catch((err) => {
          console.error("Fetch error:", err.message);
        });
    }
  }, [amount, interest, tenure, tenureType]);

  if (!report) return <div className="p-4">Loading report...</div>;

  const { monthlyReport, yearlyReport, totalPrincipal, totalInterest } = report;

  // Group months by year
  const monthByYear = {};
  monthlyReport.forEach((item) => {
    if (!monthByYear[item.year]) monthByYear[item.year] = [];
    monthByYear[item.year].push(item);
  });

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reducing EMI Report</h2>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setViewMode("yearly")}
          className={`px-4 py-2 rounded ${
            viewMode === "yearly" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Yearly
        </button>
        <button
          onClick={() => setViewMode("monthly")}
          className={`px-4 py-2 rounded ${
            viewMode === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Yearly Report */}
      {viewMode === "yearly" && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-2">Yearly Report</h3>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Year</th>
                <th className="p-2 border">Principal Paid</th>
                <th className="p-2 border">Interest Paid</th>
                <th className="p-2 border">Year End Loan Balance</th>
              </tr>
            </thead>
            <tbody>
              {yearlyReport.map((item) => (
                <tr key={item.year} className="text-center">
                  <td className="p-2 border">{item.year}</td>
                  <td className="p-2 border">{item.principal.toFixed(2)}</td>
                  <td className="p-2 border">{item.interest.toFixed(2)}</td>
                  <td className="p-2 border">{item.balance.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50 text-center">
                <td className="p-2 border">Total</td>
                <td className="p-2 border">{totalPrincipal.toFixed(2)}</td>
                <td className="p-2 border">{totalInterest.toFixed(2)}</td>
                <td className="p-2 border">0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Monthly Report */}
      {viewMode === "monthly" && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Monthly Report</h3>
          {Object.entries(monthByYear).map(([year, months]) => (
            <div key={year} className="mb-8">
              <h4 className="text-lg font-medium mb-1">Year {year}</h4>
              <table className="w-full border border-gray-300 mb-2">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Month</th>
                    <th className="p-2 border">Principal Paid</th>
                    <th className="p-2 border">Interest Paid</th>
                    <th className="p-2 border">Month End Loan Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="p-2 border">
                        {item.month - (item.year - 1) * 12}
                      </td>
                      <td className="p-2 border">{item.principal.toFixed(2)}</td>
                      <td className="p-2 border">{item.interest.toFixed(2)}</td>
                      <td className="p-2 border">{item.balance.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="font-semibold bg-gray-50 text-center">
                    <td className="p-2 border">Total</td>
                    <td className="p-2 border">
                      {months
                        .reduce((sum, m) => sum + m.principal, 0)
                        .toFixed(2)}
                    </td>
                    <td className="p-2 border">
                      {months
                        .reduce((sum, m) => sum + m.interest, 0)
                        .toFixed(2)}
                    </td>
                    <td className="p-2 border">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
