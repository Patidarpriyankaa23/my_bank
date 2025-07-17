 import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import ReactWebcam from "react-webcam";
import axios from "../utils/userAxios";
import { CameraIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { State, City } from "country-state-city";
import Select from "react-select";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const isUserPanel = location.pathname.includes("/user");

  const [form, setForm] = useState({
    role: "user",
    name: "",
    email: "",
    gender: "",
    mobile: "",
    avatar: "",
    category: "",
    firmName: "",
    gstNumber: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const categories = [
    "DSA", "Connector", "Freelancer", "Banker",
    "CA/CS", "Financial Adviser", "Others"
  ];

  useEffect(() => {
    setAllStates(State.getStatesOfCountry("IN"));
  }, []);

  useEffect(() => {
    if (selectedState) {
      const cities = City.getCitiesOfState("IN", selectedState.value);
      setAllCities(cities.sort((a, b) => a.name.localeCompare(b.name)));
      setSelectedCity(null);
      setForm((prev) => ({ ...prev, state: selectedState.label, city: "" }));
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedCity) {
      setForm((prev) => ({ ...prev, city: selectedCity.label }));
    }
  }, [selectedCity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setForm((prev) => ({ ...prev, avatar: reader.result }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const capture = () => {
    const img = webcamRef.current.getScreenshot();
    if (img) setForm((prev) => ({ ...prev, avatar: img }));
    setCameraOpen(false);
  };

  const validateForm = () => {
    const requiredFields = [
      "name", "email", "gender", "mobile", "state", "city",
      "address", "pincode", "password", "confirmPassword"
    ];
    for (const field of requiredFields) {
      if (!form[field]) {
        setError("Please fill all required fields");
        return false;
      }
    }

    if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\D/g, "").slice(-10))) {
      setError("Please enter a valid 10-digit Indian mobile number");
      return false;
    }

    if (!form.category) {
      setError("Please select category");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms & Conditions and Privacy Policy");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    try {
      setLoading(true);
      const cleanedForm = {
        ...form,
        mobile: form.mobile.replace(/\D/g, "").slice(-10),
      };
      await axios.post("/auth/register", cleanedForm);
      localStorage.setItem("tempEmail", form.email);
      navigate(isUserPanel ? "/user/login" : "/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      setForm((prev) => ({
        ...prev,
        name: decoded.name || "",
        email: decoded.email || "",
        avatar: decoded.picture || "",
      }));
    } catch (error) {
      console.error("Google decode failed", error);
      setError("Google Signup Failed");
    }
  };

  const stateOptions = allStates.map((s) => ({ value: s.isoCode, label: s.name }));
  const cityOptions = allCities.map((c) => ({ value: c.name, label: c.name }));

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-2 py-4">
      <div className="w-full max-w-4xl border border-gray-300 shadow rounded bg-white p-4 text-black">
        <h2 className="text-xl font-bold text-center mb-2">
          {isUserPanel ? "User Registration" : "Register New User"}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 text-sm">
            {error}
          </div>
        )}

        {/* Avatar Upload */}
        <div className="col-span-3 flex gap-3 items-center mb-3">
          <img
            src={form.avatar || "/avatar-placeholder.png"}
            alt="avatar"
            className="h-16 w-16 rounded-full object-cover border border-gray-400"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-1 text-xs bg-gray-200 px-2 py-1 rounded"
            >
              <PhotoIcon className="h-4 w-4 text-gray-700" /> Upload
            </button>
            <button
              type="button"
              onClick={() => setCameraOpen(true)}
              className="flex items-center gap-1 text-xs bg-gray-200 px-2 py-1 rounded"
            >
              <CameraIcon className="h-4 w-4 text-gray-700" /> Camera
            </button>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Form Start */}
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-3 text-sm">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" className="border px-2 py-1 rounded" />
          <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number *" className="border px-2 py-1 rounded" />
          <select name="gender" value={form.gender} onChange={handleChange} className="border px-2 py-1 rounded">
            <option value="">Gender *</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email ID *" className="border px-2 py-1 rounded" />
          <select name="category" value={form.category} onChange={handleChange} className="border px-2 py-1 rounded">
            <option value="">Category *</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <div></div>

          <input name="firmName" value={form.firmName} onChange={handleChange} placeholder="Firm Name (optional)" className="border px-2 py-1 rounded" />
          <input name="gstNumber" value={form.gstNumber} onChange={handleChange} placeholder="GST Number (optional)" className="border px-2 py-1 rounded" />
          <div></div>

          <div className="col-span-3 flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100 border">
              <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India" className="w-5 h-3 object-cover rounded" />
              <span className="text-sm">India</span>
            </div>
            <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address *" rows={2} className="border px-2 py-1 rounded resize-none w-full" />
          </div>

          <div className="col-span-2 grid grid-cols-3 gap-2">
            <Select options={stateOptions} value={selectedState} onChange={setSelectedState} placeholder="State *" className="text-sm" />
            <Select options={cityOptions} value={selectedCity} onChange={setSelectedCity} placeholder="City *" isDisabled={!selectedState} className="text-sm" />
            <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode *" className="border px-2 py-1 rounded" />
          </div>

          <div className="col-span-3 grid grid-cols-2 gap-3">
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password *" className="border px-2 py-1 rounded" />
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password *" className="border px-2 py-1 rounded" />
          </div>

          <div className="col-span-3 flex items-center gap-2">
            <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="w-4 h-4" />
            <span className="text-xs">
              I agree to <Link to="/terms" className="text-blue-500 underline">Terms</Link> and <Link to="/privacy" className="text-blue-500 underline">Privacy</Link>.
            </span>
          </div>

          <div className="col-span-3">
            <button type="submit" disabled={loading || !agreeTerms} className="w-full bg-blue-600 text-white py-1.5 rounded text-sm">
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>

        {/* Google Signup */}
        <div className="mt-3 flex justify-center">
          <GoogleLogin onSuccess={handleGoogleSignup} onError={() => setError("Google Signup Failed")} />
        </div>

        {/* Camera Modal */}
        {cameraOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow w-72 relative">
              <button onClick={() => setCameraOpen(false)} className="absolute top-2 right-2 text-black">
                <XMarkIcon className="h-6 w-6" />
              </button>
              <ReactWebcam ref={webcamRef} audio={false} screenshotFormat="image/jpeg" className="w-full h-40 mb-2 rounded" />
              <button onClick={capture} className="w-full bg-blue-600 text-white py-1 rounded">
                Capture
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
