import React from 'react';
import EMICalculator from '../Components/EmiCalculator';
import Disclaimer from '../Pages/Disclaimer';

const Home = () => {
  const services = [
    {
      title: 'CIBIL Report',
      desc: 'Download at ₹236 incl. GST',
      href: '/cibil', // ✅ navigate to new page
      img: 'https://tse3.mm.bing.net/th/id/OIP.A_OIr4XdPFRiBdxNh6YUTQHaE2?rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      title: 'EMI Calculator',
      desc: 'Compute your EMI easily',
      href: '/emi-calculator',
      img: 'https://paisawise.com/wp-content/uploads/2016/08/Loan-EMI-Calculator.png',
    },
    {
      title: 'IFSC & MICR Codes',
      desc: 'Find bank branch codes',
      href: 'https://www.google.com/search?q=ifsc+and+micr+code+finder',
      external: true,
      img: 'https://ifsccode.unicodefont.in/assets/check-ifsc-code-in-cheque.jpg',
    },
    {
      title: 'Download Aadhaar',
      desc: 'Get e​-Aadhaar via OTP',
      href: 'https://eaadhaar.uidai.gov.in/',
      img: 'https://cdn.thelivemirror.com/wp-content/uploads/2019/03/aaadhar_tlm.jpg',
    },
    {
      title: 'Link Mobile to Aadhaar',
      desc: 'Update your mobile number',
      href: 'https://www.google.com/search?q=link+mobile+to+aadhaar+online',
      img: 'https://tse4.mm.bing.net/th/id/OIP.ySl6QXK0lgbXISxbylPhVwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      title: 'Download ITR',
      desc: 'Tax return download',
      href: 'https://www.incometax.gov.in',
      external: true,
      img: 'https://vgccs.in/resource/Image/ITR-img.jpg',
    },
    {
      title: 'GST Certificate',
      desc: 'Download GST certificate (3 pages)',
      href: 'https://www.google.com/search?q=download+gst+certificate+online',
      img: 'https://pvccardprinting.in/wp-content/uploads/2023/08/gst-registration-certificates.webp',
    },
    {
      title: 'PF Statement',
      desc: 'Download EPFO passbook',
      href: 'https://passbook.epfindia.gov.in/MemberPassBook/Login.jsp',
      external: true,
      img: 'https://vakilsearch.com/blog/wp-content/uploads/2022/11/PF-Statement.png',
    },
    {
      title: 'MSME Download',
      desc: 'Get your MSME certificate',
      href: 'https://www.google.com/search?q=download+msme+certificate+online',
      img: 'https://taxguru.in/wp-content/uploads/2020/06/MSME-growth-engine-of-New-India.jpg',
    },
    {
      title: 'Gumasta Download',
      desc: 'Download your Shop Act License',
      href: 'https://www.google.com/search?q=gumasta+license+download+online',
      img: 'https://logopond.com/logos/8e3de46d3efdd42abca18a8606efdcea.png',
    },
    {
      title: 'GST Return Download',
      desc: 'Easily get your GST returns',
      href: 'https://www.google.com/search?q=gst+return+download+online',
      img: 'https://wpblogassets.paytm.com/paytmblog/uploads/2023/09/Blog_Paytm_GST-Returns-What-is-GST-Return-File-GST-Returns-Online-Types-of-GSTR.jpg',
    },
    {
      title: 'Income Tax Calculator',
      desc: 'Calculate your income tax',
      href: 'https://www.google.com/search?q=income+tax+calculator+india',
      img: 'https://pix4free.org/assets/library/2021-10-18/originals/income-tax-calculator.jpg',
    },
  ];

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
            src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1vEYSZ.img?w=768&h=432&m=6"
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
              <div key={i} className="p-6 bg-white shadow rounded text-left flex flex-col items-center">
                {s.img && (
                  <img
                    src={s.img}
                    alt={s.title}
                    className="mb-4 rounded w-full max-w-xs h-40 object-cover"
                  />
                )}
                <h3 className="text-xl font-bold text-blue-700 mb-2">{s.title}</h3>
                <p className="text-gray-600 mb-3">{s.desc}</p>
                <a
                  href={s.href}
                  target={s.external ? '_blank' : '_self'}
                  rel={s.external ? 'noopener noreferrer' : undefined}
                  className="inline-block text-blue-600 hover:underline font-medium"
                >
                  {s.external ? 'Visit Site →' : 'Access →'}
                </a>
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
        <a
          href="/cibil"
          className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition inline-block"
        >
          View CIBIL Options →
        </a>
      </section>

      {/* EMI Calculator */}
      {/* <section id="emi" className="py-16 px-6 bg-white">
        <EMICalculator />
      </section> */}

      {/* Footer */}
      <Disclaimer />
    </main>
  );
};

export default Home;
