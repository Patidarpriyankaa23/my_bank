import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAxios from '../utils/userAxios';

const ExperianForm = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        pan_number: '',
        // aadhaar_number: '',
        mobile_number: '',
        constant: 'Y',
         
    });

    const [loading, setLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || {};

    setForm((prev) => ({
        ...prev,
        customerId: user._id || '', // if user exists set id else empty string
    }));
}, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'pan_number' ? value.toUpperCase() : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPdfUrl('');
        setMessage('');

        const { name, pan_number,  mobile_number, constant } = form;

        if (!name || !pan_number  || !mobile_number || !constant) {
            alert('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        if (
            // aadhaar_number.length !== 12 ||
            pan_number.length !== 10 ||
            mobile_number.length !== 10
        ) {
            alert('Please enter valid Aadhaar, PAN, and Mobile numbers.');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await userAxios.post('/cibil/experian', form);

            const { pdf_url, message: apiMessage } = response.data;

            if (pdf_url) {
                setPdfUrl(pdf_url);
                setMessage(apiMessage || '✅ Report fetched successfully!');
                window.open(pdf_url, '_blank');

                const link = document.createElement('a');
                link.href = pdf_url;
                link.download = 'Experian_CIBIL_Report.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                setMessage('⚠️ No CIBIL report found. You might not have any credit history yet.');
            }
        } catch (err) {
            const apiErr = err?.response?.data?.message || 'Something went wrong. Try again later.';
            console.error('❌ Error:', err);
            setMessage(`❌ ${apiErr}`);
        } finally {
            setLoading(false);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: 'Experian CIBIL Report',
                    text: 'Here is my CIBIL Report link.',
                    url: pdfUrl,
                })
                .then(() => console.log('✅ Shared successfully'))
                .catch((err) => console.error('❌ Error sharing:', err));
        } else {
            navigator.clipboard.writeText(pdfUrl);
            alert('Sharing not supported on this device. Link copied to clipboard.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700">Experian</h1>
                <p className="text-gray-600 mt-1">Get Your CIBIL Report Instantly</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name (as per PAN)"
                    className="w-full p-3 border rounded"
                    required
                />

                <input
                    type="text"
                    name="pan_number"
                    value={form.pan_number}
                    onChange={handleChange}
                    placeholder="PAN Number"
                    maxLength={10}
                    className="w-full p-3 border rounded uppercase"
                    required
                />

                {/* <input
                    type="text"
                    name="aadhaar_number"
                    value={form.aadhaar_number}
                    onChange={handleChange}
                    placeholder="Aadhaar Number"
                    maxLength={12}
                    className="w-full p-3 border rounded"
                    required
                /> */}

                <input
                    type="text"
                    name="mobile_number"
                    value={form.mobile_number}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    maxLength={10}
                    className="w-full p-3 border rounded"
                    required
                />

                <input
                    type="text"
                    name="constant"
                    value={form.constant}
                    onChange={handleChange}
                    placeholder="Enter Constant (e.g., experian)"
                    className="w-full p-3 border rounded"
                    required
                />

                <div className="flex justify-between gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 w-1/2"
                    >
                        {loading ? 'Fetching...' : 'Submit'}
                    </button>

                    <button
                        type="button"
                        onClick={() => alert('Redirect to payment gateway')}
                        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 w-1/2"
                    >
                        💳 Share Payment
                    </button>
                </div>
            </form>

            {message && (
                <div className="mt-6 text-center">
                    <p className={`text-lg font-medium ${pdfUrl ? 'text-green-600' : 'text-red-500'}`}>
                        {message}
                    </p>
                </div>
            )}

            {pdfUrl && (
                <div className="mt-6 space-y-4 text-center">
                    <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 underline block text-lg font-medium"
                    >
                        🔗 View Report
                    </a>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator
                                        .share({
                                            title: 'Experian CIBIL Report',
                                            text: 'Here is my CIBIL Report link.',
                                            url: pdfUrl,
                                        })
                                        .catch(() => { });
                                } else {
                                    navigator.clipboard.writeText(pdfUrl);
                                    alert('Sharing not supported on this device. Link copied!');
                                }
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow"
                        >
                            📤 Share
                        </button>

                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(
                                'Check my Experian CIBIL Report: ' + pdfUrl
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow"
                        >
                            🟢 WhatsApp
                        </a>

                        <button
                            onClick={async () => {
                                await navigator.clipboard.writeText(pdfUrl);
                                alert('📋 Link copied to clipboard!');
                            }}
                            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded shadow"
                        >
                            📎 Copy Link
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ExperianForm;
