import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const [activeService, setActiveService] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services from API using Axios
  useEffect(() => {
    const fetchServices = async () => {
      try {
        
        const response = await axios.get(
          "http://localhost:8000/api/services/get"
        );
        console.log(response.data);

        setServices(response.data.data || []);

        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch services"
        );
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Auto-rotate services only if we have services
  useEffect(() => {
    if (services.length > 0) {
      const interval = setInterval(() => {
        setActiveService((prev) => (prev + 1) % services.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [services.length]);

  const getColorClasses = (index) => {
    const colors = ["blue", "purple", "green", "pink"];
    const color = colors[index % colors.length];

    const colorMap = {
      blue: {
        border: "border-blue-600 hover:border-blue-500",
        gradient: "from-blue-600 to-blue-800",
        accent: "bg-blue-500",
        button:
          "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-blue-500",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  const nextService = () => {
    if (services.length > 0) {
      setActiveService((prev) => (prev + 1) % services.length);
    }
  };

  const prevService = () => {
    if (services.length > 0) {
      setActiveService(
        (prev) => (prev - 1 + services.length) % services.length
      );
    }
  };

  const goToService = (index) => {
    setActiveService(index);
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
            <p className="text-white text-xl mt-4">Loading services...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && services.length === 0) {
    return (
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Error Loading Services
            </h2>
            <p className="text-gray-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If no services from API
  if (services.length === 0) {
    return (
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-yellow-500 text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              No Services Available
            </h2>
            <p className="text-gray-300">
              Please check back later for our services.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentService = services[activeService];
  const colorClasses = getColorClasses(activeService);

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2%, transparent 40%)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 border border-blue-500 shadow-lg mb-6">
            <span className="text-white text-sm font-bold about">
              🌟 ABOUT OUR SERVICES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Transforming Ideas Into
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              {" "}
              Digital Reality
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are a premier technology solutions provider specializing in
            cutting-edge AI software development, robust web applications,
            stunning graphic design, and powerful social media marketing. Our
            mission is to empower businesses with innovative digital solutions
            that drive growth and success.
          </p>
        </div>

        {/* Services Carousel */}
        <div className="mb-20">
          <div className="relative bg-gradient-to-br from-gray-800 to-black border-2 rounded-2xl p-8 transition-all duration-500 hover:transform hover:scale-105">
            {/* Carousel Navigation */}
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={prevService}
                className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-300"
              >
                ←
              </button>

              <div className="flex space-x-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToService(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeService
                        ? colorClasses.accent
                        : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextService}
                className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-300"
              >
                →
              </button>
            </div>

            {/* Service Content */}
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                {currentService.title}
              </h3>
              <div
                className={`w-20 h-1 ${colorClasses.accent} mx-auto mb-6`}
              ></div>
            </div>

            <p className="text-gray-300 mb-8 leading-relaxed text-lg text-center max-w-4xl mx-auto">
              {currentService.description}
            </p>

            {/* Price Section */}
            <div className="text-center mb-10">
              <h4 className="text-white font-semibold text-2xl mb-3">Price</h4>

              <div className="inline-block bg-gray-900 border border-gray-700 rounded-xl px-10 py-5 shadow-lg">
                <p className="text-4xl font-bold text-green-400 mb-1">
                  ${currentService.price}
                </p>

                <p className="text-gray-400 text-sm">
                  Best price for premium quality service
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-xl mb-4">
                  Our Expertise:
                </h4>
                {currentService.expertise &&
                  currentService.expertise.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center text-gray-300"
                    >
                      <span
                        className={`${colorClasses.accent} mr-4 p-2 rounded-lg`}
                      >
                        ⚡
                      </span>
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h5 className="text-white font-semibold text-xl mb-4">
                  Description:
                </h5>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {currentService.perfectFor}
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link to="/contact">
                <button
                  className={`bg-gradient-to-r ${colorClasses.button} text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg border-2`}
                >
                  Get {currentService.title} Services
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-gradient-to-r from-gray-800 to-black border-2 border-blue-600 rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="text-red-400">Proven</span> Process
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We follow a structured approach to ensure every project delivers
              exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery & Planning",
                desc: "We understand your requirements and create a detailed project roadmap",
                icon: "🔍",
              },
              {
                step: "02",
                title: "Design & Development",
                desc: "Our team creates designs and develops solutions with regular updates",
                icon: "⚙️",
              },
              {
                step: "03",
                title: "Testing & Quality",
                desc: "Rigorous testing ensures your solution works flawlessly across all scenarios",
                icon: "🧪",
              },
              {
                step: "04",
                title: "Launch & Support",
                desc: "We deploy your solution and provide ongoing support and maintenance",
                icon: "🚀",
              },
            ].map((process, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{process.icon}</span>
                </div>
                <div className="text-white font-bold text-lg mb-2 bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center mx-auto">
                  {process.step}
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">
                  {process.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {process.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why <span className="text-red-400">Choose</span> Our Services?
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: "🎯",
                  title: "Expert Team",
                  desc: "Our team consists of seasoned professionals with years of experience in AI, web development, and design.",
                },
                {
                  icon: "⚡",
                  title: "Cutting-Edge Technology",
                  desc: "We use the latest technologies and frameworks to ensure your solutions are modern and scalable.",
                },
                {
                  icon: "💎",
                  title: "Quality Assurance",
                  desc: "Every project undergoes rigorous testing to ensure highest quality standards and performance.",
                },
                {
                  icon: "🛡️",
                  title: "Ongoing Support",
                  desc: "We provide continuous support and maintenance to keep your solutions running smoothly.",
                },
                {
                  icon: "🚀",
                  title: "Fast Delivery",
                  desc: "Efficient processes and agile methodologies ensure timely delivery without compromising quality.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-black border-2 border-red-600 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">
                Ready to Start Your Project?
              </h4>
              <p className="text-gray-300 text-center mb-6">
                Let's discuss how our AI, web development, design, and social
                media services can transform your business ideas into reality.
              </p>
              <div className="text-center">
                <Link to="/contact">
                  <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-red-500">
                    Start Your Project Today
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
