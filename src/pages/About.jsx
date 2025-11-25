import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const About = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formResult, setFormResult] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Counter state
  const [counters, setCounters] = useState({
    projects: 0,
    satisfaction: 0,
    clients: 0,
    support: "0/7"
  });

  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setFormResult("Sending...");
    
    try {
      const formData = new FormData();
      formData.append("access_key", "ef7266cd-efa6-4dfa-bae2-abce6d966b24");
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("service", data.service);
      formData.append("message", data.message);
      formData.append("subject", `New Contact Form Submission from ${data.name}`);
      formData.append("from_name", "DevAutomation");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      
      if (result.success) {
        setFormResult("Form Submitted Successfully!");
        reset();
      } else {
        setFormResult("Error submitting form. Please try again.");
        console.error("Form submission error:", result);
      }
    } catch (err) {
      setFormResult("There was an error sending your message. Please try again.");
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/stats/get');
        
        // API response structure ke according set karo
        if (response.data && response.data.length > 0) {
          setStats(response.data[0]);
        } else {
          setStats(null);
        }
      } catch (err) {
        setError('Failed to fetch statistics');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Simple counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current && stats) {
          hasAnimated.current = true;
          
          // Sahi field names use karo API response ke according
          const targetValues = {
            projects: parseInt(stats.projectsCompleted) || 50,
            satisfaction: parseInt(stats.clientSatisfaction) || 98,
            clients: parseInt(stats.happyClients) || 50,
            support: stats.supportAvailable || "24/7"
          };

          // Animate projects counter
          let projects = 0;
          const projectsInterval = setInterval(() => {
            projects += 5;
            if (projects >= targetValues.projects) {
              projects = targetValues.projects;
              clearInterval(projectsInterval);
            }
            setCounters(prev => ({ ...prev, projects }));
          }, 30);

          // Animate satisfaction counter
          let satisfaction = 0;
          const satisfactionInterval = setInterval(() => {
            satisfaction += 2;
            if (satisfaction >= targetValues.satisfaction) {
              satisfaction = targetValues.satisfaction;
              clearInterval(satisfactionInterval);
            }
            setCounters(prev => ({ ...prev, satisfaction }));
          }, 40);

          // Animate clients counter
          let clients = 0;
          const clientsInterval = setInterval(() => {
            clients += 2;
            if (clients >= targetValues.clients) {
              clients = targetValues.clients;
              clearInterval(clientsInterval);
            }
            setCounters(prev => ({ ...prev, clients }));
          }, 50);

          // Support counter (instant since it's text)
          setTimeout(() => {
            setCounters(prev => ({ ...prev, support: targetValues.support }));
          }, 600);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [stats]);

  return (
    <>
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full filter blur-xl opacity-10 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-500 rounded-full filter blur-lg opacity-15 animate-ping"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 px-4 py-2 rounded-full">
                What We Offer
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              About Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              At <span className="font-bold text-white bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">WebByte</span>, 
              we deliver cutting-edge digital solutions that transform businesses. From intelligent automation to stunning 
              designs and robust web development, we're your partners in digital excellence.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-24">
            {/* AI Automation Card */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/20 border border-gray-700 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Automation</h3>
                <p className="text-gray-300 leading-relaxed">
                  Leverage the power of <span className="font-semibold text-blue-400">Artificial Intelligence</span> to 
                  revolutionize your operations. Our intelligent automation solutions, including advanced chatbots and 
                  smart workflow systems, drive efficiency while reducing costs and human error.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm text-gray-400">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Intelligent Process Automation
                  </li>
                  <li className="flex items-center text-sm text-gray-400">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    AI-Powered Analytics
                  </li>
                  <li className="flex items-center text-sm text-gray-400">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Smart Chat Solutions
                  </li>
                </ul>
              </div>
            </div>

            {/* Web Development Card */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 border border-gray-700 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Web Development</h3>
                <p className="text-gray-300 leading-relaxed">
                  We craft <span className="font-semibold text-purple-400">high-performance, responsive websites</span> 
                  that deliver exceptional user experiences. From corporate platforms to sophisticated eCommerce solutions, 
                  we build digital foundations that drive growth and engagement.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm text-gray-400">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Responsive Web Design
                  </li>
                  <li className="flex items-center text-sm text-gray-400">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    E-commerce Solutions
                  </li>
                  <li className="flex items-center text-sm text-gray-400">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Progressive Web Apps
                  </li>
                </ul>
              </div>
            </div>

            {/* Graphic Design Card */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl hover:shadow-cyan-500/20 border border-gray-700 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Graphic Design</h3>
                <p className="text-gray-300 leading-relaxed">
                  Our creative team produces <span className="font-semibold text-cyan-400">visually stunning designs</span> 
                  that capture your brand's essence. From comprehensive branding to compelling marketing materials, 
                  we create visual identities that resonate with your audience and drive recognition.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm text-gray-400">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                    Brand Identity Design
                  </li>
                  <li className="flex items-center text-sm text-gray-400">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                    Marketing Materials
                  </li>
                  <li className="flex items-center text-sm text-gray-400">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                    Social Media Graphics
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Stats Section with Counter Up */}
          <div ref={counterRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {counters.projects}+
              </div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {counters.satisfaction}%
              </div>
              <div className="text-gray-400">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">
                {counters.clients}+
              </div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                {counters.support}
              </div>
              <div className="text-gray-400">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Let's Start Your Project
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to transform your digital presence? Get in touch with us and let's create something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your name"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Service Interested In</label>
                  <select
                    {...register("service", { required: "Please select a service" })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a service</option>
                    <option value="ai-automation">AI Automation</option>
                    <option value="web-development">Web Development</option>
                    <option value="graphic-design">Graphic Design</option>
                    <option value="multiple">Multiple Services</option>
                  </select>
                  {errors.service && <p className="text-red-400 text-sm mt-1">{errors.service.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Details</label>
                  <textarea
                    {...register("message", { required: "Please provide project details" })}
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                </div>
                
                {/* Form Result Message */}
                {formResult && (
                  <div className={`p-4 rounded-xl text-center font-medium ${
                    formResult.includes("Successfully") 
                      ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                      : formResult.includes("Error") || formResult.includes("error")
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  }`}>
                    {formResult}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;