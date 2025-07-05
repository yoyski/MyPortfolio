import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ChatPage from "./components/Chatbot"; // renamed to ChatPage earlier

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />

      {/* Floating Chat Icon */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
        onClick={() => setChatOpen(true)}
      >
        <FontAwesomeIcon icon={faComments} className="text-xl" />
      </button>

      {/* Chat Modal */}
      <ChatPage isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}

export default App;
