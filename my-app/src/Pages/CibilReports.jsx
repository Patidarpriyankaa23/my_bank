import React, { useState } from 'react';
import ExperianForm from './ExperianForm';

const CibilReports = () => {
  const [selectedBureau, setSelectedBureau] = useState(null);

  const bureaus = [
    { name: 'CRIF', comingSoon: true },
    { name: 'TransUnion CIBIL', comingSoon: true },
    { name: 'Equifax', comingSoon: true },
    { name: 'Experian', comingSoon: false },
  ];

  return (
    <main className="pt-[120px] px-4 min-h-screen bg-gray-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Download CIBIL Reports</h1>
        <p className="text-gray-600">Choose your credit bureau to continue</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {bureaus.map((bureau, index) => (
          <div
            key={index}
            onClick={() => {
              if (!bureau.comingSoon) setSelectedBureau(bureau.name);
            }}
            className={`cursor-pointer p-6 bg-white shadow rounded-lg text-center border transition duration-200 ${
              bureau.comingSoon
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:shadow-lg hover:border-blue-500'
            }`}
          >
            <h2 className="text-xl font-semibold text-blue-700">{bureau.name}</h2>
            {bureau.comingSoon && <p className="text-sm text-red-500 mt-2">Coming Soon</p>}
            {!bureau.comingSoon && (
              <p className="text-sm text-green-600 mt-2">Available</p>
            )}
          </div>
        ))}
      </div>

      {selectedBureau === 'Experian' && (
        <div className="mt-10 bg-white p-6 max-w-4xl mx-auto rounded shadow">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Experian Report Form</h2>
          <ExperianForm />
        </div>
      )}
    </main>
  );
};

export default CibilReports;
