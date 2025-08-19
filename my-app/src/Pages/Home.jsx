// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../contexts/UserContext';
// import Disclaimer from '../Pages/Disclaimer';

// const Home = () => {
//   const { user } = useUser();
//   const navigate = useNavigate();

//   const services = [
//     {
//       title: 'CIBIL Report',
//       desc: 'Download at ₹99 incl. GST',
//       href: '/cibil',
//       img: 'https://www.omozing.com/wp-content/uploads/2021/04/Improve-Your-CIBIL-Score-01-e1572020834461.jpg',
//       restricted: true,
//     },
//     {
//       title: 'EMI Calculator',
//       desc: 'Compute your EMI easily',
//       href: '/emi-calculator',
//       img: 'https://play-lh.googleusercontent.com/Dh6e6-jl9knRrZPI_EFIelWfi_ApOecVZZsYmFjBHRfbn9lJ9ov8k4YUbThy-1SSzA',
//       restricted: true,
//     },
//     {
//       title: 'IFSC & MICR Codes',
//       desc: 'Find bank branch codes',
//       href: 'https://www.google.com/search?q=ifsc+and+micr+code+finder',
//       external: true,
//       img: 'https://play-lh.googleusercontent.com/0je_nogrddmknW9glL6WPX_llQKINL7AnGprnFyE8mcTa6l8keaIwTDq7_Q-yVDbMX6a',
//     },
//     {
//       title: 'Download Aadhaar',
//       desc: 'Get e​-Aadhaar via OTP',
//       href: 'https://eaadhaar.uidai.gov.in/',
//       img: 'https://tse3.mm.bing.net/th/id/OIP.Iod9L6_LeQMn8iOm5FHg8QHaD4?rs=1&pid=ImgDetMain&o=7&rm=3',
//     },
//     {
//       title: 'Check Mobile Number Linked with Aadhar',
//       // desc: 'Check Mobile Number with Aadhar',
//       href: 'https://www.google.com/search?q=link+mobile+to+aadhaar+online',
//       img: 'https://tse4.mm.bing.net/th/id/OIP.wWq_czwiFLwmaSZsoEKocwHaD4?rs=1&pid=ImgDetMain&o=7&rm=3',
//     },
//     {
//       title: 'Download ITR',
//       desc: 'Tax return download',
//       href: 'https://www.incometax.gov.in',
//       external: true,
//       img: '/itr.png',
//     },
//     {
//       title: 'GST Certificate',
//       desc: 'Download GST certificate (3 pages)',
//       href: 'https://www.google.com/search?q=download+gst+certificate+online',
//       img: 'https://khatabook-assets.s3.amazonaws.com/media/post/2022-02-25_041338.9355680000.webp',
//     },
//     {
//       title: 'PF Statement',
//       desc: 'Download EPFO passbook',
//       href: 'https://passbook.epfindia.gov.in/MemberPassBook/Login.jsp',
//       external: true,
//       img: 'https://vakilsearch.com/blog/wp-content/uploads/2022/11/PF-Statement.png',
//     },
//     {
//       title: 'MSME Download',
//       desc: 'Get your MSME certificate',
//       href: 'https://www.google.com/search?q=download+msme+certificate+online',
//       img: '/msme.png',
//     },
//     {
//       title: 'Gumasta Download',
//       desc: ' Shop Act License',
//       href: 'https://www.google.com/search?q=gumasta+license+download+online',
//       img: '/gumasta.png',
//     },
//     {
//       title: 'GST Return Download',
//       desc: 'Easily get your GST returns',
//       href: 'https://www.google.com/search?q=gst+return+download+online',
//       img: 'https://wpblogassets.paytm.com/paytmblog/uploads/2023/09/Blog_Paytm_GST-Returns-What-is-GST-Return-File-GST-Returns-Online-Types-of-GSTR.jpg',
//     },
//     {
//       title: 'Income Tax Calculator',
//       desc: 'Calculate your income tax',
//       href: 'https://www.google.com/search?q=income+tax+calculator+india',
//       img: 'https://pix4free.org/assets/library/2021-10-18/originals/income-tax-calculator.jpg',
//     },
//   ];

//   const handleServiceClick = (service) => {
//     if (service.restricted && !user) {
//       alert('⚠️ Please login first to access this service.');
//       navigate('/login');
//     } else if (service.external) {
//       window.open(service.href, '_blank');
//     } else {
//       navigate(service.href);
//     }
//   };

