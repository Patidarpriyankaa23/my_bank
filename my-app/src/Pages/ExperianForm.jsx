import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAxios from '../utils/userAxios';
const ExperianForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: '',
    pan: '',
    aadhaar: '',
    mobile: '',
  });

  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Redirect to login if token not found
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to access the CIBIL report.');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPdfUrl('');

    try {
      const res = await userAxios.post('/cibil/experian', form); // 👈 matches your backend route
      setPdfUrl(res.data.pdf_url);
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message || 'Something went wrong while fetching the report.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Experian</h1>
      </div>

      <h2 className="text-xl font-semibold text-center mb-4">
        Get Your CIBIL Report Instantly
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="Full Name (as per PAN)"
          required
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          name="pan"
          value={form.pan}
          onChange={handleChange}
          placeholder="PAN Number"
          required
          maxLength={10}
          className="w-full p-3 border rounded uppercase"
        />

        <input
          type="text"
          name="aadhaar"
          value={form.aadhaar}
          onChange={handleChange}
          placeholder="Aadhaar Number"
          required
          maxLength={12}
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile Number"
          required
          maxLength={10}
          className="w-full p-3 border rounded"
        />

        <div className="flex justify-between gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 w-1/2"
          >
            {loading ? 'Fetching...' : 'Share Report'}
          </button>

          <button
            type="button"
            onClick={() => alert('Redirect to payment gateway')}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 w-1/2"
          >
            Share Payment
          </button>
        </div>
      </form>

      {pdfUrl && (
        <div className="mt-6 text-center">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            🔗 View Your CIBIL Report
          </a>
        </div>
      )}
    </div>
  );
};

export default ExperianForm;
