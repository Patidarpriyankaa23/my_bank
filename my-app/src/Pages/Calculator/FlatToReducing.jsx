// // import React, { useState } from "react";

// // // Helper function to calculate EMI
// // function calculateEMI(principal, annualRate, months) {
// //   const r = annualRate / (12 * 100); // monthly interest rate
// //   return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
// // }

// // // Function to find reducing rate from flat EMI using binary search
// // function findReducingRateFromEMI(principal, emi, months) {
// //   let low = 0;
// //   let high = 100;
// //   let epsilon = 0.0001;
// //   let rate;

// //   while (high - low > epsilon) {
// //     let mid = (low + high) / 2;
// //     let r = mid / (12 * 100);
// //     let calculatedEMI =
// //       (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);

// //     if (calculatedEMI > emi) {
// //       high = mid;
// //     } else {
// //       low = mid;
// //     }

// //     rate = mid;
// //   }

// //   return rate;
// // }

// // const FlatToReducingAccurate = () => {
// //   const [flatRate, setFlatRate] = useState("");
// //   const [tenure, setTenure] = useState("");
// //   const [tenureType, setTenureType] = useState("year");
// //   const [reducingRate, setReducingRate] = useState(null);

// //   const handleReset = () => {
// //     setFlatRate("");
// //     setTenure("");
// //     setTenureType("year");
// //     setReducingRate(null);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const F = parseFloat(flatRate);
// //     const T = parseFloat(tenure);
// //     if (!F || !T || F <= 0 || T <= 0) {
// //       alert("Enter valid Flat Interest Rate and Tenure");
// //       return;
// //     }

// //     const loanAmount = 100000; // assumed ₹1,00,000 loan
// //     const tenureInMonths = tenureType === "month" ? T : T * 12;
// //     const totalFlatInterest = (loanAmount * F * (tenureInMonths / 12)) / 100;
// //     const totalPayment = loanAmount + totalFlatInterest;
// //     const flatEMI = totalPayment / tenureInMonths;

// //     // Find reducing interest rate from EMI
// //     const reducingAnnualRate = findReducingRateFromEMI(loanAmount, flatEMI, tenureInMonths);

// //     setReducingRate(reducingAnnualRate.toFixed(2));
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
// //       <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
// //         <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
// //            Flat ➜ Reducing Rate Calculator
// //         </h1>

// //         <form onSubmit={handleSubmit} className="space-y-5">
// //           {/* Flat Interest Rate */}
// //           <div>
// //             <label className="block text-sm font-semibold text-gray-700 mb-1">
// //               Flat Interest Rate (%)
// //             </label>
// //             <input
// //               type="number"
// //               value={flatRate}
// //               onChange={(e) => setFlatRate(e.target.value)}
// //               step="0.01"
// //               placeholder="Enter flat interest rate"
// //               className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
// //               required
// //             />
// //           </div>

// //           {/* Tenure and Type */}
// //           <div>
// //             <label className="block text-sm font-semibold text-gray-700 mb-1">Tenure</label>
// //             <div className="flex gap-3">
// //               <input
// //                 type="number"
// //                 value={tenure}
// //                 onChange={(e) => setTenure(e.target.value)}
// //                 placeholder="Enter tenure"
// //                 className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
// //                 required
// //               />
// //               <select
// //                 value={tenureType}
// //                 onChange={(e) => setTenureType(e.target.value)}
// //                 className="p-2 border rounded bg-white focus:outline-none"
// //               >
// //                 <option value="year">Year(s)</option>
// //                 <option value="month">Month(s)</option>
// //               </select>
// //             </div>
// //           </div>

// //           {/* Buttons */}
// //           <div className="flex justify-between">
// //             <button
// //               type="submit"
// //               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
// //             >
// //               Calculate
// //             </button>
// //             <button
// //               type="button"
// //               onClick={handleReset}
// //               className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
// //             >
// //               Reset
// //             </button>
// //           </div>
// //         </form>

// //         {/* Result */}
// //         {reducingRate && (
// //           <div className="mt-6 bg-green-100 p-4 rounded text-center">
// //             <p className="text-lg font-semibold text-green-800">
// //                Reducing Interest Rate: <br />
// //               <span className="text-2xl text-green-900">{reducingRate}%</span>
// //             </p>
// //             <p className="text-xs mt-2 text-gray-500">(Assumed loan ₹1,00,000 for accuracy)</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default FlatToReducingAccurate;

// import React, { useState } from "react";
// import userAxios from "../../utils/userAxios";

// const FlatToReducingAccurate = () => {
//   const [flatRate, setFlatRate] = useState("");
//   const [tenure, setTenure] = useState("");
//   const [tenureType, setTenureType] = useState("year");
//   const [reducingRate, setReducingRate] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleReset = () => {
//     setFlatRate("");
//     setTenure("");
//     setTenureType("year");
//     setReducingRate(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const F = parseFloat(flatRate);
//     const T = parseFloat(tenure);
//     if (!F || !T || F <= 0 || T <= 0) {
//       alert("Enter valid Flat Interest Rate and Tenure");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await userAxios.post("/convert/flat-to-reducing", {
//         flatRate: F,
//         tenure: T,
//         tenureType: tenureType === "year" ? "years" : "months",
//       });

