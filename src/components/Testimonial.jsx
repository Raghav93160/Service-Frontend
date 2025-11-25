// import axios from "axios";
// import { useEffect, useState } from "react";

// const Testimonial = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch testimonials from backend
//   const fetchTestimonials = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:8000/api/testimonials/get");
//       setTestimonials(res.data || []);
//     } catch (err) {
//       console.error("Error fetching testimonials:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   const nextTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   const goToTestimonial = (index) => {
//     setCurrentTestimonial(index);
//   };

//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <span key={index} className={index < rating ? "text-yellow-400" : "text-gray-600"}>
//         ⭐
//       </span>
//     ));
//   };

//   if (loading) {
//     return <p className="text-center text-white py-20">Loading testimonials...</p>;
//   }

//   if (testimonials.length === 0) {
//     return <p className="text-center text-white py-20">No testimonials found.</p>;
//   }

//   const current = testimonials[currentTestimonial];

//   return (
//     <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 overflow-hidden">
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 border border-red-500 shadow-lg mb-6">
//             <span className="text-white text-sm font-bold">💫 CLIENT TESTIMONIALS</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
//             What Our{" "}
//             <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
//               Clients Say
//             </span>
//           </h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Don't just take our word for it. Here's what our clients have to say about their experience working with us.
//           </p>
//         </div>

//         {/* Main Testimonial Card */}
//         <div className="relative mb-12">
//           <div className="bg-gradient-to-br from-gray-800 to-black border-2 border-blue-600 rounded-3xl p-8 md:p-12 shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
//               {/* Client Info */}
//               <div className="lg:col-span-3 text-center lg:text-left">
//                 <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6 text-5xl">
//                   {current.image ? (
//                     <img
//                       src={`http://localhost:8000/${current.image}`}
//                       alt={current.name}
//                       className="w-full h-full object-cover rounded-2xl"
//                     />
//                   ) : (
//                     "👤"
//                   )}
//                 </div>
//                 <h3 className="text-2xl font-bold text-white mb-2">{current.name}</h3>
//                 <p className="text-blue-400 font-semibold mb-1">{current.position || "-"}</p>
//                 <p className="text-gray-400 text-sm mb-4">{current.company || "-"}</p>
//                 <div className="flex justify-center lg:justify-start space-x-1 mb-4">
//                   {renderStars(current.rating)}
//                 </div>
//               </div>

//               {/* Testimonial Content */}
//               <div className="lg:col-span-9">
//                 <div className="relative">
//                   <div className="text-6xl text-blue-600 opacity-20 absolute -top-4 -left-2">❝</div>
//                   <blockquote className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6 relative z-10 italic">
//                     "{current.text}"
//                   </blockquote>
//                   <div className="flex flex-wrap gap-4 mt-8">
//                     <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2">
//                       <span className="text-gray-400 text-sm">Service:</span>
//                       <span className="text-white font-semibold ml-2">{current.service || "-"}</span>
//                     </div>
//                     <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2">
//                       <span className="text-gray-400 text-sm">Project:</span>
//                       <span className="text-white font-semibold ml-2">{current.project || "-"}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Navigation Arrows */}
//           <button
//             onClick={prevTestimonial}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center text-2xl font-bold z-20 border border-blue-500"
//           >
//             ‹
//           </button>
//           <button
//             onClick={nextTestimonial}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center text-2xl font-bold z-20 border border-blue-500"
//           >
//             ›
//           </button>
//         </div>

//         {/* Indicators */}
//         <div className="flex justify-center space-x-3 mb-12">
//           {testimonials.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToTestimonial(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentTestimonial ? "bg-red-500 w-8 scale-125" : "bg-gray-600 hover:bg-gray-400"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonial;