//   return (
//     <main className="pt-[140px]">
//       {/* Hero Section */}
//       <section className="bg-blue-50 min-h-[60vh] flex flex-col items-center px-6">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
//             Welcome to MyBank
//           </h1>
//           <p className="text-lg text-gray-700 mb-6">
//             Empowering your financial future with trusted, secure, and seamless banking solutions.
//           </p>
//           <img
//             src="/cibil.jpg"
//             alt="Bank Front"
//             className="rounded-lg shadow-lg mx-auto mb-6 max-w-full h-auto"
//           />
//         </div>
//       </section>

//       {/* Services Section */}
//       <section id="services" className="bg-gray-50 py-16 px-6">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-8">Our Services</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {services.map((s, i) => (
//               <div
//                 key={i}
//                 className="p-6 bg-white shadow rounded flex flex-col items-center hover:shadow-xl transition"
//               >
//                 {/* Image container with fixed aspect ratio */}
//                 <div className="w-full max-w-xs aspect-[4/3] mb-4 flex items-center justify-center bg-gray-100 rounded overflow-hidden">
//                   <img
//                     src={s.img}
//                     alt={s.title}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>

//                 <h3 className="text-xl font-bold text-blue-700 mb-2 text-center">{s.title}</h3>
//                 <p className="text-gray-700 mb-3 text-center">{s.desc}</p>
//                 <button
//                   onClick={() => handleServiceClick(s)}
//                   className="px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-600 transition w-full"
//                 >
//                   {s.title} →
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Google Reviews */}
//       <div className="py-10 text-center bg-white">
//         <a
//           href="https://www.google.com/search?q=MyBank+reviews"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block px-8 py-4 bg-yellow-500 text-white text-lg font-semibold rounded-lg hover:bg-yellow-600 transition"
//         >
//           ⭐ Rate us on Google
//         </a>
//       </div>

//       {/* CIBIL Info Section */}
//       <section id="cibil" className="bg-blue-50 py-16 px-6 text-center">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-4">Check Your CIBIL Score</h2>
//         <p className="text-gray-600 mb-6">Your creditworthiness matters—just ₹236 (incl. GST).</p>
//         <img
//           src="https://tse1.mm.bing.net/th/id/OIP.pmxYOidA-TFmxmRj8Z1vEQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
//           alt="CIBIL Illustration"
//           className="mx-auto mb-6 rounded shadow-md"
//         />
//         <button
//           onClick={() => handleServiceClick({ href: '/cibil', restricted: true, title: 'CIBIL Report' })}
//           className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition inline-block"
//         >
//           CIBIL Report →
//         </button>
//       </section>

//       {/* Footer */}
//       <Disclaimer />
//     </main>
//   );
// };

