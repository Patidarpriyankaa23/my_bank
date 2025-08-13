// import React, { useState } from "react";
// import userAxios from "../../utils/userAxios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const FlatEMICalculator = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("emi");
//   const [formData, setFormData] = useState({
//     amount: "",
//     interest: "",
//     tenure: "",
//     emi: "",
//     tenureType: "year",
//   });
//   const [result, setResult] = useState(null);

//   // ✅ Added: Number to Words Converter
//   const numberToWords = (num) => {
//     if (!num) return "";
//     const a = [
//       "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
//       "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
//       "Sixteen", "Seventeen", "Eighteen", "Nineteen"
//     ];
//     const b = [
//       "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy",
//       "Eighty", "Ninety"
//     ];

//     const inWords = (n) => {
//       if (n < 20) return a[n];
//       if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
//       if (n < 1000) return a[Math.floor(n / 100)] + " Hundred " + (n % 100 ? inWords(n % 100) : "");
//       if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand " + (n % 1000 ? inWords(n % 1000) : "");
//       if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh " + (n % 100000 ? inWords(n % 100000) : "");
//       return inWords(Math.floor(n / 10000000)) + " Crore " + (n % 10000000 ? inWords(n % 10000000) : "");
//     };

//     return inWords(num).trim();
//   };

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     setResult(null);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleReset = () => {
//     setFormData({
//       amount: "",
//       interest: "",
//       tenure: "",
//       emi: "",
//       tenureType: "year",
//     });
//     setResult(null);
//   };

//   const handleCalculate = async () => {
//     const { amount, interest, tenure, emi, tenureType } = formData;

//     if (activeTab !== "interest") {
//       const interestValue = parseFloat(interest);
//       if (isNaN(interestValue) || interestValue < 5 || interestValue > 30) {
//         toast.error("Interest rate must be between 5% and 30%");
//         return;
//       }
//     }

//     const payload = { tenureType };

//     if (activeTab === "emi") {
//       payload.amount = parseFloat(amount);
//       payload.interest = parseFloat(interest);
//       payload.tenure = parseFloat(tenure);
//     } else if (activeTab === "amount") {
//       payload.interest = parseFloat(interest);
//       payload.tenure = parseFloat(tenure);
//       payload.emi = parseFloat(emi);
//     } else if (activeTab === "interest") {
//       payload.amount = parseFloat(amount);
//       payload.tenure = parseFloat(tenure);
//       payload.emi = parseFloat(emi);
//     } else if (activeTab === "tenure") {
//       if (!amount || !interest || !emi) {
//         toast.error("Please enter Amount, Interest, and EMI to calculate Tenure");
//         return;
//       }
//       payload.amount = parseFloat(amount);
//       payload.interest = parseFloat(interest);
//       payload.emi = parseFloat(emi);
//     }

//     try {
//       const response = await userAxios.post(`/flat-emi/${activeTab}`, payload);
//       if (response?.data) {
//         setResult(response.data);
//       } else {
//         toast.error("Something went wrong. No result received.");
//         setResult(null);
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Calculation failed");
//       setResult(null);
//     }
//   };

//   const handleViewReport = async () => {
//     try {
//       if (!result) {
//         toast.error("Please calculate EMI first");
//         return;
//       }

//       const payload = {
//         amount:
//           activeTab === "amount"
//             ? parseFloat(result.amount)
//             : parseFloat(formData.amount),
//         interest: parseFloat(formData.interest),
//         tenure:
//           activeTab === "tenure"
//             ? result?.tenure?.toString() || "0"
//             : formData.tenure,
//         tenureType: formData.tenureType,
//         emi:
//           activeTab === "emi"
//             ? parseFloat(result.emi)
//             : parseFloat(formData.emi),
//       };

//       const response = await userAxios.post("/emi/reducing/report", payload);

//       if (response?.data) {
//         setResult(response.data);
//         navigate("/reducing-report", { state: response.data });
//       } else {
//         toast.error("No data received from server");
//       }
//     } catch (error) {
//       toast.error("Failed to generate EMI report");
//     }
//   };

//   // ✅ Updated: renderInput to show number + words and disable autofill
//   const renderInput = (name, label, placeholder) => {
//     const isInterest = name === "interest";
//     const value = formData[name];

//     return (
//       <div className="mb-4">
//         <label className="block mb-1 font-medium text-gray-700">{label}</label>
//         <input
//           type="number"
//           name={name}
//           placeholder={placeholder}
//           value={value}
//           onChange={handleChange}
//           autoComplete="off"
//           autoCorrect="off"
//           spellCheck="false"
//           className="w-full border p-2 rounded"
//           min={isInterest ? 5 : undefined}
//           max={isInterest ? 30 : undefined}
//         />
//         {value && !isNaN(value) && (
//           <p className="text-sm text-gray-600 mt-1">
//             {value} ({numberToWords(parseInt(value))})
//           </p>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-xl flex flex-col lg:flex-row gap-8">
//       <div className="flex-1">
//         <h1 className="text-2xl font-bold text-center mb-6">Flat EMI Calculator</h1>

//         <div className="flex justify-between mb-6">
//           {["emi", "amount", "interest", "tenure"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => handleTabClick(tab)}
//               className={`w-1/4 py-2 text-sm font-semibold capitalize ${
//                 activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         <div className="space-y-4">
//           {activeTab !== "amount" && renderInput("amount", "Loan Amount", "Enter loan amount")}
//           {activeTab !== "interest" && renderInput("interest", "Interest Rate (%)", "between 5% to 30%")}
//           {activeTab !== "tenure" && (
//             <div className="flex gap-4 items-center">
//               <div className="flex-1">{renderInput("tenure", "Tenure", "Enter tenure")}</div>
//               <div className="flex-1">
//                 <label className="block mb-1 font-medium text-gray-700">Tenure Type</label>
//                 <select
//                   name="tenureType"
//                   value={formData.tenureType}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 >
//                   <option value="year">Year</option>
//                   <option value="month">Month</option>
//                 </select>
//               </div>
//             </div>
//           )}
//           {activeTab !== "emi" && renderInput("emi", "EMI", "Enter monthly EMI")}
//         </div>

//         <div className="flex justify-between mt-6">
//           <button
//             onClick={handleReset}
//             className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//           >
//             Reset
//           </button>
//           <button
//             onClick={handleCalculate}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Calculate
//           </button>
//         </div>
//       </div>

//       {result && (
//         <div className="flex-1">
//           <div className="p-4 border rounded bg-gray-100">
//             <h3 className="text-lg font-semibold mb-2 capitalize">Calculated {activeTab}</h3>

//             {activeTab === "emi" && <p><strong>Monthly EMI:</strong> ₹{result.calculatedEMI}</p>}
//             {activeTab === "amount" && <p><strong>Loan Amount:</strong> ₹{result.amount}</p>}
//             {activeTab === "interest" && <p><strong>Interest Rate:</strong> {result.interest}%</p>}
//             {activeTab === "tenure" && <p><strong>Tenure:</strong> {result.tenure} months</p>}

//             <p><strong>Total Interest:</strong> ₹{result.totalInterest}</p>
//             <p><strong>Total Payment:</strong> ₹{result.totalPayment}</p>
//           </div>

//           <div className="mt-4">
//             <button
//               onClick={() => {
//                 const reportPayload = {
//                   amount:
//                     activeTab === "amount"
//                       ? result.amount
//                       : formData.amount,
//                   interest:
//                     activeTab === "interest"
//                       ? result.interest
//                       : formData.interest,
//                   tenure:
//                     activeTab === "tenure"
//                       ? result?.tenure?.toString() || ""
//                       : formData.tenure,
//                   tenureType: formData.tenureType,
//                 };
//                 navigate("/flat-emi-report", {
//                   state: reportPayload,
//                 });
//               }}
//               className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
//             >
//               View Report
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlatEMICalculator;
import React, { useState } from "react";
import userAxios from "../../utils/userAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FlatEMICalculator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("emi");
  const [formData, setFormData] = useState({
    amount: "",
    interest: "",
    tenure: "",
    emi: "",
    tenureType: "year",
  });
  const [result, setResult] = useState(null);

  // Number to Words converter (simple version)
  const numberToWords = (num) => {
    if (!num) return "";
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
      "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const b = [
      "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy",
      "Eighty", "Ninety"
    ];

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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setResult(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      amount: "",
      interest: "",
      tenure: "",
      emi: "",
      tenureType: "year",
    });
    setResult(null);
  };

  const handleCalculate = async () => {
    const { amount, interest, tenure, emi, tenureType } = formData;

    // Interest validation except when activeTab === 'interest'
    if (activeTab !== "interest") {
      const interestValue = parseFloat(interest);
      if (isNaN(interestValue) || interestValue < 5 || interestValue > 30) {
        toast.error("Interest rate must be between 5% and 30%");
        return;
      }
    }

    const payload = { tenureType };

    if (activeTab === "emi") {
      payload.amount = parseFloat(amount);
      payload.interest = parseFloat(interest);
      payload.tenure = parseFloat(tenure);
    } else if (activeTab === "amount") {
      payload.interest = parseFloat(interest);
      payload.tenure = parseFloat(tenure);
      payload.emi = parseFloat(emi);
    } else if (activeTab === "interest") {
      payload.amount = parseFloat(amount);
      payload.tenure = parseFloat(tenure);
      payload.emi = parseFloat(emi);
    } else if (activeTab === "tenure") {
      if (!amount || !interest || !emi) {
        toast.error("Please enter Amount, Interest, and EMI to calculate Tenure");
        return;
      }
      payload.amount = parseFloat(amount);
      payload.interest = parseFloat(interest);
      payload.emi = parseFloat(emi);
    }

    try {
      const response = await userAxios.post(`/flat-emi/${activeTab}`, payload);
      if (response?.data) {
        setResult(response.data);
      } else {
        toast.error("Something went wrong. No result received.");
        setResult(null);
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Calculation failed");
      setResult(null);
    }
  };

  const renderInput = (name, label, placeholder) => {
    const isInterest = name === "interest";
    const value = formData[name];

    return (
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">{label}</label>
        <input
          type="number"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          min={isInterest ? 5 : undefined}
          max={isInterest ? 30 : undefined}
          autoComplete="off"
        />
        {value && !isNaN(value) && (
          <p className="text-sm text-gray-600 mt-1">
            {value} ({numberToWords(parseInt(value))})
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-xl flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-center mb-6">Flat EMI Calculator</h1>

        <div className="flex justify-between mb-6">
          {["emi", "amount", "interest", "tenure"].map(tab => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`w-1/4 py-2 text-sm font-semibold capitalize ${
                activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {activeTab !== "amount" && renderInput("amount", "Loan Amount", "Enter loan amount")}
          {activeTab !== "interest" && renderInput("interest", "Interest Rate (%)", "between 5% to 30%")}
          {activeTab !== "tenure" && (
            <div className="flex gap-4 items-center">
              <div className="flex-1">{renderInput("tenure", "Tenure", "Enter tenure")}</div>
              <div className="flex-1">
                <label className="block mb-1 font-medium text-gray-700">Tenure Type</label>
                <select
                  name="tenureType"
                  value={formData.tenureType}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="year">Year</option>
                  <option value="month">Month</option>
                </select>
              </div>
            </div>
          )}
          {activeTab !== "emi" && renderInput("emi", "EMI", "Enter monthly EMI")}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            onClick={handleCalculate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Calculate
          </button>
        </div>
      </div>

      {result && (
  <div className="flex-1">
    <div className="p-4 border rounded bg-gray-100">
      <h3 className="text-lg font-semibold mb-2 capitalize">Calculated {activeTab}</h3>

      {activeTab === "emi" && (
        <p>
          <strong>Monthly EMI:</strong> ₹{result.calculatedEMI} (
          {numberToWords(Math.round(result.calculatedEMI))})
        </p>
      )}
      {activeTab === "amount" && (
        <p>
          <strong>Loan Amount:</strong> ₹{result.amount} (
          {numberToWords(Math.round(result.amount))})
        </p>
      )}
      {activeTab === "interest" && (
        <p>
          <strong>Interest Rate:</strong> {result.interest}% (
          {numberToWords(Math.round(result.interest))})
        </p>
      )}
      {activeTab === "tenure" && (
        <p>
          <strong>Tenure:</strong> {result.tenure} months (
          {numberToWords(Math.round(result.tenure))})
        </p>
      )}

      <p>
        <strong>Total Interest:</strong> ₹{result.totalInterest} (
        {numberToWords(Math.round(result.totalInterest))})
      </p>
      <p>
        <strong>Total Payment:</strong> ₹{result.totalPayment} (
        {numberToWords(Math.round(result.totalPayment))})
      </p>
    </div>

    <div className="mt-4">
      <button
        onClick={() => {
          const reportPayload = {
            amount:
              activeTab === "amount"
                ? result.amount
                : formData.amount,
            interest:
              activeTab === "interest"
                ? result.interest
                : formData.interest,
            tenure:
              activeTab === "tenure"
                ? result?.tenure?.toString() || ""
                : formData.tenure,
            tenureType: formData.tenureType,
          };
          navigate("/flat-emi-report", {
            state: reportPayload,
          });
        }}
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
      >
        View Report
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default FlatEMICalculator;
