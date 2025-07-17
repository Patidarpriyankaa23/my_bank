import React, { useState } from 'react';

const EMICalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseInt(tenure) * 12;
    if (!P || !r || !n) return setEmi(null);
    const val = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(val.toFixed(0));
  };

  return (
    <section id="emi" className="bg-white py-16 px-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">EMI Calculator</h2>
      <div className="max-w-md mx-auto space-y-4">
        <div>
          <label className="block text-gray-700">Loan Amount (₹)</label>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Annual Interest Rate (%)</label>
          <input type="number" step="0.01" value={rate} onChange={e => setRate(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Tenure (Years)</label>
          <input type="number" value={tenure} onChange={e => setTenure(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <button onClick={calculateEMI} className="w-full bg-blue-600 text-pink-900 py-3 rounded hover:bg-blue-700 transition">Calculate EMI</button>
        {emi && <p className="mt-4 text-xl text-center">Estimated EMI: <span className="font-bold">₹{emi}</span> / month</p>}
      </div>
    </section>
  );
};

export default EMICalculator;