// export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Disclaimer from '../Pages/Disclaimer';

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const services = [
    {
      title: 'CIBIL Report',
      desc: 'Download at ₹99 incl. GST',
      href: '/cibil',
      img: 'https://www.omozing.com/wp-content/uploads/2021/04/Improve-Your-CIBIL-Score-01-e1572020834461.jpg',
      restricted: true,
    },
    {
      title: 'EMI Calculator',
      desc: 'Reducing ROI/Flat ROI',
      href: '/emi-calculator',
      img: 'https://play-lh.googleusercontent.com/Dh6e6-jl9knRrZPI_EFIelWfi_ApOecVZZsYmFjBHRfbn9lJ9ov8k4YUbThy-1SSzA',
      restricted: true,
    },
    {
      title: 'IFSC & MICR Codes',
      desc: 'Find IFSC and MICR codes',
      href: 'https://www.google.com/search?q=ifsc+and+micr+code+finder',
      external: true,
      img: 'https://play-lh.googleusercontent.com/0je_nogrddmknW9glL6WPX_llQKINL7AnGprnFyE8mcTa6l8keaIwTDq7_Q-yVDbMX6a',
    },
    {
      title: 'Download Aadhaar',
      desc: 'Get e​-Aadhaar via OTP',
      href: 'https://eaadhaar.uidai.gov.in/',
      img: 'https://tse3.mm.bing.net/th/id/OIP.Iod9L6_LeQMn8iOm5FHg8QHaD4?rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      title: 'Check Mobile Number Linked with Aadhar',
      href: 'https://www.google.com/search?q=link+mobile+to+aadhaar+online',
      img: 'https://tse4.mm.bing.net/th/id/OIP.wWq_czwiFLwmaSZsoEKocwHaD4?rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      title: 'Download ITR',
      // desc: 'Tax return download',
      href: 'https://www.incometax.gov.in',
      external: true,
      img: '/itr.png',
    },
    {
      title: 'GST Certificate',
       desc: 'Download GST certificate',
      href: 'https://www.google.com/search?q=download+gst+certificate+online',
      img: 'https://khatabook-assets.s3.amazonaws.com/media/post/2022-02-25_041338.9355680000.webp',
    },
    {
      title: 'PF Statement',
      // desc: 'Download EPFO passbook',
      href: 'https://passbook.epfindia.gov.in/MemberPassBook/Login.jsp',
      external: true,
      img: 'https://vakilsearch.com/blog/wp-content/uploads/2022/11/PF-Statement.png',
    },
    {
      title: 'MSME Download',
      // desc: 'Get your MSME certificate',
      href: 'https://www.google.com/search?q=download+msme+certificate+online',
      img: '/msme.png',
    },
    {
      title: 'Gumasta Download',
      // desc: ' Shop Act License',
      href: 'https://www.google.com/search?q=gumasta+license+download+online',
      img: '/gumasta.png',
    },
    {
      title: 'GST Return Download',
      // desc: 'Easily get your GST returns',
      href: 'https://www.google.com/search?q=gst+return+download+online',
      img: 'https://wpblogassets.paytm.com/paytmblog/uploads/2023/09/Blog_Paytm_GST-Returns-What-is-GST-Return-File-GST-Returns-Online-Types-of-GSTR.jpg',
    },
    {
      title: 'Income Tax Calculator',
      // desc: 'Calculate your income tax',
      href: 'https://www.google.com/search?q=income+tax+calculator+india',
      img: 'https://pix4free.org/assets/library/2021-10-18/originals/income-tax-calculator.jpg',
    },
  ];

  const handleServiceClick = (service) => {
    if (service.restricted && !user) {
      alert('⚠️ Please login first to access this service.');
      navigate('/login');
    } else if (service.external) {
      window.open(service.href, '_blank');
    } else {
      navigate(service.href);
    }
  };

  return (
    <main className="pt-[140px]">
      {/* Hero Section */}
      <section className="bg-blue-50 min-h-[60vh] flex flex-col items-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
            Welcome to MyBank
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Empowering your financial future with trusted, secure, and seamless banking solutions.
          </p>
          <img
            src="/cibil.jpg"
            alt="Bank Front"
            className="rounded-lg shadow-lg mx-auto mb-6 max-w-full h-auto"
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <div
                key={i}
                className="p-6 bg-white shadow rounded flex flex-col items-center hover:shadow-xl transition"
              >
                {/* Image */}
                <div className="w-full max-w-xs aspect-[4/3] mb-4 flex items-center justify-center bg-gray-100 rounded overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-contain" />
                </div>

                {/* Title => FREE except CIBIL */}
                <h3 className="text-xl font-bold text-blue-700 mb-2 text-center">
                  {s.title === "CIBIL Report" ? s.title : "FREE"}
                </h3>

                <p className="text-gray-700 mb-3 text-center">{s.desc}</p>
                <button
                  onClick={() => handleServiceClick(s)}
                  className="px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-600 transition w-full"
                >
                  {s.title} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <div className="py-10 text-center bg-white">
        <a
          href="https://www.google.com/search?q=MyBank+reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-yellow-500 text-white text-lg font-semibold rounded-lg hover:bg-yellow-600 transition"
        >
          ⭐ Rate us on Google
        </a>
      </div>

      {/* CIBIL Info Section */}
      <section id="cibil" className="bg-blue-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Check Your CIBIL Score</h2>
        <p className="text-gray-600 mb-6">Your creditworthiness matters—just ₹236 (incl. GST).</p>
        <img
          src="https://tse1.mm.bing.net/th/id/OIP.pmxYOidA-TFmxmRj8Z1vEQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="CIBIL Illustration"
          className="mx-auto mb-6 rounded shadow-md"
        />
        <button
          onClick={() => handleServiceClick({ href: '/cibil', restricted: true, title: 'CIBIL Report' })}
          className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition inline-block"
        >
          CIBIL Report →
        </button>
      </section>

      {/* Footer */}
      <Disclaimer />
    </main>
  );
};

export default Home;
