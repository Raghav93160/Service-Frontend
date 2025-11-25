import { useState } from "react";

const ContactForm = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault(); // Stop page reload
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "634b3382-284d-4f6e-826b-b10175ff4e1c");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("✅ Message Sent Successfully!");
      event.target.reset(); // 🧹 Clear form fields
    } else {
      setResult("❌ Something went wrong. Please try again!");
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-800 to-black border-2 border-red-600 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get In <span className="text-red-400">Touch</span>
            </h2>
            <p className="text-gray-300">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          {/* ✅ CONNECTED FORM */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-white font-semibold mb-2 block">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Your first name"
                  required
                />
              </div>
              <div>
                <label className="text-white font-semibold mb-2 block">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Your last name"
                  required
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-white font-semibold mb-2 block">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="text-white font-semibold mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="text-white font-semibold mb-2 block">Service Interested In</label>
              <select
                name="service"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
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
            <div>
              <label className="text-white font-semibold mb-2 block">Project Budget</label>
              <select
                name="budget"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="">Select budget range</option>
                <option value="$1,000 - $5,000">$100 - $500</option>
                <option value="$5,000 - $15,000">$500 - $2000</option>
                <option value="$15,000 - $50,000">$2000 - $10,000</option>
                <option value="$50,000+">$50,000+</option>
                <option value="Need to discuss">Need to discuss</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="text-white font-semibold mb-2 block">Project Details</label>
              <textarea
                name="message"
                rows="6"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-red-500"
            >
              Send Message
            </button>

            {/* Status Message */}
            <p className="text-center text-gray-300 mt-4">{result}</p>

            <p className="text-center text-gray-400 text-sm">
              ⚡ We typically respond within 24 hours
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
