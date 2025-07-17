
import React, { useState, useEffect, useRef } from 'react';
import userAxios from '../utils/userAxios';
import { State, City } from 'country-state-city';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReactToPrint } from 'react-to-print';

const Profile = () => {
  const navigate = useNavigate();
  const componentRef = useRef();

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    avatar: '',
    category: '',
    firmName: '',
    gstNumber: '',
    state: '',
    city: '',
    address: '',
    pincode: '',
  });

  const [uniqueId, setUniqueId] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const categoryOptions = [
    { value: 'dsa', label: 'DSA' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'ca', label: 'CA/CS' },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
     const res = await userAxios.get('/profile/me');

        const profile = res.data;

        setCreatedAt(profile.createdAt);
        setUniqueId(profile.uniqueId); // ✅ Set uniqueId

        const allStates = State.getStatesOfCountry('IN');
        setStates(allStates);

        const selectedState = allStates.find(
          (s) => s.name.toLowerCase() === profile.state?.toLowerCase()
        );
        const selectedStateCode = selectedState?.isoCode || '';

        const allCities = selectedStateCode
          ? City.getCitiesOfState('IN', selectedStateCode)
          : [];
        setCities(allCities);

        const selectedCity = allCities.find(
          (c) => c.name.toLowerCase() === profile.city?.toLowerCase()
        );

        setForm({
          name: profile.name || '',
          email: profile.email || '',
          mobile: profile.mobile || '',
          gender: profile.gender?.toLowerCase() || '',
          avatar: profile.avatar || '',
          category: profile.category?.toLowerCase() || '',
          firmName: profile.firmName || '',
          gstNumber: profile.gstNumber || '',
          state: selectedStateCode,
          city: selectedCity?.name || '',
          address: profile.address || '',
          pincode: profile.pincode || '',
        });
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleStateChange = (selected) => {
    const stateCode = selected.isoCode;
    setForm({ ...form, state: stateCode, city: '' });
    const citiesList = City.getCitiesOfState('IN', stateCode);
    setCities(citiesList);
  };

  const handleCityChange = (selected) => setForm({ ...form, city: selected.name });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, avatar: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      await userAxios.put('/profile/me', form);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your profile?')) return;

    try {
      await axios.delete('/profile/me');
      localStorage.removeItem('token');
      toast.success('Profile deleted successfully');
      setTimeout(() => navigate('/register'), 1500);
    } catch (err) {
      toast.error('Failed to delete profile');
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'My_Profile',
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">My Profile</h2>

      {uniqueId && (
        <p className="text-center text-sm font-semibold text-green-600 mb-2">
          Unique ID: <span className="text-black font-mono">{uniqueId}</span>
        </p>
      )}

      {createdAt && (
        <p className="text-sm text-center text-indigo-600 mb-4 font-medium">
          Registered On:{' '}
          {new Date(createdAt).toLocaleString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </p>
      )}

      <div ref={componentRef}>
        <form className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
  name="email"
  value={form.email}
  disabled
  placeholder="Email"
  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
/>

          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Mobile"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <Select
            options={genderOptions}
            value={genderOptions.find((o) => o.value === form.gender)}
            onChange={(selected) => setForm({ ...form, gender: selected.value })}
            isDisabled={!isEditing}
            placeholder="Gender"
          />
          <Select
            options={categoryOptions}
            value={categoryOptions.find((o) => o.value === form.category)}
            onChange={(selected) => setForm({ ...form, category: selected.value })}
            isDisabled={!isEditing}
            placeholder="Category"
          />
          <input
            name="firmName"
            value={form.firmName}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Firm Name"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            name="gstNumber"
            value={form.gstNumber}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="GST Number"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <Select
            options={states}
            getOptionLabel={(e) => e.name}
            getOptionValue={(e) => e.isoCode}
            value={states.find((s) => s.isoCode === form.state)}
            onChange={handleStateChange}
            isDisabled={!isEditing}
            placeholder="State"
          />
          <Select
            options={cities}
            getOptionLabel={(e) => e.name}
            getOptionValue={(e) => e.name}
            value={cities.find((c) => c.name === form.city)}
            onChange={handleCityChange}
            isDisabled={!isEditing}
            placeholder="City"
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Address"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Pincode"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <div>
            <label className="block font-medium mb-1">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={!isEditing}
              className="w-full"
            />
            {form.avatar && (
              <img
                src={form.avatar}
                alt="Avatar"
                className="w-20 h-20 mt-2 rounded-full object-cover border"
              />
            )}
          </div>
        </form>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setIsEditing(true)}
          disabled={isEditing}
          className={`px-6 py-2 rounded-md text-black font-semibold ${
            isEditing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Edit
        </button>
        <button
          onClick={handleSave}
          disabled={!isEditing}
          className={`px-6 py-2 rounded-md text-black font-semibold ${
            !isEditing ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Save
        </button>
        {/* <button
          onClick={handlePrint}
          className="px-6 py-2 rounded-md text-black font-semibold bg-indigo-600 hover:bg-indigo-700"
        >
          Download PDF
        </button>
        <button
          onClick={handleDelete}
          className="px-6 py-2 rounded-md text-black font-semibold bg-red-600 hover:bg-red-700"
        >
          Delete Profile
        </button> */}
      </div>
    </div>
  );
};

export default Profile;
