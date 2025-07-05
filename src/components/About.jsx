function About() {
  return (
    <section className="bg-gray-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400">About Me</h3>
        <p className="text-lg leading-relaxed text-gray-300 mb-8">
          I am a passionate developer with experience in building modern web applications.
        </p>
        <h4 className="text-2xl font-semibold mb-4 text-blue-300">Skills</h4>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "MongoDB",
            "Tailwind CSS"
          ].map((skill, i) => (
            <span
              key={i}
              className="bg-gray-800 text-blue-400 px-4 py-2 rounded-full text-sm font-medium border border-blue-400"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;