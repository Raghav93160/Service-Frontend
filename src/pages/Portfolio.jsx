import axios from "axios";
import { useEffect, useState } from "react";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coreExpertise, setCoreExpertise] = useState([]);
  const [expLoading, setExpLoading] = useState(true);
  const [expError, setExpError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    fetchFeaturedProjects();
    fetchCoreExpertise();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/feature-projects/get"
      );
      setProjects(response.data.projects);
      setError(null);
    } catch (err) {
      setError("Failed to fetch projects");
      console.error("Error fetching projects:", err);
      // Fallback to sample data if API fails
      setProjects([
        {
          id: 1,
          title: "E-commerce Platform",
          category: "web",
          description: "Full-stack e-commerce solution with payment integration and real-time analytics",
          tags: ["React", "Node.js", "MongoDB", "Stripe"],
          gradient: "from-blue-500 to-blue-700",
          icon: "🚀",
          image: "/uploads/project1.jpg",
          liveUrl: "https://example-ecommerce.com", // Updated to liveUrl
          caseStudyUrl: "/case-studies/ecommerce-platform"
        },
        {
          id: 2,
          title: "Brand Identity Design",
          category: "design",
          description: "Complete brand identity system for innovative tech startup",
          tags: ["Logo Design", "Branding", "UI/UX", "Typography"],
          gradient: "from-blue-600 to-blue-800",
          icon: "🎨",
          image: "/uploads/project2.jpg",
          liveUrl: "https://example-branding.com", // Updated to liveUrl
          caseStudyUrl: "/case-studies/brand-identity"
        },
        {
          id: 3,
          title: "AI Customer Support",
          category: "ai",
          description: "Intelligent customer service automation with natural language processing",
          tags: ["Python", "NLP", "Automation", "ML"],
          gradient: "from-blue-700 to-blue-900",
          icon: "🤖",
          image: "/uploads/project3.jpg",
          liveUrl: "https://example-ai.com", // Updated to liveUrl
          caseStudyUrl: "/case-studies/ai-support"
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoreExpertise = async () => {
    try {
      setExpLoading(true);
      const res = await axios.get("http://localhost:8000/api/core-expertise/get");
      console.log(res.data);
      setCoreExpertise(res.data.data);
      setExpError(null);
    } catch (error) {
      console.error("Core Expertise Fetch Error:", error);
      setExpError("Failed to load core expertise");
    } finally {
      setExpLoading(false);
    }
  };

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  const getCategoryGradient = (category) => {
    switch (category) {
      case "web":
        return "from-blue-500 to-blue-700";
      case "design":
        return "from-blue-600 to-blue-800";
      case "ai":
        return "from-blue-700 to-blue-900";
      default:
        return "from-blue-500 to-black";
    }
  };

  // Improved function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    console.log("Original image path:", imagePath);

    // If it's already a full URL, return as is
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // If it starts with uploads/, use the correct path
    if (imagePath.startsWith("uploads/")) {
      return `http://localhost:8000/${imagePath}`;
    }

    // If it starts with /uploads/, use the correct path
    if (imagePath.startsWith("/uploads/")) {
      return `http://localhost:8000${imagePath}`;
    }

    // For any other case, assume it's in uploads folder
    return `http://localhost:8000/${imagePath}`;
  };

  // Handle image error with better fallback
  const handleImageError = (e, project) => {
    console.log("Image failed to load:", e.target.src);
    e.target.style.display = "none";
    
    // Show icon fallback
    const parent = e.target.parentElement;
    const fallback = document.createElement('div');
    fallback.className = "absolute inset-0 flex items-center justify-center";
    fallback.innerHTML = `<span class="text-6xl opacity-70 text-white">${project.icon || "🚀"}</span>`;
    parent.appendChild(fallback);
  };

  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  // Handle image click for fullscreen view
  const handleImageClick = (e, project) => {
    e.stopPropagation();
    setSelectedProject(project);
    setFullscreenImage(true);
  };

  // Handle live website visit
  const handleVisitWebsite = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Handle view case study
  const handleViewCaseStudy = (url) => {
    if (url) {
      if (url.startsWith('/')) {
        window.location.href = url;
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  // Function to determine which button to show based on project category
  const getActionButtons = (project) => {
    if (project.category === "web" && project.liveUrl) {
      return (
        <button
          onClick={() => handleVisitWebsite(project.liveUrl)}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-blue-600"
        >
          View Website
        </button>
      );
    } else if (project.caseStudyUrl) {
      return (
        <button
          onClick={() => handleViewCaseStudy(project.caseStudyUrl)}
          className="flex-1 border-2 border-blue-600 text-blue-400 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          View Case Study
        </button>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-500"></div>
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setFullscreenImage(false)}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors text-xl"
            >
              ✕
            </button>
            
            {/* Navigation Buttons */}
            <button
              onClick={() => {
                const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
                setSelectedProject(projects[prevIndex]);
              }}
              className="absolute left-6 z-10 w-12 h-12 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors text-xl"
            >
              ‹
            </button>
            
            <button
              onClick={() => {
                const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                const nextIndex = (currentIndex + 1) % projects.length;
                setSelectedProject(projects[nextIndex]);
              }}
              className="absolute right-6 z-10 w-12 h-12 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors text-xl"
            >
              ›
            </button>

            {/* Fullscreen Image */}
            <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center p-4">
              <img
                src={getImageUrl(selectedProject.image)}
                alt={selectedProject.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onError={(e) => {
                  e.target.style.display = "none";
                  const container = e.target.parentElement;
                  const fallback = document.createElement('div');
                  fallback.className = "flex items-center justify-center text-white text-8xl";
                  fallback.innerHTML = selectedProject.icon || "🚀";
                  container.appendChild(fallback);
                }}
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
              <h3 className="text-white font-semibold text-lg text-center">
                {selectedProject.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {showModal && selectedProject && !fullscreenImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors"
              >
                ✕
              </button>
              
              {/* Project Image - Clickable for Fullscreen */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                {selectedProject.image ? (
                  <img
                    src={getImageUrl(selectedProject.image)}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={(e) => handleImageClick(e, selectedProject)}
                    onError={(e) => handleImageError(e, selectedProject)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <span className="text-6xl opacity-50 text-white">
                      {selectedProject.icon || "🚀"}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40"></div>
                
                {/* Zoom Indicator */}
                <div className="absolute bottom-4 right-4 z-10">
                  <button 
                    onClick={(e) => handleImageClick(e, selectedProject)}
                    className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/80 transition-colors"
                  >
                    🔍
                  </button>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                  <span className="text-3xl">{selectedProject.icon}</span>
                </div>

                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full font-medium border border-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Dynamic Action Buttons based on project type */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Show View Website for web projects, View Case Study for others */}
                  {getActionButtons(selectedProject)}
                  
                  {/* Always show View Full Image button */}
                  <button
                    onClick={(e) => handleImageClick(e, selectedProject)}
                    className="flex-1 border-2 border-gray-600 text-gray-400 px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 hover:text-white transition-all duration-300"
                  >
                    View Full Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        className={`relative pt-32 pb-20 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-blue-700 shadow-lg mb-8 animate-bounce">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-blue-300">
                Available for new projects
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                Digital
              </span>
              <br />
              <span className="text-white">Craftsman</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transforming visions into{" "}
              <span className="font-semibold text-blue-400">
                exceptional digital experiences
              </span>{" "}
              through code, design, and intelligent automation
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() =>
                  document
                    .getElementById("portfolio-section")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="group relative bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border border-blue-600"
              >
                <span className="relative z-10">Explore My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* <button className="group border-2 border-blue-600 text-blue-400 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-black/30">
                <span className="flex items-center space-x-2">
                  <span>View Case Studies</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Passions Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Core{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Specialized skills that drive innovation and deliver exceptional results
            </p>
          </div>

          {expLoading && (
            <div className="text-center py-10 text-blue-400">Loading...</div>
          )}

          {expError && (
            <div className="text-center py-10 text-red-400">{expError}</div>
          )}

          {!expLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {coreExpertise.map((exp) => (
                <div
                  key={exp._id}
                  className="group relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-gray-800"
                >
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      {exp.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-blue-400">
                        {exp.completeProjects} Projects
                      </span>
                      <div className="flex space-x-2">
                        {exp.technologies.slice(0, 2).map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium bg-blue-900 text-blue-300 rounded-full border border-blue-600 border-opacity-30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                    <div className="absolute inset-[2px] rounded-2xl bg-gray-900"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio-section" className="relative py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                Work
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A curated selection of projects showcasing innovation and technical excellence
            </p>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center space-x-2 text-blue-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span>Loading projects...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="inline-flex items-center space-x-2 text-red-400 bg-red-900/30 px-4 py-2 rounded-lg">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {!loading && (
            <>
              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {["all", "web", "design", "ai"].map((category) => {
                  const gradient = getCategoryGradient(category);

                  return (
                    <button
                      key={category}
                      onClick={() => setActiveTab(category)}
                      className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 border ${
                        activeTab === category
                          ? "text-white shadow-2xl scale-105 border-transparent"
                          : "text-gray-300 bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 hover:shadow-lg"
                      }`}
                    >
                      {activeTab === category && (
                        <div
                          className={`absolute inset-0 rounded-xl bg-gradient-to-r ${gradient}`}
                        ></div>
                      )}
                      <span className="relative z-10 flex items-center space-x-2">
                        <span>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                        {activeTab === category && (
                          <span className="text-sm opacity-90">
                            (
                            {
                              projects.filter(
                                (p) =>
                                  p.category === category || category === "all"
                              ).length
                            }
                            )
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Updated Portfolio Grid with Better Image Handling */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProjects?.map((project) => {
                  const imageUrl = getImageUrl(project.image);

                  return (
                    <div
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                      className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-2xl cursor-pointer"
                    >
                      <div className="relative h-64 overflow-hidden">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => handleImageError(e, project)}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                            <span className="text-6xl opacity-50 text-white">
                              {project.icon || "🚀"}
                            </span>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors"></div>

                        <div className="absolute bottom-4 left-4">
                          <span className="text-white text-3xl">
                            {project.icon}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags?.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button className="w-full py-3 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition duration-300">
                          View Details →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;