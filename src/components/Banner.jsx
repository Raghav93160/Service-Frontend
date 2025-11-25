import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Premium Business Solutions",
      subtitle: "Transform your business with our expert services",
      description: "We provide cutting-edge solutions to help your business grow and succeed in the digital age.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgGradient: "from-blue-900 via-black to-red-900",
      
    },
    {
      title: "Digital Transformation",
      subtitle: "Embrace the future with our innovative services",
      description: "Stay ahead of the competition with our comprehensive digital transformation strategies.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgGradient: "from-black via-blue-900 to-red-800",
      
    },
    {
      title: "24/7 Expert Support",
      subtitle: "Your success is our priority",
      description: "Round-the-clock support to ensure your business operations run smoothly at all times.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgGradient: "from-red-900 via-black to-blue-900",
      buttonText: "Contact Us"
    }
  ];

  // Auto slide change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Manual slide change function
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900">
      
      {/* SLIDER SECTION - Fixed Positioning */}
      <div className="relative h-96 md:h-[500px] lg:h-[600px] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 z-10' 
                : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-80`}></div>
            </div>
            
            {/* Slide Content */}
            <div className="relative z-20 h-full flex items-center justify-center text-white">
              <div className="text-center max-w-4xl mx-auto px-4">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl mb-6 text-gray-200">
                  {slide.subtitle}
                </p>
                <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
                  {slide.description}
                </p>
                 
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls - Next/Previous Buttons */}
        <div className="absolute top-1/2 left-4 right-4 transform -translate-y-1/2 flex justify-between z-30">
          <button 
            onClick={goToPrev}
            className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center text-2xl font-bold"
          >
            ‹
          </button>
          <button 
            onClick={goToNext}
            className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center text-2xl font-bold"
          >
            ›
          </button>
        </div>

        {/* Slide Indicators - Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-red-500 scale-125' 
                  : 'bg-gray-400 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* MAIN CONTENT SECTION - Static content slider ke niche */}
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content - Text Section */}
            <div className="text-center lg:text-left space-y-8">
              

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Premium{" "}
                <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Business
                </span>{" "}
                Services
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-300 font-semibold">
                Transform Your Vision Into{" "}
                <span className="text-red-400">Reality</span>
              </p>

              {/* Description */}
              <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                We deliver exceptional business solutions tailored to your unique needs. 
                From digital transformation to ongoing support, we're your partner in success.
              </p>

              {/* Statistics
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-4">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">100+</div>
                  <div className="text-sm text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">98%</div>
                  <div className="text-sm text-gray-400">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm text-gray-400">Support Available</div>
                </div>
              </div> */}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
               <Link to="/contact">
                <button
        className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none"
      >
        Get Free Consultation
      </button>
               </Link>
                
              </div>

              {/* Trusted Companies */}
               
            </div>

            {/* Right Content - Services Grid */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-800 to-black border-2 border-red-600 rounded-2xl p-6 shadow-2xl">
                
                {/* Background Effects */}
                <div className="absolute inset-0 rounded-2xl opacity-20">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-500 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10 mb-5">
                  {/* Services Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    {[
                      { icon: "💻", title: "Web Development" },
                      { icon: "📱", title: "AI Automation" },
                      { icon: "🎯", title: "Graphics Designing" },
                      { icon: "☁️", title: "Social Media" },
                      // { icon: "🔒", title: "Cyber Security" },
                      // { icon: "📊", title: "Data Analytics" }
                    ].map((service, index) => (
                      <div 
                        key={index}
                        className="bg-gray-900 border border-gray-700 rounded-xl p-3 text-center hover:border-blue-500 transition-all duration-300 hover:scale-105 cursor-pointer"
                      >
                        <div className="text-2xl mb-2">{service.icon}</div>
                        <div className="text-white text-sm font-semibold">{service.title}</div>
                      </div>
                    ))}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2">
                    {[
                      "24/7 Professional Support",
                      "Custom Tailored Solutions", 
                      "Latest Technology Stack",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

             
            </div>
          </div>
        </div>
 
      </div>
    </div>
  );
};

export default Banner;