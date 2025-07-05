import { useState } from "react";
import Swal from "sweetalert2";

function Contact() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "112d7aae-a300-453f-bfd3-109140c4639d");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully!",
        icon: "success",
        background: "#1f2937", // Tailwind's bg-gray-900
        color: "#ffffff", // Tailwind's text-white
        iconColor: "#3b82f6", // Tailwind's blue-500
        customClass: {
          popup: "rounded-lg shadow-lg",
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded",
          title: "text-xl",
          htmlContainer: "text-base",
        },
      });

      event.target.reset();
    } else {
      console.log("Error", data);
    }
  };

  return (
    <section className="bg-gray-900 py-15 px-6 text-white">
      <div className="max-w-6xl mx-auto lg:flex lg:items-start lg:justify-between gap-12">
        {/* Left side - Text */}
        <div className="mb-12 text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Let's Connect!</h1>
          <p className="text-lg text-gray-300">
            Have a question, a project in mind, or just want to chat? I’d love
            to hear from you. Drop me a message anytime!
          </p>
        </div>

        {/* Right side - Form */}
        <form className="lg:w-1/2 space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <div className="text-center lg:text-left">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
