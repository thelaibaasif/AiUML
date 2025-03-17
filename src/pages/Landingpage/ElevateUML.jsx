import React from 'react';
import keyboard from "../../images/keyboard.png";
import automation from "../../images/automation.png";
import robot from "../../images/robot.png";
import customization from "../../images/customization.png";

const ElevateUML = () => {
  return (
    <div className="bg-white py-32 w-full">
      {/* Heading */}
      <h2 className="text-center text-5xl md:text-6xl font-extrabold text-red-700">
        Elevate Your UML Experience
      </h2>

      {/* Subheading */}
      <p className="text-center text-2xl text-gray-600 mt-4 mb-16">
        Unleashing Creativity with AI-Powered UML Diagrams
      </p>

      {/* Grid Container with even side spacing */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

        {[{
          img: keyboard,
          title: "Input",
          desc: "Unrestrictive Textual Input and Prompts"
        }, {
          img: automation,
          title: "Automation",
          desc: "Automated Diagram Generation"
        }, {
          img: robot,
          title: "AI Optimization",
          desc: "AI Based Diagram Optimization"
        }, {
          img: customization,
          title: "Customization",
          desc: "Diagram Editing and Customization"
        }].map((feature, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center border-2 border-red-500 rounded-2xl p-6 hover:shadow-md transition bg-white"
          >
            <img src={feature.img} alt={feature.title} className="w-24 h-24 mb-4" />
            <h3 className="text-2xl font-bold">{feature.title}</h3>
            <p className="text-xl font-medium py-4">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElevateUML;
