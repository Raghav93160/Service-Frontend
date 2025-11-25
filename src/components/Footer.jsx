const Footer = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t-2 border-red-600">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2%, transparent 40%)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg"></span>
              </div>
              <span className="text-white text-2xl font-bold">DEV<span className="text-red-500">Automation</span></span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Transforming businesses with cutting-edge AI solutions, professional web development, 
              and stunning graphic design services. Your success is our priority.
            </p>
            {/* <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <span className="text-white">📘</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                <span className="text-white">🐦</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                <span className="text-white">📸</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <span className="text-white">💼</span>
              </div>
            </div> */}
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">AI Automation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Graphic Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Social Media</a></li>
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Digital Marketing</a></li> */}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-400">📧 devautomationagency@gmail.com</p>
              {/* <p className="text-gray-400">📞 +1 (555) 123-4567</p> */}
              <p className="text-gray-400">📍 Odhav Ahmedabad</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 ServicePro. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            {/* <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a> */}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Footer;