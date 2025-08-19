import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CibilReports from './Pages/CibilReports';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/ProtectRoutes';
import Home from './Pages/Home';
import AboutUs from './Pages/About';
import ContactUs from './Pages/ContactUs';
import FAQ from './Pages/FAQ';
import Blogs from './Pages/Blogs';
import Disclaimer from './Pages/Disclaimer';
import WhyChooseUs from './Pages/WhyChooseUs';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsAndConditions from "./Pages/TermsandCondition";
 import MyCustomers from './Pages/MyCustomers';


import Register from './Components/Register';
import Login from './Components/Login';
import ForgotPassword from "./Components/ForgottenPassword"; // ✅ Correct

import ResetPassword from './Components/ResetPassword';
import VerifyOTP from './Components/VerifyOTP';

import Dashboard from './Pages/Dashboard';
import Profile from './Pages/Profile';
import Feedback from './Pages/Feedback'; // ✅ fixed (lowercase b)

import SendMessage from './Pages/User/SendMessage';
import RequestCallback from './Pages/User/RequestCallback';
import AdminBillHistory from './Pages/AdminBillHistory';
import 'react-toastify/dist/ReactToastify.css';
import AdminView from './Pages/AdminView';
import AdminLogin from './Pages/AdminLogin';
import AdminTotalAgents from './Pages/AdminTotalAgent';
 import Important from "./Pages/Important"; // ✅ Import your new page
import AdminDashboard from './Pages/AdminDashboard';
import OauthSuccess from './Pages/OauthSuccess';
import ExperianForm from './Pages/ExperianForm'; // ✅ Add this

import ReportsDownload from './Pages/ReportDownload';
import AdminProtectedRoute from './Components/AdminProtectedRoute';
import EmiCalculatorPage from './Components/EmiCalculator';
import ReducingEMICalculator from './Pages/Calculator/ReducingEMICalculator';
import FlatEMICalculator from './Pages/Calculator/FlatEMICalculator';
import ReducingToFlat from './Pages/Calculator/ReducingToFlat';
import FlatToReducing from './Pages/Calculator/FlatToReducing';
import FlatEmiReport from './Pages/FlatReport';

import ReducingEmiReport from './Pages/ReducingEmiReport';

const ShareWithProfessionals = () => <div className="pt-24 text-center text-xl">Share With Other Professionals Page</div>;
const RateAndReviews = () => <div className="pt-24 text-center text-xl">Rate & Reviews on Google Page</div>;
const Dispute = () => <div className="pt-24 text-center text-xl">Raise a Dispute to Bureau Page</div>;

function App() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname.startsWith('/admin');

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        {/*  Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/whychooseus" element={<WhyChooseUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />

        {/*  Auth Pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/*  Protected User Pages */}
        <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/user/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/user/customers" element={<ProtectedRoute><MyCustomers /></ProtectedRoute>} />
        {/* <Route path="/user/bill-history" element={<ProtectedRoute><BillHistory /></ProtectedRoute>} /> */}
        <Route path="/user/share" element={<ProtectedRoute><ShareWithProfessionals /></ProtectedRoute>} />
        <Route path="/user/rate" element={<ProtectedRoute><RateAndReviews /></ProtectedRoute>} />
        <Route path="/user/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
        <Route path="/user/dispute" element={<ProtectedRoute><Dispute /></ProtectedRoute>} />
        <Route path="/user/send-message" element={<SendMessage />} />
        <Route path="/user/request-callback" element={<RequestCallback />} />

        {/*  Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        <Route path="/admin/task-agents" element={<AdminProtectedRoute><AdminTotalAgents /></AdminProtectedRoute>} />
        {/* <Route path="/admin/customers" element={<AdminProtectedRoute><MyCustomers /></AdminProtectedRoute>} /> */}
        <Route path="/admin/important" element={<AdminProtectedRoute><Important /></AdminProtectedRoute>} />

        <Route path="/admin/reports" element={<AdminProtectedRoute><ReportsDownload /></AdminProtectedRoute>} />
        <Route path="/admin/bill-history" element={<AdminProtectedRoute><AdminBillHistory /></AdminProtectedRoute>} />
        <Route path="/experian" element={<ExperianForm />} />
        <Route path="/cibil" element={<CibilReports />} />
        <Route path="/oauth-success" element={<OauthSuccess />} />
        <Route path="/admin/view/:id" element={<AdminView />} />
        {/* EMI CALCULATOR */}
        <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
        <Route path="/emi/reducing" element={<ReducingEMICalculator />} />
        <Route path="/emi/flat" element={<FlatEMICalculator />} />
        <Route path="/emi/reducing-to-flat" element={<ReducingToFlat />} />
        <Route path="/emi/flat-to-reducing" element={<FlatToReducing />} />

        <Route path="/flat-emi-report" element={<FlatEmiReport />} />

        <Route path="/reducing-emi-report" element={<ReducingEmiReport />} />


      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
