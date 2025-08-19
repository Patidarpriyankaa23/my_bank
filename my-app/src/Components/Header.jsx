//  import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaPhoneAlt, FaEnvelope, FaBars } from "react-icons/fa";
// import { IoMdClose } from "react-icons/io";
// import { useUser } from "../contexts/UserContext";

// const Header = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout, deleteProfile } = useUser();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const scrollToServices = () => {
//     if (location.pathname === "/") {
//       const section = document.getElementById("services");
//       section?.scrollIntoView({ behavior: "smooth" });
//     } else {
//       window.location.href = "/#services";
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const handleDeleteProfile = () => {
//     if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
//       deleteProfile();
//       navigate("/register");
//     }
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 shadow bg-white">
//       <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
//         {/* 👤 Avatar + Logo (LEFT SIDE) */}
//         <div className="flex items-center gap-3">
//           {user && (
//             <div className="relative">
//               <img
//                 src={user.avatar || "/avatar-placeholder.png"}
//                 alt="User Avatar"
//                 className="h-10 w-10 rounded-full border-2 border-blue-600 cursor-pointer"
//                 onClick={() => navigate("/user/dashboard")} // 👈 Redirect to Dashboard
//               />

//               {menuOpen && (
//                 <div className="absolute left-0 mt-2 w-56 bg-white rounded shadow-lg border border-gray-200 z-50">
//                   <div className="p-4 border-b border-gray-200 flex items-center gap-3">
//                     <img
//                       src={user.avatar || "/avatar-placeholder.png"}
//                       alt="User"
//                       className="h-12 w-12 rounded-full object-cover"
//                     />
//                     <div>
//                       <p className="font-semibold">{user.name}</p>
//                       <p className="text-sm text-gray-600">{user.email}</p>
//                       <p className="text-sm text-gray-600">{user.mobile}</p>
//                     </div>
//                   </div>
//                   <nav className="p-2 text-gray-700">
//                     <button onClick={() => { navigate("/user/dashboard"); setMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-blue-50">Dashboard</button>
//                     <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-blue-50 text-red-600">Logout</button>
//                     <button onClick={handleDeleteProfile} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-700">Delete Profile</button>
//                   </nav>
//                 </div>
//               )}
//             </div>
//           )}
//           <div className="text-2xl font-bold tracking-tight text-blue-700 uppercase">
//             <Link to="/">MyBank</Link>
//           </div>
//         </div>

//         {/* 🖥️ Desktop Navigation */}
//         <nav className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
//           <Link to="/" className="hover:text-blue-600">Home</Link>
//           <button onClick={scrollToServices} className="hover:text-blue-600">Our Services</button>
//           <Link to="/about" className="hover:text-blue-600">About Us</Link>
//           <Link to="/whychooseus" className="hover:text-blue-600">Why Choose Us</Link>
//           <Link to="/faq" className="hover:text-blue-600">FAQ's</Link>
//           <Link to="/blogs" className="hover:text-blue-600">Blogs</Link>
//           <Link to="/contact" className="hover:text-blue-600">Contact Us</Link>

//           <div className="flex items-center gap-5 ml-4">
//             <a href="tel:+123456789" className="text-gray-600 hover:text-blue-500"><FaPhoneAlt /></a>
//             <a href="mailto:gmail250@gmail.com" className="text-gray-600 hover:text-pink-500"><FaEnvelope /></a>
//           </div>
//         </nav>

//         {/* 📱 Mobile Controls */}
//         <div className="flex items-center gap-4">
//           <button className="md:hidden text-xl text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//             {mobileMenuOpen ? <IoMdClose /> : <FaBars />}
//           </button>

//           {!user && (
//             <div className="hidden md:flex gap-3">
//               <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">Login</Link>
//               <Link to="/register" className="px-4 py-2 border border-pink-600 text-pink-600 rounded hover:bg-pink-50 transition">Register</Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* 📱 Mobile Drawer */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white shadow-lg border-t px-6 py-4 space-y-3 text-gray-700 font-medium">
//           <Link to="/" className="block" onClick={() => setMobileMenuOpen(false)}>Home</Link>
//           <button onClick={scrollToServices} className="block w-full text-left">Our Services</button>
//           <Link to="/about" className="block" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
//           <Link to="/whychooseus" className="block" onClick={() => setMobileMenuOpen(false)}>Why Choose Us</Link>
//           <Link to="/faq" className="block" onClick={() => setMobileMenuOpen(false)}>FAQ's</Link>
//           <Link to="/blogs" className="block" onClick={() => setMobileMenuOpen(false)}>Blogs</Link>
//           <Link to="/contact" className="block" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
//           {!user && (
//             <>
//               <Link to="/login" className="block text-blue-600" onClick={() => setMobileMenuOpen(false)}>Login</Link>
//               <Link to="/register" className="block text-pink-600" onClick={() => setMobileMenuOpen(false)}>Register</Link>
//             </>
//           )}
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;


import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useUser } from "../contexts/UserContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToServices = () => {
    if (location.pathname === "/") {
      const section = document.getElementById("services");
      section?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#services";
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Compact Golden Button Style
  const goldenBtn =
    "px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-sm font-semibold shadow-md hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg transition";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900 border-b border-yellow-500/30 shadow-md">
      <div className="px-6 py-3 flex justify-between items-center max-w-7xl mx-auto text-yellow-400">
        {/* Logo + Avatar */}
        <div className="flex items-center gap-3">
          {user && (
            <img
              src={user.avatar || "/avatar-placeholder.png"}
              alt="User Avatar"
              className="h-10 w-10 rounded-full border-2 border-yellow-500 cursor-pointer"
              onClick={() => navigate("/user/dashboard")}
            />
          )}
          <div className="text-2xl font-bold tracking-tight uppercase">
            <Link to="/" className="hover:text-yellow-500">
              MyBank
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center text-yellow-300 font-medium">
          <Link to="/" className={goldenBtn}>Home</Link>
          <button onClick={scrollToServices} className={goldenBtn}>Our Services</button>
          <Link to="/about" className={goldenBtn}>About Us</Link>
          <Link to="/whychooseus" className={goldenBtn}>Why Choose Us</Link>
          <Link to="/faq" className={goldenBtn}>FAQ's</Link>
          <Link to="/blogs" className={goldenBtn}>Blogs</Link>
          <Link to="/contact" className={goldenBtn}>Contact Us</Link>

          <div className="flex items-center gap-3 ml-4 text-lg">
            <a href="https://wa.me/7000982249" target="_blank" rel="noopener noreferrer" className={goldenBtn}><FaWhatsapp /></a>
            <a href="mailto:gmail250@gmail.com" className={goldenBtn}><FaEnvelope /></a>
          </div>

          {!user && (
            <div className="flex items-center gap-3 ml-4">
              <Link to="/login" className={goldenBtn}>Login</Link>
              <Link to="/register" className={goldenBtn}>Register</Link>
            </div>
          )}
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            className="text-2xl text-yellow-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <IoMdClose /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 shadow-lg border-t border-yellow-500/30 px-6 py-4 space-y-4 font-medium text-yellow-400">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className={goldenBtn}>Home</Link>
          <button onClick={scrollToServices} className={goldenBtn}>Our Services</button>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={goldenBtn}>About Us</Link>
          <Link to="/whychooseus" onClick={() => setMobileMenuOpen(false)} className={goldenBtn}>Why Choose Us</Link>
          <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className={goldenBtn}>FAQ's</Link>
          <Link to="/blogs" onClick={() => setMobileMenuOpen(false)} className={goldenBtn}>Blogs</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={goldenBtn}>Contact Us</Link>

          {!user && (
            <div className="flex flex-col gap-3 pt-3">
              <Link to="/login" className={goldenBtn} onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link to="/register" className={goldenBtn} onClick={() => setMobileMenuOpen(false)}>Register</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
