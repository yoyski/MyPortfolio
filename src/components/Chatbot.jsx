// components/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faMicrophone,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Aboutme from "./AboutMe";

export default function Chatbot({ isOpen, onClose }) {
  const [chats, setChats] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const scrollRef = useRef(null);
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript) handleSent(transcript);
  }, [listening]);

  const handleMicrophone = () => {
    SpeechRecognition.startListening({ continuous: false });
  };

  const handleSent = (msg) => {
    if (!msg.trim()) return;

    const id = Date.now();
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newChats = [
      ...chats,
      { id, type: "user", message: msg, time },
      { id, type: "ai", message: "loading...", time },
    ];
    setChats(newChats);
    setTimeout(
      () => scrollRef.current?.scrollIntoView({ behavior: "smooth" }),
      100
    );
    handleFetch(msg, id, newChats);
  };

  const handleFetch = async (text, id, allChats) => {
    const systemMessage = {
      role: "user",
      parts: [
        {
          text: Aboutme.about,
        },
      ],
    };
    const userMessage = { role: "user", parts: [{ text }] };

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBYQ2lWrM3GAzTPMfHrdGGr9CqfXoagZ0s",
      { contents: [systemMessage, userMessage] }
    );

    resetTranscript();
    const message =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    const updated = allChats.map((c) =>
      c.id === id && c.type === "ai" ? { ...c, message } : c
    );
    setChats(updated);
    setTimeout(
      () => scrollRef.current?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-[90vw] max-w-md z-50">
      <div className="w-full h-[80vh] flex flex-col rounded-2xl bg-[#1e1e1e] border border-gray-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 font-semibold text-lg flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
              Y
            </div>
            Yoyski
          </div>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700">
          {chats.length === 0 ? (
            <div className="text-center text-gray-400 mt-16">
              Start a conversation with Yoyski...
            </div>
          ) : (
            chats.map((chat) =>
              chat.type === "user" ? (
                <div key={chat.id} className="text-right">
                  <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-2xl text-sm max-w-[80%]">
                    {chat.message}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">
                    {chat.time}
                  </div>
                </div>
              ) : (
                <div key={chat.id} className="text-left">
                  <div className="inline-block bg-[#2b2b2b] text-white px-4 py-2 rounded-2xl text-sm max-w-[80%]">
                    <ReactMarkdown>{chat.message}</ReactMarkdown>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">
                    {chat.time}
                  </div>
                </div>
              )
            )
          )}
          <div ref={scrollRef}></div>
        </div>

        {/* Controls */}
        <div className="bg-[#1e1e1e] px-3 py-3 flex items-center gap-3">
          <textarea
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 text-sm bg-[#2a2a2a] text-white rounded-full px-4 py-2 resize-none focus:outline-none placeholder-gray-400"
            rows={1}
          />
          <div className="controller-container h-full flex">
            <button
              onClick={() => {
                handleSent(userMessage);
                setUserMessage("");
              }}
              className="px-2 py-2 rounded-full hover:bg-blue-700 transition"
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-white text-[20px]"
              />
            </button>
            <button
              onClick={handleMicrophone}
              className="px-2 py-2 rounded-full hover:bg-red-700 transition"
            >
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-white text-[25px]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
