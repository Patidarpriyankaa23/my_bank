// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import userAxios from "../../utils/userAxios";

// const ReducingToFlatRateConverter = () => {
//   const [reducingRate, setReducingRate] = useState("");
//   const [tenure, setTenure] = useState("");
//   const [tenureType, setTenureType] = useState("years"); // years or months
//   const [flatRate, setFlatRate] = useState(null);

//   const calculateFlatRate = async () => {
//     if (!reducingRate || !tenure || isNaN(reducingRate) || isNaN(tenure)) {
//       toast.error("Please enter valid numbers");
//       return;
//     }

//     let tenureYears = tenureType === "months" ? parseFloat(tenure) / 12 : parseFloat(tenure);

//     try {
//       const response = await userAxios.post("/interest/convert-reducing-to-flat", {
//         reducingRate,
//         tenure,
//         tenureType,
//       });


//       const { flatRate } = response.data;
//       setFlatRate(flatRate);
//     } catch (error) {
//       toast.error(
//         error.response?.data?.error || "Something went wrong. Please try again."
//       );
//     }
//   };

//   const handleReset = () => {
//     setReducingRate("");
//     setTenure("");
//     setFlatRate(null);
//     setTenureType("years");
//   };

//   return (
//     <div className="max-w-md mx-auto mt-14 bg-white shadow-lg rounded-xl p-6 mt-24">
//       <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
//         Reducing ➜ Flat Interest Converter
//       </h2>

//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Reducing Interest Rate (% per annum)
//           </label>
//           <input
//             type="number"
//             step="0.01"
//             className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={reducingRate}
//             onChange={(e) => setReducingRate(e.target.value)}
//             placeholder=""
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Tenure
//           </label>
//           <div className="flex gap-2">
//             <input
//               type="number"
//               step="1"
//               className="w-2/3 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={tenure}
//               onChange={(e) => setTenure(e.target.value)}
//               placeholder=""
//             />
//             <select
//               className="w-1/3 border border-gray-300 p-2 rounded"
//               value={tenureType}
//               onChange={(e) => setTenureType(e.target.value)}
//             >
//               <option value="years">Years</option>
//               <option value="months">Months</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex justify-between space-x-4 mt-4">
//           <button
//             onClick={calculateFlatRate}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//           >
//             Calculate
//           </button>
//           <button
//             onClick={handleReset}
//             className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
//           >
//             Reset
//           </button>
//         </div>

//         {flatRate && (
//           <div className="mt-6 p-4 bg-green-100 text-green-800 text-center rounded font-semibold">
//             Flat Interest Rate: <span className="text-lg">{flatRate}% per annum</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReducingToFlatRateConverter;
import React, { useState } from "react";
import { toast } from "react-toastify";
import userAxios from "../../utils/userAxios";

const ReducingToFlatRateConverter = () => {
  const [reducingRate, setReducingRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureType, setTenureType] = useState("years"); // years or months
  const [flatRate, setFlatRate] = useState(null);

  // Number to words converter (basic, supports up to crores)
  const numberToWords = (num) => {
    if (!num && num !== 0) return '';
    const a = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
      'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
      'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const inWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '');
      if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred ' + (n % 100 ? inWords(n % 100) : '');
      if (n < 100000) return inWords(Math.floor(n / 1000)) + ' Thousand ' + (n % 1000 ? inWords(n % 1000) : '');
      if (n < 10000000) return inWords(Math.floor(n / 100000)) + ' Lakh ' + (n % 100000 ? inWords(n % 100000) : '');
      return inWords(Math.floor(n / 10000000)) + ' Crore ' + (n % 10000000 ? inWords(n % 10000000) : '');
    };

    return inWords(num).trim();
  };

  const calculateFlatRate = async () => {
    if (!reducingRate || !tenure || isNaN(reducingRate) || isNaN(tenure)) {
      toast.error("Please enter valid numbers");
      return;
    }

    let tenureYears = tenureType === "months" ? parseFloat(tenure) / 12 : parseFloat(tenure);

    try {
      const response = await userAxios.post("/interest/convert-reducing-to-flat", {
        reducingRate,
        tenure,
        tenureType,
      });

      const { flatRate } = response.data;
      setFlatRate(flatRate);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  const handleReset = () => {
    setReducingRate("");
    setTenure("");
    setFlatRate(null);
    setTenureType("years");
  };

  return (
    <div className="max-w-md mx-auto mt-14 bg-white shadow-lg rounded-xl p-6 mt-24">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Reducing ➜ Flat Interest Converter
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reducing Interest Rate (% per annum)
          </label>
          <input
            type="number"
            step="0.01"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={reducingRate}
            onChange={(e) => setReducingRate(e.target.value)}
            placeholder=""
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          {reducingRate && (
            <p className="text-sm text-gray-600 mt-1 italic">
              {numberToWords(Math.floor(Number(reducingRate)))}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tenure
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              step="1"
              className="w-2/3 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder=""
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
            <select
              className="w-1/3 border border-gray-300 p-2 rounded"
              value={tenureType}
              onChange={(e) => setTenureType(e.target.value)}
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
          {tenure && (
            <p className="text-sm text-gray-600 mt-1 italic">
              {numberToWords(Math.floor(Number(tenure)))}
            </p>
          )}
        </div>

        <div className="flex justify-between space-x-4 mt-4">
          <button
            onClick={calculateFlatRate}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Calculate
          </button>
          <button
            onClick={handleReset}
            className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
          >
            Reset
          </button>
        </div>

        {flatRate !== null && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 text-center rounded font-semibold">
            Flat Interest Rate: <span className="text-lg">{flatRate}% per annum</span>
            <p className="mt-1 italic text-sm text-gray-700">
              ({numberToWords(Math.floor(flatRate))} percent per annum)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReducingToFlatRateConverter;
