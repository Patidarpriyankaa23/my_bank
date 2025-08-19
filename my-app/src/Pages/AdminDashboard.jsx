// // src/Pages/AdminDashboard.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   UsersIcon,
//   UserCheckIcon,
//   FileDownIcon,
//   ReceiptIcon,
//   LogOutIcon,
// } from "lucide-react";

// const adminItems = [
//   {
//     label: "Total Agents",
//     path: "/admin/task-agents",
//     icon: <UsersIcon size={28} />,
//     color: "bg-blue-500",
//   },
//   {
//     label: "Important",
//     path: "/admin/customers",
//     icon: <UserCheckIcon size={28} />,
//     color: "bg-green-500",
//   },
//   {
//     label: "Download Reports",
//     path: "/admin/reports",
//     icon: <FileDownIcon size={28} />,
//     color: "bg-yellow-500",
//   },
//   {
//     label: "Bill History",
//     path: "/admin/bill-history",
//     icon: <ReceiptIcon size={28} />,
//     color: "bg-purple-500",
//   },
// ];

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken"); // or your token key
//     navigate("/admin/login");
//   };

//   return (
//     <div className="min-h-screen pt-24 px-4 bg-gray-100">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//         >
//           <LogOutIcon size={20} />
//           Logout
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {adminItems.map((item) => (
//           <div
//             key={item.label}
//             onClick={() => navigate(item.path)}
//             className={`cursor-pointer rounded-lg shadow-lg p-6 text-white ${item.color} hover:scale-105 transition duration-300`}
//           >
//             <div className="flex items-center justify-between">
//               <div className="text-lg font-semibold">{item.label}</div>
//               {item.icon}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
// src/Pages/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  UsersIcon,
  UserCheckIcon,
  FileDownIcon,
  ReceiptIcon,
  LogOutIcon,
} from "lucide-react";

const adminItems = [
  {
    label: "Total Agents",
    path: "/admin/task-agents",
    icon: <UsersIcon size={28} />,
    color: "bg-blue-500",
  },
  {
    label: "Important",
    path: "/admin/important", // ✅ Updated path to Important.jsx
    icon: <UserCheckIcon size={28} />,
    color: "bg-green-500",
  },
  {
    label: "Download Reports",
    path: "/admin/reports",
    icon: <FileDownIcon size={28} />,
    color: "bg-yellow-500",
  },
  {
    label: "Bill History",
    path: "/admin/bill-history",
    icon: <ReceiptIcon size={28} />,
    color: "bg-purple-500",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); 
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          <LogOutIcon size={20} />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminItems.map((item) => (
          <div
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`cursor-pointer rounded-lg shadow-lg p-6 text-white ${item.color} hover:scale-105 transition duration-300`}
          >
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{item.label}</div>
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
