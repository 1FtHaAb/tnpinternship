import { useState } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('divaContactFormData', JSON.stringify(formData));
    alert('Thank you! Your message has been saved to local storage.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col text-white">
      <Navbar />
      <Banner title={"CONTACT US"} />
      <div className='flex flex-col md:flex-row px-6 md:px-12 justify-between gap-16 md:gap-8 mb-16 max-w-350 mx-auto w-full'>
        <div className='w-full md:w-1/2 flex flex-col'>
          <h2 className='font-bold text-white text-3xl mb-8'>
            REQUEST A <span className='text-[#7dfa96]'>DEMO!</span>
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-lg">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full h-12 bg-[#D1D5DB] text-gray-800 placeholder-gray-500 pl-3 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-[#7dfa96]"
              />
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full h-12 bg-[#D1D5DB] text-gray-800 placeholder-gray-500 pl-3 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-[#7dfa96]"
              />
            </div>
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your Message"
                required
                className="w-full h-40 bg-[#D1D5DB] text-gray-800 placeholder-gray-500 pl-3 pr-4 py-4 resize-none rounded-xl outline-none focus:ring-2 focus:ring-[#7dfa96]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#7dfa96] hover:bg-[#5ae678] transition-colors text-[#1A1D4A] w-full rounded-xl mt-2 py-3 font-bold text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className='w-full md:w-1/2 flex flex-col justify-start md:pl-10'>
          <div className="mb-10 max-w-lg">
            <div className="flex items-center gap-4 mb-6">
              <img src="/benoit.jpg" alt="Benoit RANINI" className="w-16 h-16 rounded-full object-cover border-2 border-transparent" />
              <div>
                <h3 className="text-[#7dfa96] font-bold text-lg">Benoit RANINI</h3>
                <p className="text-sm text-gray-300">President, TNP</p>
              </div>
            </div>
            <div className="border-y border-[#7dfa96] py-5">
              <p className="text-sm text-gray-200 leading-relaxed font-medium">
                "At TNP, we've seen firsthand that data quality impacts nearly 60% of project outcomes. In our industry, where every insight shapes critical decisions, ensuring clean, reliable data is not just a technical necessity—it's the foundation of success."
              </p>
            </div>
          </div>
          <div className="max-w-lg">
            <h4 className="font-bold text-white mb-6 tracking-wide">CONTACT INFORMATION</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 text-sm">
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-envelope text-gray-400 mt-1 text-xl"></i>
                <a href="mailto:Diva24@Tnpconsultants.com" className="text-[#7dfa96] hover:underline break-all">
                  Diva24@Tnpconsultants.com
                </a>
              </div>
              <div className="flex items-start gap-3 md:row-span-2">
                <i className="fa-solid fa-location-dot text-gray-400 mt-1 text-xl"></i>
                <div>
                  <a className="text-[#7dfa96] font-bold mb-1 hover:underline" href="https://maps.app.goo.gl/sxrGamDvfi7pGcKz9" target='_blank'>TNP India</a>
                  <p className="text-gray-300 leading-relaxed">
                    Lulu Cyberpark Infopark.<br />
                    Kochi, Kerala, India
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-globe text-gray-400 mt-1 text-xl"></i>
                <a href="https://www.tnpconsultants.com" target='_blank' className="text-[#7dfa96] hover:underline">
                  TNP Consultants
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}

export default Contact