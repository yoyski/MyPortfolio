import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faJs, faHtml5, faPython, faNodeJs } from "@fortawesome/free-brands-svg-icons";

import one from "../assets/quicksched.png";
import two from "../assets/glucometer-logo.png";

function Projects() {
  const projects = [
    {
      title: "Quicksched",
      img: one,
      description:
        "This is my first ever progressive web app — QuickSched is a modern and responsive scheduling tool designed to streamline Facebook post management for school organizations. It allows admins to create, categorize, and visually track scheduled posts with an intuitive interface and calendar view, all from both desktop and mobile devices.",
      link: "https://quicksched-app.vercel.app/",
      lang: [faJs, faHtml5, faPython],
    },
    {
      title: "GlucoMeter App",
      img: two,
      description:
        "A web app to record, view, and manage glucose level test results with an easy-to-use interface.",
      link: "https://glucometer-yoyski.vercel.app/",
      lang: [faJs, faHtml5, faNodeJs],
    },
    {
      title: "Weather App",
      description: "Shows current weather based on your location.",
      link: "https://example.com/weather",
      lang: [faJs, faHtml5, faPython],
    },
    {
      title: "Blog Site",
      description: "A clean and minimal blogging platform.",
      link: "https://example.com/blog",
      lang: [faJs, faHtml5, faPython],
    },
    {
      title: "Portfolio",
      description: "My personal portfolio showcasing projects and skills.",
      link: "https://example.com/portfolio",
      lang: [faJs, faHtml5, faPython],
    },
  ];

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());
  const [current, setCurrent] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);

  function getVisibleCards() {
    const width = window.innerWidth;
    if (width >= 1024) return 3; // lg
    if (width >= 640) return 2; // sm
    return 1;
  }

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
      setCurrent(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.ceil(projects.length / visibleCards) - 1;
  const cardPercentage = 100 / visibleCards;

  const nextSlide = () => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="bg-gray-900 text-white py-5 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-5">
          Projects
        </h3>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              width: `${(projects.length * 100) / visibleCards}%`,
              transform: `translateX(-${current * (100 / projects.length)}%)`,
            }}
          >
            {projects.map((project, i) => (
              <div
                key={i}
                className="px-4"
                style={{ width: `${cardPercentage}%` }}
              >
                <div className="bg-gray-800 rounded-2xl shadow-lg p-6 h-full flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-blue-300">
                      {project.title}
                    </h4>

                    <div className="h-40 w-full mb-4 overflow-hidden px-[10%] border-none">
                      {project.img && (
                        <img
                          src={project.img}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <p
                      className={`text-gray-300 text-sm mb-2 transition-all duration-200 ease-in-out ${
                        expandedIndex === i ? "line-clamp-none" : "line-clamp-2"
                      }`}
                    >
                      {project.description}
                    </p>

                    <button
                      onClick={() =>
                        setExpandedIndex(expandedIndex === i ? null : i)
                      }
                      className="text-blue-400 text-sm hover:underline focus:outline-none mb-4"
                    >
                      {expandedIndex === i ? "Read less" : "Read more"}
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 px-4 rounded-full shadow cursor-pointer"
                      onClick={() => window.open(project.link, "_blank")}
                    >
                      <FontAwesomeIcon
                        icon={faGlobe}
                        className="text-white mr-2"
                      />
                      Visit
                    </button>

                    <div className="flex items-center gap-1">
                      {project.lang.map((icon, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={icon}
                          className="text-2xl text-white"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows + Dots */}
        <div className="mt-8 flex justify-between items-center px-4 space-x-4">
          <button
            onClick={prevSlide}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 px-4 rounded-full shadow cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full ${
                  current === i ? "bg-blue-400" : "bg-gray-500"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 px-4 rounded-full shadow cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Projects;
