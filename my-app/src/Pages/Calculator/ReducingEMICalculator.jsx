// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import userAxios from '../../utils/userAxios';

// const ReducingEmiCalculator = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('emi');
//   const [formData, setFormData] = useState({
//     amount: '',
//     interest: '',
//     tenure: '',
//     tenureType: 'year',
//     emi: ''
//   });

//   const [result, setResult] = useState(null);

//   // Number to words converter (basic, supports up to crores)
//   const numberToWords = (num) => {
//     if (!num && num !== 0) return '';
//     const a = [
//       '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
//       'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
//       'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
//     ];
//     const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

//     const inWords = (n) => {
//       if (n < 20) return a[n];
//       if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '');
//       if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred ' + (n % 100 ? inWords(n % 100) : '');
//       if (n < 100000) return inWords(Math.floor(n / 1000)) + ' Thousand ' + (n % 1000 ? inWords(n % 1000) : '');
//       if (n < 10000000) return inWords(Math.floor(n / 100000)) + ' Lakh ' + (n % 100000 ? inWords(n % 100000) : '');
//       return inWords(Math.floor(n / 10000000)) + ' Crore ' + (n % 10000000 ? inWords(n % 10000000) : '');
//     };

//     return inWords(num).trim();
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const resetForm = () => {
//     setFormData({
//       amount: '',
//       interest: '',
//       tenure: '',
//       tenureType: 'year',
//       emi: ''
//     });
//     setResult(null);
//   };

//   const calculate = async () => {
//     const P = parseFloat(formData.amount) || 0;
//     const R = parseFloat(formData.interest) || 0;
//     const tenureType = formData.tenureType;
//     let N = parseFloat(formData.tenure) || 0;
//     const emiValue = parseFloat(formData.emi) || 0;

//     if (tenureType === 'year') {
//       N = N * 12;
//     }

//     if (activeTab !== 'interest' && (R < 6 || R > 40)) {
//       alert('Interest rate must be between 6% and 40%');
//       return;
//     }

//     try {
//       let res;
//       if (activeTab === 'emi') {
//         res = await userAxios.post('/emi/reducing', {
//           loanAmount: P,
//           interestRate: R,
//           tenureType: 'months',
//           tenureValue: N
//         });
//         setFormData((prev) => ({ ...prev, emi: Number(res.data.emi).toFixed(2) }));
//       } else if (activeTab === 'amount') {
//         res = await userAxios.post('/emi/amount', {
//           emi: emiValue,
//           interestRate: R,
//           tenureType: 'months',
//           tenureValue: N
//         });
//         setFormData((prev) => ({ ...prev, amount: Number(res.data.loanAmount).toFixed(2) }));
//       } else if (activeTab === 'interest') {
//         res = await userAxios.post('/emi/interest', {
//           emi: emiValue,
//           loanAmount: P,
//           tenureType: 'months',
//           tenureValue: N
//         });
//         setFormData((prev) => ({ ...prev, interest: Number(res.data.interestRate).toFixed(2) }));
//       } else if (activeTab === 'tenure') {
//         res = await userAxios.post('/emi/tenure', {
//           emi: emiValue,
//           loanAmount: P,
//           interestRate: R
//         });
//         const months = res.data.tenureMonths;
//         setFormData((prev) => ({
//           ...prev,
//           tenure: tenureType === 'year' ? (months / 12).toFixed(0) : months.toString()
//         }));
//       }

//       setResult(res?.data || null);
//     } catch (err) {
//       alert(err?.response?.data?.message || 'Something went wrong.');
//       setResult(null);
//     }
//   };

//   const isVisible = (field) => {
//     if (activeTab === 'emi') return field !== 'emi';
//     if (activeTab === 'amount') return field !== 'amount';
//     if (activeTab === 'interest') return field !== 'interest';
//     if (activeTab === 'tenure') return field !== 'tenure';
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-xl flex flex-col md:flex-row gap-6">
//       <div className="w-full md:w-1/2">
//         <h1 className="text-xl font-bold mb-4 text-center">Reducing ROI EMI Calculator</h1>
//         <div className="flex justify-between mb-4">
//           {['emi', 'amount', 'interest', 'tenure'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => {
//                 setActiveTab(tab);
//                 setResult(null);
//               }}
//               className={`px-4 py-2 rounded-full font-semibold transition duration-300 ${
//                 activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-100'
//               }`}
//             >
//               {tab.toUpperCase()}
//             </button>
//           ))}
//         </div>

//         <div className="space-y-4">
//           {isVisible('amount') && (
//             <div>
//               <label className="block mb-1 font-medium text-gray-700">Loan Amount</label>
//               <input
//                 type="number"
//                 name="amount"
//                 min="1000"
//                 placeholder="Enter Loan Amount"
//                 className="w-full p-2 border rounded"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 autoComplete="off"
//                 autoCorrect="off"
//                 spellCheck="false"
//               />
//             </div>
//           )}

//           {isVisible('interest') && (
//             <div>
//               <label className="block mb-1 font-medium text-gray-700">Interest Rate (Annual %)</label>
//               <input
//                 type="number"
//                 name="interest"
//                 min="6"
//                 max="40"
//                 step="0.1"
//                 placeholder="between 6% - 40%"
//                 className="w-full p-2 border rounded"
//                 value={formData.interest}
//                 onChange={handleChange}
//                 autoComplete="off"
//                 autoCorrect="off"
//                 spellCheck="false"
//               />
//             </div>
//           )}

//           {isVisible('tenure') && (
//             <div>
//               <label className="block mb-1 font-medium text-gray-700">Tenure</label>
//               <div className="flex gap-2">
//                 <input
//                   type="number"
//                   name="tenure"
//                   placeholder={`Enter tenure in ${formData.tenureType === 'year' ? 'years' : 'months'}`}
//                   className="w-full p-2 border rounded"
//                   value={formData.tenure}
//                   onChange={handleChange}
//                   autoComplete="off"
//                   autoCorrect="off"
//                   spellCheck="false"
//                 />
//                 <select
//                   name="tenureType"
//                   value={formData.tenureType}
//                   onChange={handleChange}
//                   className="border px-2 py-2 rounded"
//                 >
//                   <option value="year">Year(s)</option>
//                   <option value="month">Month(s)</option>
//                 </select>
//               </div>
//             </div>
//           )}

//           {isVisible('emi') && (
//             <div>
//               <label className="block mb-1 font-medium text-gray-700">EMI</label>
//               <input
//                 type="number"
//                 name="emi"
//                 placeholder="Enter EMI"
//                 className="w-full p-2 border rounded"
//                 value={formData.emi}
//                 onChange={handleChange}
//                 autoComplete="off"
//                 autoCorrect="off"
//                 spellCheck="false"
//               />
//             </div>
//           )}
//         </div>

//         <div className="flex justify-between mt-6">
//           <button
//             onClick={calculate}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Calculate
//           </button>
//           <button
//             onClick={resetForm}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             Reset
//           </button>
//         </div>
//       </div>

//       {result && (
//         <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded shadow h-fit">
//           <h2 className="text-lg font-semibold mb-4 text-center">Result</h2>
//           <div className="space-y-2 text-center">
//             {activeTab === 'emi' && (
//               <p>
//                 <strong>EMI:</strong> ₹{Number(result.emi).toFixed(2)} (
//                 {numberToWords(Math.round(Number(result.emi)))})
//               </p>
//             )}
//             {activeTab === 'amount' && (
//               <p>
//                 <strong>Loan Amount:</strong> ₹{Number(result.loanAmount).toFixed(2)} (
//                 {numberToWords(Math.round(Number(result.loanAmount)))})
//               </p>
//             )}
//             {activeTab === 'interest' && (
//               <p>
//                 <strong>Interest Rate:</strong> {Number(result.interestRate).toFixed(2)}% (
//                 {numberToWords(Math.round(Number(result.interestRate)))})
//               </p>
//             )}
//             {activeTab === 'tenure' && (
//               <p>
//                 <strong>Tenure:</strong> {result.tenureMonths} months (
//                 {numberToWords(Math.round(Number(result.tenureMonths)))})
//               </p>
//             )}
//             <p>
//               <strong>Total Interest:</strong> ₹{Number(result.totalInterest).toFixed(2)} (
//               {numberToWords(Math.round(Number(result.totalInterest)))})
//             </p>
//             <p>
//               <strong>Total Payment:</strong> ₹{Number(result.totalPayment).toFixed(2)} (
//               {numberToWords(Math.round(Number(result.totalPayment)))})
//             </p>
//           </div>

//           <div className="mt-6 text-center">
//             <button
//               onClick={() => {
//                 const N = formData.tenureType === 'year'
//                   ? parseInt(formData.tenure || 0) * 12
//                   : parseInt(formData.tenure || 0);
//                 navigate('/reducing-emi-report', {
//                   state: {
//                     amount: formData.amount,
//                     interest: formData.interest,
//                     tenure: N,
//                     tenureType: 'months'
//                   }
//                 });
//               }}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               View Full Report
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReducingEmiCalculator;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userAxios from '../../utils/userAxios';

const ReducingEmiCalculator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('emi');
  const [formData, setFormData] = useState({
    amount: '',
    interest: '',
    tenure: '',
    tenureType: 'year',
    emi: ''
  });

  const [result, setResult] = useState(null);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      amount: '',
      interest: '',
      tenure: '',
      tenureType: 'year',
      emi: ''
    });
    setResult(null);
  };

  const calculate = async () => {
    const P = parseFloat(formData.amount) || 0;
    const R = parseFloat(formData.interest) || 0;
    const tenureType = formData.tenureType;
    let N = parseFloat(formData.tenure) || 0;
    const emiValue = parseFloat(formData.emi) || 0;

    if (tenureType === 'year') {
      N = N * 12;
    }

    if (activeTab !== 'interest' && (R < 6 || R > 40)) {
      alert('Interest rate must be between 6% and 40%');
      return;
    }

    try {
      let res;
      if (activeTab === 'emi') {
        res = await userAxios.post('/emi/reducing', {
          loanAmount: P,
          interestRate: R,
          tenureType: 'months',
          tenureValue: N
        });
        setFormData((prev) => ({ ...prev, emi: Number(res.data.emi).toFixed(2) }));
      } else if (activeTab === 'amount') {
        res = await userAxios.post('/emi/amount', {
          emi: emiValue,
          interestRate: R,
          tenureType: 'months',
          tenureValue: N
        });
        setFormData((prev) => ({ ...prev, amount: Number(res.data.loanAmount).toFixed(2) }));
      } else if (activeTab === 'interest') {
        res = await userAxios.post('/emi/interest', {
          emi: emiValue,
          loanAmount: P,
          tenureType: 'months',
          tenureValue: N
        });
        setFormData((prev) => ({ ...prev, interest: Number(res.data.interestRate).toFixed(2) }));
      } else if (activeTab === 'tenure') {
        res = await userAxios.post('/emi/tenure', {
          emi: emiValue,
          loanAmount: P,
          interestRate: R
        });
        const months = res.data.tenureMonths;
        setFormData((prev) => ({
          ...prev,
          tenure: tenureType === 'year' ? (months / 12).toFixed(0) : months.toString()
        }));
      }

      setResult(res?.data || null);
    } catch (err) {
      alert(err?.response?.data?.message || 'Something went wrong.');
      setResult(null);
    }
  };

  const isVisible = (field) => {
    if (activeTab === 'emi') return field !== 'emi';
    if (activeTab === 'amount') return field !== 'amount';
    if (activeTab === 'interest') return field !== 'interest';
    if (activeTab === 'tenure') return field !== 'tenure';
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-xl flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2">
        <h1 className="text-xl font-bold mb-4 text-center">Reducing ROI EMI Calculator</h1>
        <div className="flex justify-between mb-4">
          {['emi', 'amount', 'interest', 'tenure'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setResult(null);
              }}
              className={`px-4 py-2 rounded-full font-semibold transition duration-300 ${
                activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-100'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {isVisible('amount') && (
            <div>
              <label className="block mb-1 font-medium text-gray-700">Loan Amount</label>
              <input
                type="number"
                name="amount"
                min="1000"
                placeholder="Enter Loan Amount"
                className="w-full p-2 border rounded"
                value={formData.amount}
                onChange={handleChange}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
              {formData.amount && (
                <p className="text-sm text-gray-600 mt-1 italic">
                  {numberToWords(Math.floor(Number(formData.amount)))}
                </p>
              )}
            </div>
          )}

          {isVisible('interest') && (
            <div>
              <label className="block mb-1 font-medium text-gray-700">Interest Rate (Annual %)</label>
              <input
                type="number"
                name="interest"
                min="6"
                max="40"
                step="0.1"
                placeholder="between 6% - 40%"
                className="w-full p-2 border rounded"
                value={formData.interest}
                onChange={handleChange}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
              {formData.interest && (
                <p className="text-sm text-gray-600 mt-1 italic">
                  {numberToWords(Math.floor(Number(formData.interest)))}
                </p>
              )}
            </div>
          )}

          {isVisible('tenure') && (
            <div>
              <label className="block mb-1 font-medium text-gray-700">Tenure</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="tenure"
                  placeholder={`Enter tenure in ${formData.tenureType === 'year' ? 'years' : 'months'}`}
                  className="w-full p-2 border rounded"
                  value={formData.tenure}
                  onChange={handleChange}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
                <select
                  name="tenureType"
                  value={formData.tenureType}
                  onChange={handleChange}
                  className="border px-2 py-2 rounded"
                >
                  <option value="year">Year(s)</option>
                  <option value="month">Month(s)</option>
                </select>
              </div>
              {formData.tenure && (
                <p className="text-sm text-gray-600 mt-1 italic">
                  {numberToWords(Math.floor(Number(formData.tenure)))}
                </p>
              )}
            </div>
          )}

          {isVisible('emi') && (
            <div>
              <label className="block mb-1 font-medium text-gray-700">EMI</label>
              <input
                type="number"
                name="emi"
                placeholder="Enter EMI"
                className="w-full p-2 border rounded"
                value={formData.emi}
                onChange={handleChange}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
              {formData.emi && (
                <p className="text-sm text-gray-600 mt-1 italic">
                  {numberToWords(Math.floor(Number(formData.emi)))}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={calculate}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Calculate
          </button>
          <button
            onClick={resetForm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </div>

      {result && (
        <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded shadow h-fit">
          <h2 className="text-lg font-semibold mb-4 text-center">Result</h2>
          <div className="space-y-2 text-center">
            {activeTab === 'emi' && (
              <p>
                <strong>EMI:</strong> ₹{Number(result.emi).toFixed(2)} (
                {numberToWords(Math.round(Number(result.emi)))})
              </p>
            )}
            {activeTab === 'amount' && (
              <p>
                <strong>Loan Amount:</strong> ₹{Number(result.loanAmount).toFixed(2)} (
                {numberToWords(Math.round(Number(result.loanAmount)))})
              </p>
            )}
            {activeTab === 'interest' && (
              <p>
                <strong>Interest Rate:</strong> {Number(result.interestRate).toFixed(2)}% (
                {numberToWords(Math.round(Number(result.interestRate)))})
              </p>
            )}
            {activeTab === 'tenure' && (
              <p>
                <strong>Tenure:</strong> {result.tenureMonths} months (
                {numberToWords(Math.round(Number(result.tenureMonths)))})
              </p>
            )}
            <p>
              <strong>Total Interest:</strong> ₹{Number(result.totalInterest).toFixed(2)} (
              {numberToWords(Math.round(Number(result.totalInterest)))})
            </p>
            <p>
              <strong>Total Payment:</strong> ₹{Number(result.totalPayment).toFixed(2)} (
              {numberToWords(Math.round(Number(result.totalPayment)))})
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                const N = formData.tenureType === 'year'
                  ? parseInt(formData.tenure || 0) * 12
                  : parseInt(formData.tenure || 0);
                navigate('/reducing-emi-report', {
                  state: {
                    amount: formData.amount,
                    interest: formData.interest,
                    tenure: N,
                    tenureType: 'months'
                  }
                });
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Full Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReducingEmiCalculator;
