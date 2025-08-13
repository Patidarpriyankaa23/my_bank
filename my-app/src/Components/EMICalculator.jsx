import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmiCalculatorPage = () => {
  const navigate = useNavigate();

  const calculators = [
    {
      title: 'Reducing ROI EMI Calculator',
      route: '/emi/reducing',
    },
    {
      title: 'Flat ROI EMI Calculator',
      route: '/emi/flat',
    },
    {
      title: 'Reducing Interest Rate Convert into Flat Interest Rate',
      route: '/emi/reducing-to-flat',
    },
    {
      title: 'Flat Interest Rate Convert into Reducing Interest Rate',
      route: '/emi/flat-to-reducing',
    },
  ];

  return (
    <main className="pt-[140px] min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
        EMI Calculator Options
      </h1>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {calculators.map((calc, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer text-center"
            onClick={() => navigate(calc.route)}
          >
            <h2 className="text-xl font-semibold text-gray-800">{calc.title}</h2>
          </div>
        ))}
      </div>
    </main>
  );
};

export default EmiCalculatorPage;
