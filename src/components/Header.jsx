import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  // ✅ Services Data
  const services = {
    "Graphics Designing": {
      icon: "🎨",
      subServices: ["Logo Design & Branding", "Social Media Graphics", "UI/UX Design", "Business Card Design  ", "Brochure Design","Thumbnail Design (YouTube / Instagram)","T-shirt Design","Menu Design (Restaurant / Café)","Invitation Card Design"]
    },
    "Web Development": {
      icon: "🌐",
      subServices: ["Frontend Development", "Backend Development", "E-commerce Solutions", "Full Stack Applications"]
    },
    "AI Automation": {
      icon: "🤖",
      subServices: ["Business Automation", "E-commerce Automation", "Social Media Automation", "Customer Service Automation", " Finance & Accounting Automatic","Real Estate Automation", "Marketing Automation"]
    }
  };

  // ✅ Check user login on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // // ✅ Logout function
  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   toast.success("Logged out successfully 👋");
  //   setIsAccountOpen(false);
  //   setIsOpen(false);
  //   navigate("/");
  // };

  // ✅ Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAccountOpen && !event.target.closest('.account-dropdown')) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isAccountOpen]);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-xl sticky top-0 z-50 border-b-4 border-red-600">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">

          {/* Logo - Updated Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/" className="flex items-center">
                {/* <img 
                  src="img/WhatsApp_Image_2025-11-13_at_22.06.12_a822e058-removebg-preview (1).png" 
                  alt="Company Logo" 
                  className="h-16 w-auto object-contain hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                Fallback logo in case image fails to load
                <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mr-3 shadow-lg hidden">
                  <span className="text-white font-bold text-xl">D</span>
                </div> */}.
              <span className="text-white text-2xl font-bold">DEV<span className="text-red-500">Automation</span></span>

              </NavLink>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className="text-gray-300 hover:text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300">Home</NavLink>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="text-gray-300 hover:text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-300"
              >
                Services
                <svg className={`ml-2 h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServicesOpen && (
                <div className="absolute left-0 mt-2 w-[800px] rounded-lg shadow-2xl bg-gray-900 border-2 border-red-600 overflow-hidden">
                  <div className="p-6 grid grid-cols-3 gap-6">
                    {Object.keys(services).map((category) => (
                      <div key={category}>
                        <div className="flex items-center text-white font-bold text-lg mb-3 border-b-2 border-blue-500 pb-2">
                          <span className="text-xl mr-2">{services[category].icon}</span>
                          {category}
                        </div>
                        {services[category].subServices.map((subService) => (
                          <NavLink
                            key={subService}
                            // to={`/services/${category.toLowerCase().replace(/\s/g, "-")}`}
                            className="block text-sm text-gray-300 hover:text-white hover:bg-blue-800/50 px-3 py-2 rounded-lg transition-all duration-300"
                            onClick={() => setIsServicesOpen(false)}
                          >
                            • {subService}
                          </NavLink>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/about" className="text-gray-300 hover:text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300">About</NavLink>
            <NavLink to="/portfolio" className="text-gray-300 hover:text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300">Portfolio</NavLink>
            <NavLink to="/contact" className="text-gray-300 hover:text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300">Contact</NavLink>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/contact">
              <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-red-500 hover:border-red-400">
                Get Quote
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-lg text-gray-300 hover:text-white hover:bg-blue-700 border border-gray-700"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-700 mt-2 rounded-lg shadow-2xl border-2 border-red-600">
            <div className="px-4 pt-4 pb-6 space-y-4">
              <NavLink
                to="/"
                className="block text-gray-300 hover:text-white hover:bg-blue-700 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>

              {/* Mobile Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="w-full text-left text-gray-300 hover:text-white hover:bg-blue-700 px-4 py-3 rounded-lg text-base font-semibold flex items-center justify-between transition-all duration-300"
                >
                  <span>Services</span>
                  <svg className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isServicesOpen && (
                  <div className="mt-2 ml-4 bg-gray-800 rounded-lg p-4 space-y-3 border border-gray-700">
                    {Object.keys(services).map((category) => (
                      <div key={category}>
                        <div className="flex items-center text-white font-semibold text-md mb-2 border-b border-blue-500 pb-1">
                          <span className="text-lg mr-2">{services[category].icon}</span>
                          {category}
                        </div>
                        {services[category].subServices.map((subService) => (
                          <NavLink
                            key={subService}
                            to={`/services/${category.toLowerCase().replace(/\s/g, "-")}`}
                            className="block text-sm text-gray-300 hover:text-white hover:bg-blue-800/50 px-3 py-2 rounded-lg transition-all duration-300"
                            onClick={() => {
                              setIsServicesOpen(false);
                              setIsOpen(false);
                            }}
                          >
                            • {subService}
                          </NavLink>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <NavLink
                to="/about"
                className="block text-gray-300 hover:text-white hover:bg-blue-700 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                About
              </NavLink>

              <NavLink
                to="/portfolio"
                className="block text-gray-300 hover:text-white hover:bg-blue-700 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </NavLink>

              <NavLink
                to="/contact"
                className="block text-gray-300 hover:text-white hover:bg-blue-700 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </NavLink>

              {/* Mobile Get Quote Button */}
              <NavLink to="/contact" className="block pt-4">
                <button 
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-red-500 hover:border-red-400 text-base"
                  onClick={() => setIsOpen(false)}
                >
                  Get Quote
                </button>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;