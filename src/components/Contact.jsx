import { useState } from "react";

const Contact = () => {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "ef7266cd-efa6-4dfa-bae2-abce6d966b24");
    
    // Additional email configuration for better personalization
    formData.append("subject", `New Project Inquiry from ${event.target.first_name.value} ${event.target.last_name.value}`);
    formData.append("from_name", "DevAutomation Contact Form");
    formData.append("company", "DevAutomation");
    formData.append("website", "https://devautomation.com");
    
    // Auto-reply configuration
    formData.append("autoreply", "true");
    formData.append("autoreply_message", `Dear ${event.target.first_name.value}, Thank you for contacting DevAutomation! We have received your message and will get back to you within 24 hours. Best regards, DevAutomation Team`);
    formData.append("autoreply_subject", "Thank you for contacting DevAutomation!");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("✅ Message Sent Successfully! We'll get back to you within 24 hours.");
        event.target.reset();
      } else {
        setResult("❌ Something went wrong. Please try again!");
      }
    } catch (error) {
      setResult("❌ Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen py-20 overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-20 w-6 h-6 bg-blue-500 rounded-full animate-bounce delay-75"></div>
        <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-purple-500 rounded-full animate-ping"></div>
        <div className="absolute top-10 right-1/4 w-3 h-3 bg-cyan-500 rounded-full animate-pulse delay-150"></div>
        <div className="absolute bottom-20 left-1/4 w-5 h-5 bg-yellow-500 rounded-full animate-bounce delay-300"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold tracking-wider text-red-400 uppercase bg-red-900/30 px-4 py-2 rounded-full border border-red-500/30">
              Get In Touch
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let's Start Your{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Project
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? Get in touch with our team of experts. 
            We're here to help you build something amazing with personalized solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Contact Information Section (Uncommented and Enhanced) */}
          {/* <div className="lg:col-span-1 space-y-8">
            Contact Card
            <div className="bg-gradient-to-br from-gray-800 to-black border border-gray-700 rounded-2xl p-8 shadow-2xl hover:shadow-red-500/10 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-8 bg-red-500 rounded-full mr-3"></span>
                Get In Touch
              </h3>
              
              <div className="space-y-6">
                Phone
                <div className="flex items-start space-x-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-red-500/30 transition-all duration-300">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Call Us</h4>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                    <p className="text-gray-300">+1 (555) 987-6543</p>
                    <p className="text-sm text-gray-400 mt-1">Mon-Fri from 9am to 6pm</p>
                  </div>
                </div>

                Email
                <div className="flex items-start space-x-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-blue-500/30 transition-all duration-300">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">Email Us</h4>
                    <p className="text-gray-300">hello@devautomation.com</p>
                    <p className="text-gray-300">support@webbyte.com</p>
                    <p className="text-sm text-gray-400 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                Location
                <div className="flex items-start space-x-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-purple-500/30 transition-all duration-300">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">Visit Us</h4>
                    <p className="text-gray-300">123 Innovation Drive</p>
                    <p className="text-gray-300">Tech City, TC 10101</p>
                    <p className="text-sm text-gray-400 mt-1">Come say hello at our office</p>
                  </div>
                </div>
              </div>

              Social Links
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="font-semibold text-white mb-4">Follow Our Journey</h4>
                <div className="flex space-x-3">
                  {[
                    { name: 'Twitter', icon: '🐦', color: 'hover:bg-blue-500/30 border-blue-500/50' },
                    { name: 'LinkedIn', icon: '💼', color: 'hover:bg-blue-600/30 border-blue-600/50' },
                    { name: 'GitHub', icon: '⚡', color: 'hover:bg-gray-600 border-gray-500/50' },
                    { name: 'Dribbble', icon: '🎨', color: 'hover:bg-pink-500/30 border-pink-500/50' }
                  ].map((social) => (
                    <button
                      key={social.name}
                      className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:scale-110 transform transition-all duration-300 border ${social.color}`}
                    >
                      <span className="text-sm">{social.icon}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            Stats Card
            <div className="bg-gradient-to-br from-gray-800 to-black border border-gray-700 rounded-2xl p-8 shadow-2xl hover:shadow-red-500/10 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-8 bg-red-500 rounded-full mr-3"></span>
                Why Choose Us
              </h3>
              <div className="space-y-4">
                {[
                  { stat: "24h", label: "Average Response Time", color: "text-green-400" },
                  { stat: "150+", label: "Projects Completed", color: "text-blue-400" },
                  { stat: "98%", label: "Client Satisfaction", color: "text-purple-400" },
                  { stat: "50+", label: "Expert Team Members", color: "text-cyan-400" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0 group hover:bg-gray-700/50 rounded-lg px-2 transition-all duration-300">
                    <span className={`text-2xl font-bold ${item.color} group-hover:scale-110 transition-transform`}>{item.stat}</span>
                    <span className="text-gray-300 text-right">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-gray-800 to-black border-2 border-red-600/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden hover:shadow-red-500/20 transition-all duration-300">
              {/* Enhanced Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full translate-y-12 -translate-x-12 animate-bounce delay-1000"></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-purple-500/10 rounded-full animate-ping"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Start Your <span className="text-red-400">Project</span> Today
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Fill out the form below and we'll get back to you within 24 hours with a customized plan
                  </p>
                </div>

                {/* Enhanced Form with Better Structure */}
                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="text-white font-semibold mb-2 block group-hover:text-red-400 transition-colors">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        className="w-full bg-gray-900/80 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all duration-300 backdrop-blur-sm hover:border-gray-500"
                        placeholder="Your first name"
                        required
                      />
                    </div>
                    <div className="group">
                      <label className="text-white font-semibold mb-2 block group-hover:text-red-400 transition-colors">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        className="w-full bg-gray-900/80 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all duration-300 backdrop-blur-sm hover:border-gray-500"
                        placeholder="Your last name"
                        required
                      />
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="text-white font-semibold mb-2 block group-hover:text-red-400 transition-colors">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full bg-gray-900/80 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all duration-300 backdrop-blur-sm hover:border-gray-500"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="group">
                      <label className="text-white font-semibold mb-2 block group-hover:text-red-400 transition-colors">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full bg-gray-900/80 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all duration-300 backdrop-blur-sm hover:border-gray-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="group">
                    <label className="text-white font-semibold mb-2 block group-hover:text-red-400 transition-colors">
                      Service Interested In *
                    </label>
                    <select
                      name="service"
                      className="w-full bg-gray-900/80 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all duration-300 backdrop-blur-sm hover:border-gray-500"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="AI Software Development">AI Software Development</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Multiple Services">Multiple Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Project Budget */}
                  <div className="group">
                    <label className="text-white font-semibold mb-2 block group-hover:text-red-400 transition-colors">
                      Project Budget
                    </label>
                    <select
                      name="budget"
                      className="w-full bg-gray-900/80 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all duration-300 backdrop-blur-sm hover:border-gray-500"
                    >
                      <option value="">Select budget range</option>
                      <option value="$100 - $500">$100 - $500</option>
                      <option value="$5,000 - $15,000">$500 - $2000</option>
                      <option value="$15,000 - $50,000">$2000 - $10,000</option>
                      <option value="$50,000+">$20,000+</option>
                      <option value="Need to discuss">Need to discuss</option>
                    </select>
                  </div>

                  {/* Timeline */}
                  <div className="group">
                    <label className="text-white font-semibold mb-2 block group-hover:text-red-400 transition-colors">
                      Project Timeline
                    </label>
                    <select
                      name="timeline"
                      className="w-full bg-gray-900/80 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all duration-300 backdrop-blur-sm hover:border-gray-500"
                    >
                      <option value="">Select timeline</option>
                      <option value="ASAP">(Within 2 weeks)</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months"> 6+ months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="group">
                    <label className="text-white font-semibold mb-2 block group-hover:text-red-400 transition-colors">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      rows="6"
                      className="w-full bg-gray-900/80 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all duration-300 backdrop-blur-sm resize-none hover:border-gray-500"
                      placeholder="Tell us about your project requirements, goals, timeline, and any specific needs you have..."
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
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
                      <span className="flex items-center justify-center">
                        <span className="mr-2 group-hover:scale-110 transition-transform">🚀</span>
                        Send Message & Start Project
                      </span>
                    )}
                  </button>

                  {/* Enhanced Status Message */}
                  {result && (
                    <div className={`text-center py-4 px-4 rounded-xl border-2 transition-all duration-300 ${
                      result.includes("✅") ? "bg-green-500/20 border-green-500/50 animate-pulse" : 
                      result.includes("❌") ? "bg-red-500/20 border-red-500/50" : 
                      "bg-blue-500/20 border-blue-500/50"
                    }`}>
                      <p className={`font-semibold text-lg ${
                        result.includes("✅") ? "text-green-400" : 
                        result.includes("❌") ? "text-red-400" : 
                        "text-blue-400"
                      }`}>
                        {result}
                      </p>
                    </div>
                  )}

                  <p className="text-center text-gray-400 text-sm">
                    ⚡ We typically respond within 24 hours • 🔒 Your information is secure • 📧 You'll receive a confirmation email
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;