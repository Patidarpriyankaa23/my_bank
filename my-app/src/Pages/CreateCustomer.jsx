import React, { useState } from 'react';
import adminAxios from '../utils/axiosadmin';
import { toast } from 'react-toastify';

const CreateCustomer = () => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    state: '',
    city: '',
    pincode: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await adminAxios.post('/customers', form);
      toast.success('Customer created successfully!');
      setForm({ name: '', mobile: '', email: '', state: '', city: '', pincode: '' });
    } catch (error) {
      toast.error('Error saving customer');
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create New Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="border w-full p-2 rounded" />
        <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" required className="border w-full p-2 rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border w-full p-2 rounded" />
        <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="border w-full p-2 rounded" />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border w-full p-2 rounded" />
        <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="border w-full p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Customer</button>
      </form>
    </div>
  );
};

export default CreateCustomer;