//       const result = response.data.reducingRate;
//       setReducingRate(result);
//     } catch (error) {
//       console.error("Error fetching reducing rate:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
//         <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
//           Flat ➜ Reducing Rate Calculator
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Flat Interest Rate */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Flat Interest Rate (%)
//             </label>
//             <input
//               type="number"
//               value={flatRate}
//               onChange={(e) => setFlatRate(e.target.value)}
//               step="0.01"
//               placeholder="Enter flat interest rate"
//               className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//               required
//             />
//           </div>

//           {/* Tenure and Type */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">Tenure</label>
//             <div className="flex gap-3">
//               <input
//                 type="number"
//                 value={tenure}
//                 onChange={(e) => setTenure(e.target.value)}
//                 placeholder="Enter tenure"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                 required
//               />
//               <select
//                 value={tenureType}
//                 onChange={(e) => setTenureType(e.target.value)}
//                 className="p-2 border rounded bg-white focus:outline-none"
//               >
//                 <option value="year">Year(s)</option>
//                 <option value="month">Month(s)</option>
//               </select>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-between">
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
//             >
//               {loading ? "Calculating..." : "Calculate"}
//             </button>
//             <button
//               type="button"
//               onClick={handleReset}
//               className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition">
//               Reset
//             </button>
//           </div>
//         </form>

//         {/* Result */}
//         {reducingRate && (
//           <div className="mt-6 bg-green-100 p-4 rounded text-center">
//             <p className="text-lg font-semibold text-green-800">
//               Reducing Interest Rate: <br />
//               <span className="text-2xl text-green-900">{reducingRate}%</span>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FlatToReducingAccurate;
import React, { useState } from "react";
import userAxios from "../../utils/userAxios";

const FlatToReducingAccurate = () => {
  const [flatRate, setFlatRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureType, setTenureType] = useState("year");
  const [reducingRate, setReducingRate] = useState(null);
  const [loading, setLoading] = useState(false);

  // Number to words converter (basic)
  const numberToWords = (num) => {
    if (!num && num !== 0) return "";
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
      "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    const inWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000) return a[Math.floor(n / 100)] + " Hundred " + (n % 100 ? inWords(n % 100) : "");
      if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand " + (n % 1000 ? inWords(n % 1000) : "");
      if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh " + (n % 100000 ? inWords(n % 100000) : "");
      return inWords(Math.floor(n / 10000000)) + " Crore " + (n % 10000000 ? inWords(n % 10000000) : "");
    };

    return inWords(num).trim();
  };

  const handleReset = () => {
    setFlatRate("");
    setTenure("");
    setTenureType("year");
    setReducingRate(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const F = parseFloat(flatRate);
    const T = parseFloat(tenure);
    if (!F || !T || F <= 0 || T <= 0) {
      alert("Enter valid Flat Interest Rate and Tenure");
      return;
    }

    try {
      setLoading(true);
      const response = await userAxios.post("/convert/flat-to-reducing", {
        flatRate: F,
        tenure: T,
        tenureType: tenureType === "year" ? "years" : "months",
      });

      const result = response.data.reducingRate;
      setReducingRate(result);
    } catch (error) {
      console.error("Error fetching reducing rate:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Flat ➜ Reducing Rate Calculator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Flat Interest Rate */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Flat Interest Rate (%)
            </label>
            <input
              type="number"
              value={flatRate}
              onChange={(e) => setFlatRate(e.target.value)}
              step="0.01"
              placeholder="Enter flat interest rate"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              required
            />
            {flatRate && (
              <p className="text-sm text-gray-600 mt-1 italic">
                {numberToWords(Math.floor(Number(flatRate)))}
              </p>
            )}
          </div>

          {/* Tenure and Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tenure</label>
            <div className="flex gap-3">
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder="Enter tenure"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                required
              />
              <select
                value={tenureType}
                onChange={(e) => setTenureType(e.target.value)}
                className="p-2 border rounded bg-white focus:outline-none"
              >
                <option value="year">Year(s)</option>
                <option value="month">Month(s)</option>
              </select>
            </div>
            {tenure && (
              <p className="text-sm text-gray-600 mt-1 italic">
                {numberToWords(Math.floor(Number(tenure)))}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              disabled={loading}
            >
              {loading ? "Calculating..." : "Calculate"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Result */}
        {reducingRate && (
          <div className="mt-6 bg-green-100 p-4 rounded text-center">
            <p className="text-lg font-semibold text-green-800">
              Reducing Interest Rate: <br />
              <span className="text-2xl text-green-900">{reducingRate}%</span>
            </p>
            <p className="mt-1 italic text-sm text-gray-700">
              ({numberToWords(Math.floor(Number(reducingRate)))} percent)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlatToReducingAccurate;
